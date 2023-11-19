import { Routes, Route } from 'react-router-dom';

import CharacterDemonstration from '../component/characterDemonstration/characterDemo';
import Message from '../component/message/message';
export const ChatRouter: React.FC = () => {

    return(
        <Routes>
            <Route path="/" element={<CharacterDemonstration/>} />
            <Route path="/test" element={<Message/>} />
        </Routes>

    )

}