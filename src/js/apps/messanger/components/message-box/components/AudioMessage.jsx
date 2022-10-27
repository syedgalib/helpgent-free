import { useState, useRef, useEffect } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';
import { React } from 'react';
import ReactSVG from 'react-inlinesvg';
import audioRangeActive from 'Assets/svg/icons/audio-range-active.svg';
import download from 'Assets/svg/icons/cloud-download-alt.svg';
import audioRangeInactive from 'Assets/svg/icons/audio-range-inactive.svg';

const AudioMessage = ({data}) => {
	const audioRef = useRef(new Audio(data.attachment_url));
	const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

	function togglePlaying(event) {
        event.preventDefault();

        if (!audioRef.current) {
            return;
        }

        if (audioRef.current.paused) {
            audioRef.current.play();
			setPlaying(true);
        } else {
            audioRef.current.pause();
			setPlaying(false);
        }
    }

	function getPlayedTimeInPercent() {
        const r = currentTime / duration;
        return isNaN(r) ? 0 : r * 100;
    }

	function getRemainingTime() {
        const remainingTime = duration - currentTime;
        return formatSecondsAsCountdown(remainingTime);
    }

	useEffect(() => {
		if (!audioRef.current) {
            return;
        }

		const onTimeUpdate = (event) => setCurrentTime(event.target.currentTime);
		const onLoadedMetaData = (event) => setDuration(event.target.duration);

		audioRef.current.addEventListener('timeupdate', onTimeUpdate);
		audioRef.current.addEventListener('loadeddata', onLoadedMetaData);

		return () => {
			audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
			audioRef.current.removeEventListener('loadeddata', onLoadedMetaData);
		}
	}, []);

	return (
		<>
			<audio src={data.attachment_url} />
			<div className='wpwax-vm-message-content__inner--audio'>
				<a
					href='#'
					onClick={(e) => {
						togglePlaying(e);
					}}
					className='wpwax-vm-btn-play'
				>
					<span
						className={
							playing
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
					<div className="wpwax-hg-audio-info">
						<span className='wpwax-vm-timer'>
							{getRemainingTime()}
						</span>
						<a href={data.attachment_url} className='wpwax-hg-download'><ReactSVG src={download} /></a>
					</div>
					
				</span>
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
