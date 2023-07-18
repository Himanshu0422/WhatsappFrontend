import React, { useRef, useState } from 'react';
import Attachments from './attachments/Attachments';
import Input from './Input';
import { SendIcon } from '../../../svg';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../features/chatSlice';
import ClipLoader from "react-spinners/ClipLoader";
import EmojiPickerApp from './EmojiPickerApp';

export default function ChatActions() {

    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const dispatch = useDispatch();
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const values = {
        message,
        convo_id: activeConversation._id,
        files: [],
        token
    }
    const sendMessageHandler = async(e) => {
        e.preventDefault();
        if(values.message.length < 1){
            return;
        }
        setLoading(true);
        await dispatch(sendMessage(values));
        setMessage("");
        setLoading(false);
    }
    const textRef = useRef();

    return (
        <form className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 select-none"
            onSubmit={(e) => sendMessageHandler(e)}>
            <div className="w-full flex items-center gap-x-2">
                <ul className="flex gap-x-2">
                    <EmojiPickerApp
                        textRef={textRef} 
                        message={message}
                        setMessage={setMessage} 
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        setShowAttachments={setShowAttachments}
                    />
                    <Attachments
                        showAttachments={showAttachments}
                        setShowAttachments={setShowAttachments} 
                        setShowPicker={setShowPicker}
                    />
                </ul>
                <Input message={message} setMessage={setMessage} textRef={textRef} />
                <button type='submit' className='btn'>
                {loading === "loading" && loading ? (
                    <ClipLoader color="#E9EDEF" size={25} />
                ) : (
                    <SendIcon className= "Udark: fill-dark_svg_1"/>
                )}
                </button>
            </div>
        </form>
  )
}