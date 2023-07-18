import React, { useEffect } from 'react';
import ChatHeader from "./header/ChatHeader";
import ChatMessage from './messages/ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../features/chatSlice';
import ChatActions from './actions/ChatActions';

export default function ChatContainer() {

    const dispatch = useDispatch();
    const { activeConversation, messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const values = {
        token,
        convo_id: activeConversation?._id
    }
    useEffect(() => {
        if (activeConversation?._id) {
            dispatch(getConversationMessages(values))
        }
    }, [activeConversation]);
    console.log("messages", messages);

    return (
        <div className="relative w-full h-full border-1 dark:border-1-dark 2 select-none overflow-hidden">
            <div>
                <ChatHeader />
                <ChatMessage />
                <ChatActions />
            </div>
        </div>
    )
}