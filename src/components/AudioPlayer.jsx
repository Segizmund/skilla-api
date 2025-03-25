import { useRef, useState } from "react";

function AudioPlayer({ idAudio, id, time }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // Воспроизведение/пауза
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Обновление прогресса
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setProgress((currentTime / duration) * 100);
        }
    };

    // Получение длительности аудио
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Перемотка по клику на прогресс-бар
    const handleProgressBarClick = (e) => {
        if (audioRef.current) {
            const progressBar = e.currentTarget;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const progressBarWidth = progressBar.clientWidth;
            const seekTime = (clickPosition / progressBarWidth) * duration;
            audioRef.current.currentTime = seekTime;
        }
    };

    // Скачивание аудиофайла
    const handleDownload = () => {
        if (!idAudio) return;

        const link = document.createElement('a');
        link.href = idAudio;
        link.download = `audio_${id || Date.now()}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={'flex items-center'}>
            <audio
                ref={audioRef}
                src={idAudio}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className={'bg-[#EAF0FA] p-3 rounded-[48px] flex items-center'}>
                <span className={'text-[#122945] me-3'}>{time}</span>

                {/* Кнопка Play/Pause */}
                <button
                    onClick={togglePlay}
                    className={'p-2 rounded-full bg-white me-3 cursor-pointer hover:bg-[#E3E3E3] transition duration-300 ease-linear'}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                             className="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                             className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    )}
                </button>

                {/* Прогресс-бар */}
                <div
                    className={'me-3 cursor-pointer'}
                    onClick={handleProgressBarClick}
                >
                    <div className={'bg-[#ADBFDF] p-1 rounded-full min-w-[170px] h-2 relative'}>
                        <div
                            className={'bg-[#002CFB] h-full rounded-full absolute top-0 left-0'}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Кнопка скачивания */}
                <button
                    onClick={handleDownload}
                    className={'me-3 p-1 cursor-pointer hover:bg-gray-100 rounded'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                         className="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
                </button>

                {/* Кнопка закрытия */}
                <button className={'p-1 cursor-pointer hover:bg-gray-100 rounded'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#002CFB"
                         className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AudioPlayer;