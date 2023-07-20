import React from 'react'
import { AttachmentIcon } from '../../../../svg'
import Menu from './menu/Menu';

export default function Attachments({showAttachments, setShowAttachments, setShowPicker}) {
    return (
        <li className="relative">
            <button type='button' className="btn" onClick={()=>{
                setShowPicker(false)
                setShowAttachments((prev) => !prev)
            }}>
                <AttachmentIcon className="dark:fill-dark_svg_1" />
            </button>
            {showAttachments ? <Menu /> : null}
        </li>
    )
}
