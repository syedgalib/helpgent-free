import React, { useState, useEffect, useRef } from "react";
// import apiService  from "../../../../../apiService/Service";
import GeneralSettings from "./overview/GeneralSettings";
import PreviewOne from "./overview/PreviewOne";
import { AddFormStyle } from './Style';

const AddForm = ()=>{

    return(
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="">
                    <div className="wpwax-vm-add-form__top">
                        <a href="#" className="wpwax-vm-add-form__top-btn wpwax-vm-active">General</a>
                        <a href="#" className="wpwax-vm-add-form__top-btn">Form Settings</a>
                        <a href="#" className="wpwax-vm-add-form__top-btn">Thank You Page</a>
                    </div>
                    <div className="wpwax-vm-add-form__content">
                        <GeneralSettings/>
                    </div>
                    <div className="wpwax-vm-add-form__bottom">
                        <a href="#" className="wpwax-vm-form-save">Save</a>
                    </div>
                </form>
            </div>
            <div className="wpwax-vm-preview">
                <span className="wpwax-vm-preview-label">Preview your changes</span>
                <PreviewOne />
            </div>
        </AddFormStyle>
    )
}

export default AddForm;