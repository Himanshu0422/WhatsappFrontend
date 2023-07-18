import React, { useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice';
import { ChatContainer, WhatsappHome } from '../components/chat' ;

export default function Home() {

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { activeConversation } = useSelector((state) => state.chat);
	console.log("activeconversation",activeConversation);
	useEffect(() => {
		if(user?.token){
			dispatch(getConversations(user.token));
		}
	}, [user]);
	

	return (
		<div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center pt-[1px] overflow-hidden'>
			<div className='container h-screen flex'>
				<Sidebar />
				{activeConversation?._id ? 
					<ChatContainer /> :
					<WhatsappHome />
				}
			</div>
		</div>
	)
}