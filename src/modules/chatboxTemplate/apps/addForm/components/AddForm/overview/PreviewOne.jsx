import propTypes from 'prop-types';
import React from "react";
import { useSelector } from 'react-redux';
import { PreviewWrap } from './Style';


const PreviewOne = ({ previewStage }) => {
    /* initialize Form Data */
    const { formOption } = useSelector(state => {
        return {
            formOption: state.form.data[0].option,
        };
    });
    return (
        <PreviewWrap>
            {previewStage === 'general' ?
                <div className="wpwax-vm-preview-general">
                    <p>No Preview Available</p>
                </div>
                :
                previewStage === 'form' ?
                    <>
                        <div className="wpwax-vm-preview-from" style={{ fontFamily: formOption.font }} >
                            <div className="wpwax-vm-preview-bg"></div>
                            <div className="wpwax-vm-preview-header">
                                <h4 className="wpwax-vm-preview-title" style={{ color: formOption.font_color, fontSize: formOption.font_size }} >{formOption.greet_message}</h4>
                                {formOption.show_description ?
                                    <span className="wpwax-vm-preview-subtitle">{formOption.description}</span> : ''
                                }

                            </div>
                            <div className="wpwax-vm-preview-inner">
                                <a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
                            </div>
                            <div className="wpwax-vm-preview-footer">
                                <h5 className="wpwax-vm-preview-footer__title">{formOption.chat_box_title}</h5>
                                <div className="wpwax-vm-preview-footer__actions">
                                    {
                                        formOption.can_replay_in.map((item, index) => <a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" style={{ borderRadius: `${formOption.button_border_radius}px`, backgroundColor: `${formOption.button_color}`, borderColor: `${formOption.button_color}` }} key={index}>{item === "screen_recording" ? "Screen Recording" : item}</a>)
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
                                        <p style={{ color: formOption.thank_page_cta_font_color }}>{formOption.thank_page_description}</p> :
                                        ''
                                }
                            </div>
                            <div className="wpwax-vm-preview-thank__botttom">
                                {formOption.show_thank_page_cta_button ?
                                    <button className="wpwax-vm-btn wpwax-vm-btn-primary wpwax-vm-btn-lg wpwax-vm-btn-block"
                                        style={{
                                            borderRadius: `${formOption.thank_page_cta_button_radius}px`,
                                            backgroundColor: formOption.thank_page_cta_button_color,
                                            borderColor: formOption.thank_page_cta_button_color,
                                            color: formOption.thank_page_cta_button_text_color,
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

PreviewOne.propTypes = {
    previewStage: propTypes.string,
};

export default PreviewOne;