import React, { useState } from 'react';

const Modal = props => {

    return (
        <React.Fragment>
            <span className={props.status === "open" ? "wpax-vm-overlay wpwax-vm-show" : "wpax-vm-overlay"}></span>
            <div className={props.status === "open" ? "wpwax-vm-modal wpwax-vm-modal-basic wpwax-vm-show" : "wpwax-vm-modal wpwax-vm-modal-basic"}>
                <div className="wpwax-vm-modal__header">
                    <h2 className="wpwax-vm-modal-title">{props.title}</h2>
                    <a href="#" className="wpwax-vm-modal-close" onClick={props.handleCancel}><span className="dashicons dashicons-no"></span></a>
                </div>
                <div className="wpwax-vm-modal__body">
                    {props.children}
                </div>
                <div className="wpwax-vm-modal__footer">
                    <div className="wpwax-vm-modal-footer__action">
                        <a href="#" className="wpwax-vm-modal-footer__action--cancel" onClick={props.handleCancel}>Cancel</a>
                        <a href="#" className="wpwax-vm-modal-footer__action--ok" onClick={props.handleOk}>Ok</a>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};

export default Modal;