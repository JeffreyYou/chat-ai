
export interface Dialog {
    // 头像
    avatar: string;
    // 小标题
    subTitle: string;
    // 对话最后时间
    timestamp: number;
    // 聊天头
    title: string;
    // 消息数
    count: number;
}

export interface Message {
    avatar: string;
    content: string;
    message_type: MessageType;
    time: number;
    direction?: MessageDirection;
    role: MessageRole;
    id: string;
    streaming?: boolean;
}

export interface SessionConfig {
    gptVersion: GptVersion;
}

export enum MessageRole {
    system = "system",
    user = "user",
    assistant = "assistant",
}

export enum MessageType {
    Link = "link",
    Pic = "pic",
    Text = "text",
}

export enum MessageDirection {
    Send = 0,
    Receive,
}

export enum GptVersion {
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    GPT_3_5_TURBO_16K = "gpt-3.5-turbo-16k",
    GPT_4 = "gpt-4",
    GPT_4_32K = "gpt-4-32k",
}