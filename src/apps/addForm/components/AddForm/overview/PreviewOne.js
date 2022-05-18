import React, { useState, useEffect, useRef } from "react";
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PreviewWrap } from './Style';

const PreviewOne = ({previewStage})=>{
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
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
                <div className="wpwax-vm-preview-from">
                    <div className="wpwax-vm-preview-bg"></div>
                    <div className="wpwax-vm-preview-header">
                        <h4 className="wpwax-vm-preview-title">{formInitialData.greet_message}</h4>
                        <span className="wpwax-vm-preview-subtitle">{formInitialData.description}</span>
                    </div>
                    <div className="wpwax-vm-preview-inner">
                        <a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
                    </div>
                    <div className="wpwax-vm-preview-footer">
                        <h5 className="wpwax-vm-preview-footer__title">How would you like to chat?</h5>
                        <div className="wpwax-vm-preview-footer__actions">
                            {
                                formInitialData.reply_type
                                .map((item,key) =>{
                                    return(
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" key={key}>{item}</a>
                                    );
                                })
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
                :
                previewStage === 'thank' ?
                <div className="wpwax-vm-preview-thank">
                    <div className="wpwax-vm-preview-thank__content">
                        <h3>Thank you</h3>
                        <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface</p>
                    </div>
                    <div className="wpwax-vm-preview-thank__botttom">
                        <button className="wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block">{formInitialData.thank_page_button_text}</button>
                    </div>
                </div>
                :
                ''
            }
        </PreviewWrap>
    )
}

PreviewOne.propTypes = {
    previewStage: propTypes.string,
};

export default PreviewOne;