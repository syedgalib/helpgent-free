import {useState, useRef } from 'react';
import ReactSVG from 'react-inlinesvg';
import Linkify from 'Externals/Linkify.jsx';
import expandIcon from 'Assets/svg/icons/expand.svg';
import playIcon from 'Assets/svg/icons/play.svg';
import pauseIcon from 'Assets/svg/icons/pause-solid.svg';
import downloadIcon from 'Assets/svg/icons/cloud-download-alt.svg';

const VideoMessage = ({data}) => {
	const videoRef = useRef();
	const [playing, setPlaying] = useState(false);

	function togglePlaying(event) {
        event.preventDefault();

        if (!videoRef.current) {
            return;
        }

        if (videoRef.current.paused) {
            setPlaying(true);
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    }

	function handleExpandVideo(event) {
        event.preventDefault();
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            /* Safari */
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            /* IE11 */
            videoRef.current.msRequestFullscreen();
        }
    }

	return (
	<>
		<div className='wpwax-vm-message-content__inner--video'>
			<video
				ref={videoRef}
				src={data.attachment_url}
				onPlay={() => {
					setPlaying(true);
				}}
				onPause={() => {
					setPlaying(false);
				}}
				style={{
					height: '247.5px',
					backgroundColor: '#000',
					borderRadius: '16px',
				}}
			></video>
			<a
				href='#'
				className={playing ? 'wpwax-vm-btn-pause' : 'wpwax-vm-btn-play'}
				onClick={(e) => {
					togglePlaying(e);
				}}
			>
				{
					playing ? <ReactSVG src={pauseIcon} /> : <ReactSVG src={playIcon} />
				}
			</a>
			{
				!playing ? 
				<a
					href={data.attachment_url}
					className='wpwax-vm-btn-download'
				>
					<ReactSVG src={downloadIcon} />
				</a>:null
			}
			
			{
				playing ? 
				<a
					href='#'
					className='wpwax-vm-btn-expander'
					onClick={handleExpandVideo}
				>
					<ReactSVG src={expandIcon} />
				</a> : null
			}
			
		</div>
		{data.message && (
			<div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
				<p><Linkify>{data.message}</Linkify></p>
			</div>
		)}
	</>
	);
}

export default VideoMessage;
