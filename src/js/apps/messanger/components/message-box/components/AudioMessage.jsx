import { useState, useRef } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';
import audioRangeActive from 'Assets/svg/icons/audio-range-active.svg';
import audioRangeInactive from 'Assets/svg/icons/audio-range-inactive.svg';

const AudioMessage = ({data}) => {
	const audioRef = useRef();
	const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);

	function togglePlayPauseAudio(e) {
        e.preventDefault();

        if (!audioRef.current) {
            return;
        }

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }

	function getPlayedTimeInPercent() {
        const r = audioCurrentTime / audioDuration;
        return isNaN(r) ? 0 : r * 100;
    }

	function getAudioTimer() {
        const remainingTime = audioDuration - audioCurrentTime;

        return formatSecondsAsCountdown(remainingTime);
    }

	return (
		<>
			<div className='wpwax-vm-message-content__inner--audio'>
				<a
					href='#'
					onClick={(e) => {
						togglePlayPauseAudio(e);
					}}
					className='wpwax-vm-btn-play'
				>
					<span
						className={
							isPlayingAudio
								? 'dashicons dashicons-controls-pause'
								: 'dashicons dashicons-controls-play'
						}
					></span>
				</a>
				<span className='wpwax-vm-audio-range'>
					<div
						style={{
							position: 'relative',
							margin: '5px',
							width: '190px',
							height: '21px',
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								display: 'inline-block',
								backgroundPositionX: '0px',
								backgroundRepeat: 'no-repeat',
								backgroundImage:
									'url( ' + audioRangeInactive + ' )',
								zIndex: 0,
							}}
						></div>
						<div
							style={{
								width: getPlayedTimeInPercent() + '%',
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								display: 'inline-block',
								backgroundPositionX: '0px',
								backgroundRepeat: 'no-repeat',
								backgroundImage:
									'url( ' + audioRangeActive + ' )',
								zIndex: 1,
								transition: 'all 300ms ease-in-out 0s',
							}}
						></div>
					</div>

					<span className='wpwax-vm-timer'>
						{getAudioTimer()}
					</span>
				</span>
				<audio
					ref={audioRef}
					onPlay={() => {
						setIsPlayingAudio(true);
					}}
					onPause={() => {
						setIsPlayingAudio(false);
					}}
					onTimeUpdate={(event) => {
						setAudioCurrentTime(event.target.currentTime);
					}}
					onLoadedData={(event) => {
						setAudioDuration(event.target.duration);
					}}
					src={data.attachment_url}
				></audio>
			</div>

			{data.message && (
				<div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
					<p><Linkify>{data.message}</Linkify></p>
				</div>
			)}
		</>
	);
}

export default AudioMessage;
