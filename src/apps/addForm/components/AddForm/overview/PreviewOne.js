import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { PreviewWrap } from './Style';

const PreviewOne = ()=>{
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
        };
    });
    
    return(
        <PreviewWrap>
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
                        .map(item =>{
                            return(
                                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary">{item}</a>
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
        </PreviewWrap>
    )
}

export default PreviewOne;