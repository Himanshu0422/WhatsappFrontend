import { useState } from 'react';
import CallActions from './CallActions';
import Callarea from './Callarea';
import Header from './Header';
import Ringing from './Ringing';

export default function Call({
    call,
    setCall,
    callAccepted,
    myVideo,
    stream,
    userVideo,
    answerCall,
    show,
    endCall,
    totalSecInCall,
    setTotalSecInCall
}) {

    const { receivingCall, callEnded, name } = call;
    const [showActions, setShowActions] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
                ${receivingCall && !callAccepted ? 'hidden' : ''}
            `}
                onMouseOver={() => setShowActions(true)}
                onMouseOut={() => setShowActions(false)}
            >
                <div>
                    <div>
                        <Header />
                        <Callarea
                            name={name}
                            totalSecInCall={totalSecInCall}
                            setTotalSecInCall={setTotalSecInCall}
                            callAccepted={callAccepted}
                        />
                        {showActions ? <CallActions endCall={endCall} /> : null}
                    </div>
                    <div>
                        {callAccepted && !callEnded ? (
                            <div>
                                <video
                                    ref={userVideo}
                                    playsInline
                                    muted
                                    autoPlay
                                    className={toggle ? 'SmallVideoCall' : 'largeVideoCall'}
                                    onClick={() => setToggle((prev) => !prev)}
                                />
                            </div>
                        ) : null}
                        {stream ? (
                            <div>
                                <video
                                    ref={myVideo}
                                    playsInline
                                    muted
                                    autoPlay
                                    className={`${toggle ? 'largeVideoCall' : 'SmallVideoCall'} ${showActions ? 'moveVideoCall' : ''
                                        }`}
                                    onClick={() => setToggle((prev) => !prev)}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {receivingCall && !callAccepted ? (
                <Ringing
                    call={call}
                    setCall={setCall}
                    answerCall={answerCall}
                    endCall={endCall}
                />
            ) : null}
            {!callAccepted && show ? (
                <audio src='../../../../audio/ringing.mp3' autoPlay loop></audio>
            ) : null}
        </>
    );
}