import propTypes from 'prop-types';
import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { formatTimeAsCountdown } from 'Helper/formatter';
import { PreviewWrap } from './Style';

import miceIcon from 'Assets/svg/icons/mice.svg';
import recordIcon from 'Assets/svg/icons/desktop.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import videoIcon from 'Assets/svg/icons/video-camera.svg';
import playIcon from 'Assets/svg/icons/play.svg';
import pauseIcon from 'Assets/svg/icons/pause-solid.svg';
import expander from "Assets/svg/icons/expand.svg";

const PreviewTwo = ({ previewStage }) => {
    /* initialize Form Data */
    const { formOption, loading } = useSelector(state => {
        return {
            formOption: state.form.data[0].options,
            loading: state.form.loading,
        };
    });

    const [state, setState] = useState({
        isPaused: false,
    });

    const [ greetVideoTotalDuration, setGreetVideoTotalDuration ] = useState( '00:00' );
    const [ greetVideoPlayedDuration, setGreetVideoPlayedDuration ] = useState( '00:00' );

    /* Destructuring State */
    const { isPaused } = state;

    const iconContent = (button) => {
        if (button === 'video') {
            return <ReactSVG src={videoIcon} />
        } else if (button === 'screen_record') {
            return <ReactSVG src={recordIcon} />
        } else if (button === 'voice') {
            return <ReactSVG src={miceIcon} />
        } else if (button === 'text') {
            return <ReactSVG src={textIcon} />
        }
    }

    const greetVideoDom = useRef();

    // Greet Video
    function handleLoadedGreetVideoMetadata() {

        const duration = greetVideoDom.current.duration;
        console.log(duration);
        const prettyDuration = formatTimeAsCountdown( duration );

        if ( ! prettyDuration ) {
            return;
        }

        setGreetVideoTotalDuration( prettyDuration );
        greetVideoDom.current.addEventListener( 'timeupdate', updateGreetVideoElapsedTime );
    }

    function updateGreetVideoElapsedTime() {
        if ( ! greetVideoDom.current ) {
            return;
        }

        const currentTime = greetVideoDom.current.currentTime;
        const prettyCurrentTime = formatTimeAsCountdown( currentTime );

        if ( ! prettyCurrentTime ) {
            return;
        }

        setGreetVideoPlayedDuration( prettyCurrentTime );
    }

    function fullscreenGreetVideo( event ) {
        event.preventDefault();

        if (greetVideoDom.current.requestFullscreen) {
            greetVideoDom.current.requestFullscreen();
        } else if (greetVideoDom.current.webkitRequestFullscreen) { /* Safari */
            greetVideoDom.current.webkitRequestFullscreen();
        } else if (greetVideoDom.current.msRequestFullscreen) { /* IE11 */
            greetVideoDom.current.msRequestFullscreen();
        }
    }

    const handleToggleGreetVideo = e => {
        e.preventDefault()
        if (greetVideoDom.current.paused) {
            greetVideoDom.current.play();
            setState({
                isPaused: true
            });
            return;
        }
        greetVideoDom.current.pause();
        setState({
            isPaused: false
        });
    }

    function handleStopStatus(){
        setState({
            isPaused: false
        });
    }

    return (
        <PreviewWrap>
            {previewStage === 'general' ?
                <div className="wpwax-vm-preview-general">
                    <p>No Preview Available</p>
                </div>
                :
                previewStage === 'form' ?
                    <>
                        <div className="wpwax-vm-preview-from wpwax-vm-preview-form-theme-2">
                            <div className="wpwax-vm-preview-header">
                                <h4 className="wpwax-vm-preview-title">{formOption.greet_message}</h4>
                                {formOption.show_description ?
                                    <span className="wpwax-vm-preview-description">{formOption.description}</span> : ''
                                }
                            </div>
                            <div className="wpwax-vm-preview-inner">
                                {
                                    formOption.greet_video_url &&
                                    <div className="wpwax-vm-chatbox-inner-action">
                                        <span className="wpwax-vm-timer">
                                            <span className="wpwax-vm-count-time">{ greetVideoPlayedDuration }</span>
                                            <span className="wpwax-vm-total-time"> / { greetVideoTotalDuration }</span>
                                        </span>
                                        <a href="#" onClick={fullscreenGreetVideo} className="wpwax-vm-fulscreen-trigger">
                                            <ReactSVG src={expander} />
                                        </a>
                                    </div>
                                }
                                {
                                    formOption.greet_image_url !== '' ? <div className="wpwax-vm-preview-img" style={{ backgroundImage: `url("${formOption.greet_image_url}")` }}></div> : null
                                }
                                {
                                    formOption.greet_video_url !== '' ?
                                        <div className="wpwax-vm-chatbox-video">
                                            <video style={{ objectFit: 'cover' }}
                                                ref={greetVideoDom}
                                                width='100%'
                                                height='100%'
                                                className="wpwax-vm-preview-video"
                                                onLoadedMetadata={handleLoadedGreetVideoMetadata}
                                                onEnded={handleStopStatus}
                                                onClick={handleToggleGreetVideo}
                                                src={formOption.greet_video_url}
                                            />
                                        </div>
                                        : null
                                }
                                {
                                    formOption.greet_video_url !== '' ? 
                                        <a href="#" className="wpwax-vm-btn-play" onClick={e => handleToggleGreetVideo(e)}>
                                            {
                                                !isPaused ? <ReactSVG src={playIcon} /> : <ReactSVG src={pauseIcon} />
                                            }
                                        </a> : null
                                }

                            </div>
                            <div className="wpwax-vm-preview-footer">
                                <h5 className="wpwax-vm-preview-footer__title">{formOption.chat_options_title}</h5>
                                <div className="wpwax-vm-preview-footer__actions">
                                    {
                                        formOption.can_replay_in.map((item, index) =>
                                            <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" key={index}>
                                                {iconContent(item)}
                                                <span>{item === "screen_record" ? "Screen" : item}</span>
                                            </a>)
                                    }
                                </div>
                                <p className="wpwax-vm-preview-footer__text">{formOption.show_footer ? formOption.footer_message : null}</p>

                                <p className="wpwax-vm-chatbox-footer__bottom">Powered by <a href="#">WpWax</a></p>
                            </div>
                        </div>
                    </>

                    :
                    previewStage === 'thank' ?
                        <div className="wpwax-vm-preview-thank">
                            <div className="wpwax-vm-preview-thank__content">
                                <h3>{formOption.thank_page_title}</h3>
                                {
                                    formOption.show_thank_page_description ?
                                        <p>{formOption.thank_page_description}</p> :
                                        ''
                                }
                            </div>
                            <div className="wpwax-vm-preview-thank__botttom">
                                {formOption.show_thank_page_cta_button ?
                                    <button className="wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block">{formOption.thank_page_cta_button_text}</button> :
                                    ''
                                }
                            </div>
                        </div>
                        :
                        ''
            }
        </PreviewWrap>
    );
}

PreviewTwo.propTypes = {
    previewStage: propTypes.string,
};

export default PreviewTwo;