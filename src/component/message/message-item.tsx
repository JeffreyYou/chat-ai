import React from 'react'
import { Avatar } from 'antd';

import { userChatStore } from '../../store/chat-store'
import { ChatWrapper ,SystemContainer, UserContainer, MessageHeader } from './style';
const MessageItem: React.FC = () => {
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    const messages = currentSession.messages
  return (
    <ChatWrapper>
    <SystemContainer >
        <MessageHeader>
            <Avatar shape="square" src={messages[0].avatar} />
        </MessageHeader>
        {messages.map( (message, index) => {
                            return <div>{message.content}</div>
                        })}
    </SystemContainer>
    <UserContainer>
        {messages.map( (message, index) => {
                            return <div>{message.content}</div>
                        })}0
    </UserContainer>
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
                </div>
                {/* <div className={styles['date']}>{date}</div> */}
            </div>
        </div>
    </ChatWrapper>
  )
}

export default MessageItem
