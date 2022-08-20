import propTypes from 'prop-types';
import React from "react";
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { PreviewWrap } from './Style';

import miceIcon from 'Assets/svg/icons/mice.svg';
import recordIcon from 'Assets/svg/icons/s-record.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import videoIcon from 'Assets/svg/icons/video-camera.svg';

const PreviewTwo = ({ previewStage }) => {
    /* initialize Form Data */
    const { formOption, loading } = useSelector(state => {
        return {
            formOption: state.form.data[0].option,
            loading: state.form.loading,
        };
    });

    const iconContent = (button) => {
        if (button === 'video') {
            return <ReactSVG src={videoIcon} />
        } else if (button === 'screen_recording') {
            return <ReactSVG src={recordIcon} />
        } else if (button === 'voice') {
            return <ReactSVG src={miceIcon} />
        } else if (button === 'text') {
            return <ReactSVG src={textIcon} />
        }
    }

    const handleButtonPlay = e=>{
        e.preventDefault();
        const videoDom = document.querySelector('.wpwax-vm-preview-video');
        videoDom.play();
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
                                <h4 className="wpwax-vm-preview-title" style={{ color: formOption.font_color, fontSize: formOption.font_size }} >{formOption.greet_message}</h4>
                            </div>
                            <div className="wpwax-vm-preview-inner">
                                {
                                    formOption.greet_image_url !== '' ? <div className="wpwax-vm-preview-img" style={{ backgroundImage: `url("${formOption.greet_image_url}")` }}></div> : null
                                }
                                {
                                    formOption.greet_video_url !== '' ? <video className="wpwax-vm-preview-video" src={formOption.greet_video_url} alt="Wpwax Video Support Plugin" /> : null
                                }
                                {
                                    formOption.greet_video_url !== '' ? <a href="#" className="wpwax-vm-btn-play" onClick={e=>handleButtonPlay(e)}><i className="dashicons dashicons-controls-play"></i></a> : null
                                }
                                
                            </div>
                            <div className="wpwax-vm-preview-footer">
                                <h5 className="wpwax-vm-preview-footer__title">{formOption.chat_box_title}</h5>
                                <div className="wpwax-vm-preview-footer__actions">
                                    {
                                        formOption.can_replay_in.map((item, index) =>
                                            <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" style={{ borderRadius: `${formOption.button_border_radius}px`, backgroundColor: `${formOption.button_color}`, borderColor: `${formOption.button_color}` }} key={index}>
                                                {iconContent(item)}
                                                {item === "screen_recording" ? "Screen Recording" : item}
                                            </a>)
                                    }
                                </div>
                                {
                                    formOption.show_footer ?
                                        <p className="wpwax-vm-preview-footer__text">{formOption.footer_message}</p>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </>

                    :
                    previewStage === 'thank' ?
                        <div className="wpwax-vm-preview-thank" style={{ backgroundColor: formOption.thank_page_cta_background }}>
                            <div className="wpwax-vm-preview-thank__content">
                                <h3 style={{ color: formOption.thank_page_cta_font_color, fontSize: `${formOption.thank_page_cta_title_font_size}` }}>{formOption.thank_page_title}</h3>
                                {
                                    formOption.show_thank_page_description ?
                                        <p>{formOption.thank_page_description}</p> :
                                        ''
                                }
                            </div>
                            <div className="wpwax-vm-preview-thank__botttom">
                                {formOption.show_thank_page_cta_button ?
                                    <button className="wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block"
                                        style={{
                                            borderRadius: `${formOption.thank_page_cta_button_radius}px`,
                                            backgroundColor: formOption.thank_page_cta_button_text_color,
                                            borderColor: formOption.thank_page_cta_button_text_color,
                                            color: formOption.thank_page_cta_font_color,
                                        }}
                                    >{formOption.thank_page_cta_button_text}</button> :
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