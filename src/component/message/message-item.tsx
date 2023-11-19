import React from 'react'
import { Avatar } from 'antd';

import { SystemContainer, UserContainer, SystemMessage, UserMessage, MessageHeader, MessageHeaderEdit } from './style';
import { Message } from '../../store/chat-types';
interface Props {
    message: Message
}

const MessageItem: React.FC<Props> = (props:Props) => {
    const {message} = props
    const isUser = message.role === "user"
    const Container = isUser ? UserContainer : SystemContainer
    const MessageContent = isUser ? UserMessage : SystemMessage
    return (
        <>
            <Container >
                <MessageContent >
                    <MessageHeader className='header'>
                        <Avatar shape="square" src={message.avatar} />
                        <MessageHeaderEdit>123</MessageHeaderEdit>
                    </MessageHeader>
                        {message.content}
                </MessageContent>
            </Container>
            
        </>
    )
}

export default MessageItem
