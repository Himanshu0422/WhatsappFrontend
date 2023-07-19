import React, { useEffect } from 'react';
import ChatHeader from "./header/ChatHeader";
import ChatMessage from './messages/ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../features/chatSlice';
import ChatActions from './actions/ChatActions';
import { checkOnlineStatus } from '../../utils/chat';

export default function ChatContainer({ onlineUsers, typing }) {

    const dispatch = useDispatch();
    const { activeConversation } = useSelector((state) => state.chat);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeConversation]);

    return (
        <div className="relative w-full h-full border-1 dark:border-1-dark 2 select-none overflow-hidden">
            <div>
                <ChatHeader online={checkOnlineStatus(onlineUsers,user, activeConversation.users)} />
                <ChatMessage typing={typing} />
                <ChatActions />
            </div>
        </div>
    )
}