import { useRef, useState } from "react";

function AudioPlayer({idAudio, id }) {
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
                <div className={'p-2 rounded-full bg-white'}>
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
            </button>
        </div>
    );
}

export default AudioPlayer;