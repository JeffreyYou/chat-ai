import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Dialog, Message, MessageDirection, MessageRole, MessageType, SessionConfig, GptVersion} from "./chat-types";
import {nanoid} from "nanoid";


interface ChatStore {
    id: number;
    sessions: ChatSession[];
    currentSessionIndex: number;
    openSession: (dialog?: { avatar?: string; title?: string }) => ChatSession;
    selectSession: (index: number) => void;
    deleteSession: (index: number) => void;
    currentSession: () => ChatSession;
    onSendMessage: (newMessage: Message) => Promise<void>;
    updateCurrentSession: (updater: (session: ChatSession) => void) => void;
    onRetry: () => void;
    deleteMessage: (message: Message) => void;
    createNewMessage: (value: string) => Message;
}

export interface ChatSession {
    id: number;
    dialog: Dialog;
    messages: Message[];
    character: string;
    config: SessionConfig;
    clearContextIndex?: number;
}

function createChatSession(dialog?: {
    avatar?: string;
    title?: string;
}): ChatSession {
    return {
        id: 0,
        dialog: {
            avatar: dialog?.avatar || "/role/wali.png",
            title: dialog?.title || "New Chat",
            count: 0,
            subTitle: "How can I help you?",
            timestamp: new Date().getTime(),
        },
        character: "Elon Musk",
        messages: [
            {
                avatar: dialog?.avatar || "/role/wali.png",
                content: "How can I help you?",
                message_type: MessageType.Text,
                time: Date.now(),
                direction: MessageDirection.Receive,
                role: MessageRole.system,
                id: nanoid()
            }
        ],
        clearContextIndex: undefined,
        config: {
            gptVersion: GptVersion.GPT_3_5_TURBO,
        }
    };
}

function formatMessages(messages: Message[]) {
    // retrieve the most recent 3 messages
    const latestMessages = messages.length > 3 ? messages.slice(-3) : messages;
    return latestMessages.map(({content, role}) => ({
        content,
        role,
    }));
}

export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion
}) => {
    return fetch('http://localhost:8090/api/v1/chat/completions', {
        method: 'post',
        headers: {
            Authorization: "b8b6",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

export function createNewMessage(value: string, role?: MessageRole) {
    return {
        avatar: role !== MessageRole.user ? "/role/wali.png" : "/role/runny-nose.png",
        content: value,
        time: Date.now(),
        role: role || MessageRole.user,
        id: nanoid(),
        streaming: false,
    } as Message;
}

export const userChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            // State Properties
            id: 0,
            sessions: [createChatSession()],
            currentSessionIndex: 0,

            // Creates a new chat session
            openSession(dialog?: { avatar?: string; title?: string }) {
                const session = createChatSession(dialog);
                // Set Session id
                set(() => ({id: get().id + 1}));
                session.id = get().id;

                // Store Session in sessions[]
                set((state) => ({
                    currentSessionIndex: 0,
                    // insert at header
                    sessions: [session].concat(state.sessions),
                }));

                return session;
            },

            // Select session
            selectSession(index: number) {
                set({
                    currentSessionIndex: index,
                });
            },

            // Delete Session
            deleteSession(index: number) {
                const count = get().sessions.length;
                const deleteSession = get().sessions.at(index);

                if (!deleteSession) return;

                const sessions = get().sessions.slice();
                sessions.splice(index, 1);

                const currentIndex = get().currentSessionIndex;
                let nextIndex = Math.min(
                    currentIndex - Number(index < currentIndex),
                    sessions.length - 1,
                );

                if (count === 1) {
                    nextIndex = 0;
                    sessions.push(createChatSession());
                }

                set(() => ({
                    currentSessionIndex: nextIndex,
                    sessions,
                }));

            },

            // Current session
            currentSession() {
                let index = get().currentSessionIndex;
                const sessions = get().sessions;
                if (index < 0 || index >= sessions.length) {
                    index = Math.min(sessions.length - 1, Math.max(0, index));
                    set(() => ({currentSessionIndex: index}));
                }
                return sessions[index];
            },

            // Send message
            async onSendMessage(newMessage: Message) {
                const session = get().currentSession();

                get().updateCurrentSession((session) => {
                    session.messages = session.messages.concat(newMessage);
                });

                const activeMessages = session.messages?.slice(
                    session.clearContextIndex || 0
                );
                const messages = formatMessages(activeMessages);

                const botMessage: Message = createNewMessage("", MessageRole.system);
                get().updateCurrentSession((session) => {
                    session.messages = session.messages.concat(botMessage);
                });

                // ChatGPT API
                const {body} = await completions({
                    messages,
                    model: session.config.gptVersion,
                });

                // 填充消息
                const reader = body!.getReader();
                const decoder = new TextDecoder();
                new ReadableStream({
                    start(controller) {
                        async function push() {
                            const {done, value} = await reader.read();
                            if (done) {
                                controller.close();
                                return;
                            }

                            controller.enqueue(value);
                            const text = decoder.decode(value);
                            botMessage.content += text;
                            get().updateCurrentSession((session) => {
                                session.messages = session.messages.concat();
                            });
                            push();
                        }

                        push();
                    },
                });
            },

            // Update Current Session
            updateCurrentSession(updaterFunction) {
                const sessions = get().sessions;
                const index = get().currentSessionIndex;
                updaterFunction(sessions[index]);
                set(() => ({sessions}))
            },

            onRetry() {
                const session = get().currentSession();
                const activeMessages = session.messages?.slice(session.clearContextIndex || 0);
                const messages = formatMessages(activeMessages);
                completions({messages, model: session.config.gptVersion});
            },

            deleteMessage(message: Message) {
                get().updateCurrentSession((session) => {
                    const index = session.messages.findIndex((m) => m.id === message.id);
                    session.messages.splice(index, 1);
                });
            },

            createNewMessage(value: string, role?: MessageRole) {
                return {
                    avatar: "/role/runny-nose.png",
                    content: value,
                    time: Date.now(),
                    role: MessageRole.user,
                    id: nanoid(),
                } as Message;
            }

        }),
        {
            name: "chat-store"
        }
    ),
);