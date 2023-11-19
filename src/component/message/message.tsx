
import { userChatStore } from '../../store/chat-store'
import MessageItem from './message-item';

const Message: React.FC = () => {

    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    const messages = currentSession.messages

    return(
        <>
            {
                messages.map((message, index) => {
                    return <MessageItem message={message} key={index}/>
                })
            }
        </>
    )
}
export default Message