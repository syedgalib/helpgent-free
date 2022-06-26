import React, { useState, useEffect, useRef } from "react";
import propTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { PreviewWrap } from './Style';
import formImg from '../../../../../../assets/img/builder/form-img.png';
import replaceIcon from '../../../../../../assets/svg/icons/replace.svg';
import previewBg from '../../../../../../assets/img/builder/bg.png';

const PreviewTwo = ({previewStage})=>{
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data[0],
        };
    });

    return(
        <PreviewWrap>
            { previewStage === 'general' ?
                <div className="wpwax-vm-preview-general">
                    <p>No Preview Available</p>
                </div>
                :
                previewStage === 'form' ?
                <>
                    <div className="wpwax-vm-preview-from wpwax-vm-preview-form-theme-2">
                        <div className="wpwax-vm-preview-header">
                            <h4 className="wpwax-vm-preview-title" style={{color: formInitialData.font_color}} >{formInitialData.greet_message}</h4>
                        </div>
                        <div className="wpwax-vm-preview-inner">
                            <div className="wpwax-vm-preview-img" style={{backgroundImage: `url("${ previewBg }")`}}></div>
                            <a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
                        </div>
                        <div className="wpwax-vm-preview-footer">
                            <h5 className="wpwax-vm-preview-footer__title">{formInitialData.chat_box_title}</h5>
                            <div className="wpwax-vm-preview-footer__actions">
                                {
                                    formInitialData.reply_type_video ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${formInitialData.button_border_radius}px`, backgroundColor: `${formInitialData.button_color}`, borderColor: `${formInitialData.button_color}`}}>Video</a>
                                    :''
                                }
                                {
                                    formInitialData.reply_type_screen_record ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${formInitialData.button_border_radius}px`, backgroundColor: `${formInitialData.button_color}`, borderColor: `${formInitialData.button_color}`}}>Screen Record</a>
                                    :''
                                }
                                {
                                    formInitialData.reply_type_voice ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${formInitialData.button_border_radius}px`, backgroundColor: `${formInitialData.button_color}`, borderColor: `${formInitialData.button_color}`}}>Voice</a>
                                    :''
                                }
                                {
                                    formInitialData.reply_type_text ? 
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{borderRadius: `${formInitialData.button_border_radius}px`, backgroundColor: `${formInitialData.button_color}`, borderColor: `${formInitialData.button_color}`}}>Text</a>
                                    :''
                                }
                            </div>
                            {
                                formInitialData.footer_visibility ?
                                <p className="wpwax-vm-preview-footer__text">{formInitialData.footer_message}</p>
                                :
                                ''
                            }
                        </div>
                    </div>
                </>
                
                :
                previewStage === 'thank' ?
                <div className="wpwax-vm-preview-thank" style={{backgroundColor: formInitialData.thank_page_background}}>
                    <div className="wpwax-vm-preview-thank__content">
                        <h3 style={{color: formInitialData.thank_page_font_color, fontSize: `${formInitialData.thank_page_title_font_size}`}}>{formInitialData.thank_page_title}</h3>
                        {
                            formInitialData.thank_page_description_Visibility?
                            <p>{formInitialData.thank_page_description}</p>:
                            ''
                        }
                    </div>
                    <div className="wpwax-vm-preview-thank__botttom">
                        {formInitialData.thank_page_button_visibility ?
                            <button className="wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block"
                                style={{
                                    borderRadius: `${formInitialData.thank_page_button_radius}px`,
                                    backgroundColor: formInitialData.thank_page_button_color, 
                                    borderColor: formInitialData.thank_page_button_color, 
                                    color: formInitialData.thank_page_button_text_color, 
                                }}
                            >{formInitialData.thank_page_button_text}</button>:
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