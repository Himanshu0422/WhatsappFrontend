import React from 'react';
import { dateHandler } from '../../../utils/date';

function Conversation({ convo }) {
    console.log(convo);
    return (
        <li className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'>
            <div className="relative w-full flex items-center justify-between py-[10px]">
                <div className="flex items-center gap-x-3">
                    <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                            src={convo.picture} alt={convo.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className='w-full flex flex-col'>
                        <h1 className='font-bold flex items-center gap-x-2'>
                            {convo.name}
                        </h1>
                        <div>
                            <div className="flex items-center gap-x-1 Odark: text-dark_text _2">
                                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                    <p>{convo.latestMessage.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className="dark:text-dark_text_2"> 
                        {dateHandler(convo.latestMessage.createdAt)}
                    </span>
                </div>
            </div>
        </li>
    )
}

export default Conversation