import React, { useState, useEffect, useRef } from "react";
import propTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { PreviewWrap } from './Style';
import formImg from '../../../../../../assets/img/builder/form-img.png';
import replaceIcon from '../../../../../../assets/svg/icons/replace.svg';
import previewBg from '../../../../../../assets/img/builder/bg.png';

const PreviewTwo = ({templateMode, theme})=>{
    const { chatBoxData } = useSelector(state => {
        return {
            chatBoxData: state.form.data[0],
        };
    });
    return(
        <PreviewWrap>
                <>
                    <div className={theme === "theme-bg" ? "wpwax-vm-preview-from": "wpwax-vm-preview-from wpwax-vm-preview-form-theme-2"}>
                        <div className="wpwax-vm-preview-header">
                            <h4 className="wpwax-vm-preview-title" style={{color: chatBoxData.font_color}} >{chatBoxData.greet_message}</h4>
                        </div>
                        <div className="wpwax-vm-preview-inner">
                            <div className="wpwax-vm-preview-img" style={{backgroundImage: `url("${ previewBg }")`}}></div>
                            <a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
                        </div>
                        <div className="wpwax-vm-preview-footer">
                            <h5 className="wpwax-vm-preview-footer__title">{chatBoxData.chat_box_title}</h5>
                            <div className="wpwax-vm-preview-footer__actions">
                                {
                                    chatBoxData.reply_type_video ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${chatBoxData.button_border_radius}px`, backgroundColor: `${chatBoxData.button_color}`, borderColor: `${chatBoxData.button_color}`}}>Video</a>
                                    :''
                                }
                                {
                                    chatBoxData.reply_type_screen_record ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${chatBoxData.button_border_radius}px`, backgroundColor: `${chatBoxData.button_color}`, borderColor: `${chatBoxData.button_color}`}}>Screen Record</a>
                                    :''
                                }
                                {
                                    chatBoxData.reply_type_voice ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${chatBoxData.button_border_radius}px`, backgroundColor: `${chatBoxData.button_color}`, borderColor: `${chatBoxData.button_color}`}}>Voice</a>
                                    :''
                                }
                                {
                                    chatBoxData.reply_type_text ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${chatBoxData.button_border_radius}px`, backgroundColor: `${chatBoxData.button_color}`, borderColor: `${chatBoxData.button_color}`}}>Text</a>
                                    :''
                                }
                            </div>
                            {
                                chatBoxData.footer_visibility ?
                                <p className="wpwax-vm-preview-footer__text">{chatBoxData.footer_message}</p>
                                :
                                ''
                            }
                            {templateMode === "admin"? 
                                <div className="wpwax-vm-media-preview">
                                    <img src={ formImg } alt="wpwax Media" />
                                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-white wpwax-vm-media-preview__replace"><ReactSVG src={ replaceIcon } />Replace</a>
                                </div>
                                :
                                ''
                            }
                        </div>
                    </div>
                </>
        </PreviewWrap>
    )
}

PreviewTwo.propTypes = {
    previewStage: propTypes.string,
};

export default PreviewTwo;