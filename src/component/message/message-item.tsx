import React from 'react'
import styles from './dialog-message-item.module.scss'
import { userChatStore } from '../../store/chat-store'
const MessageItem: React.FC = () => {
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    const messages = currentSession.messages
  return (
    <>
      <div
            // className={
            //     isUser ? styles["chat-message-user"] : styles["chat-message"]
            // }
        >
            <div >
                <div >
                    <div >
                        {/* <Avatar shape="square" src={message.avatar} size={30} style={{
                            borderRadius: '4px',
                            backgroundColor: '#f6f6f6'
                        }}/> */}

                    </div>
                    <div >
                        {/* <Space>
                            <ChatAction icon={<SyncOutlined/>} text="Retry" onClick={retryHandle}/>
                            <ChatAction icon={<CopyOutlined/>} text="Copy" onClick={copyHandle}/>
                            <ChatAction icon={<DeleteOutlined/>} text="Delete" onClick={deleteHandle}/>
                        </Space> */}
                    </div>
                </div>
                <div >
                    {messages.map( (message, index) => {
                        return <div>{message.content}</div>
                    })}
                </div>
                {/* <div className={styles['date']}>{date}</div> */}
            </div>
        </div>
    </>
  )
}

export default MessageItem
