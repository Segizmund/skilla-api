import { useRef, useState } from "react";

function AudioPlayer({idAudio, id, time }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={'flex items-center'}>
            <audio
                ref={audioRef}
                src={idAudio}
                onEnded={() => setIsPlaying(false)}
            />
            <button onClick={togglePlay}>
                <div className={'bg-[#EAF0FA] p-3 rounded-[48px] flex items-center'}>
                    <span className={'text-[#122945] me-3'}>{time}</span>
                    <div className={'p-2 rounded-full bg-white me-3 cursor-pointer hover:bg-[#E3E3E3] transition duration-300 ease-linear'}>
                        {isPlaying ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                                 className="bi bi-pause-fill" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                                 className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path
                                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                            </svg>
                        }
                    </div>
                    <div className={'me-3'}>
                        <div className={'bg-[#ADBFDF] p-1 rounded-full min-w-[170px]'}>

                        </div>
                    </div>
                    <div className={'me-3'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                             className="bi bi-download" viewBox="0 0 16 16">
                            <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path
                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                             className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
}

export default AudioPlayer;