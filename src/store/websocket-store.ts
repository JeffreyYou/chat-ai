import {create} from "zustand";
import {persist} from "zustand/middleware";

const key = "websocket"
const url = "ws://127.0.0.1:8000/ws/123"
interface websocketSetting {
    id: number;
    websocket: any,
    openConnection: (messageApi : any) => void,
    sendMessage: (message : any) => Promise<void>
}

export const websocketStore = create<websocketSetting>()(
    persist( (set, get) => ({
            id: 0,
            websocket: null,
            messageApi: null,
            messageContent: null,
            openConnection: (messageApi) => {
                // popup connection message
                messageApi.open({
                    key,
                    type: "loading",
                    content: "Connecting to test server...",
                    duration: 0
                })                
                // connecting to server
                const socket = new WebSocket(url)
                // set({websocket: socket, messageApi: messageApi, messageContent: messageContent})
                set({websocket: socket})
                // add connection success event
                socket.addEventListener("open", () => {
                    setTimeout(() => {
                      messageApi.open({
                        key,
                        type: "success",
                        content: "Connection Established",
                        duration: 2,
                      });
                    }, 1000)
                })
                // add connection failure event
                socket.addEventListener("error", (event) => {
                    console.error("WebSocket Error:", event);
                    setTimeout(() => {
                      messageApi.open({
                        key,
                        type: "error",
                        content: "Connection Failed",
                        duration: 2,
                      });
                    }, 1000);
                  })
            },
            sendMessage: async (message) => {
                const socket = get().websocket
                socket.send(message)
            }
        }),
        {
            name: "websocket_storage"
        }
    )
)

