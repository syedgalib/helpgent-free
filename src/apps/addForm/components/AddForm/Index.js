import React, { useState, useEffect, useRef } from "react";
// import apiService  from "../../../../../apiService/Service";
import GeneralSettings from "./overview/GeneralSettings";
import { AddFormStyle } from './Style';

const AddForm = ()=>{

    return(
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="">
                    <div className="wpwax-vm-add-form__top">

                    </div>
                    <div className="wpwax-vm-add-form__content">
                        <GeneralSettings/>
                    </div>
                    <div className="wpwax-vm-add-form__bottom">
                        <button className="wpwax-vm-btn wpwax.vm-btn-primary">Save</button>
                    </div>
                    
                </form>
            </div>
            <div className="wpwax-vm-form-preview">
                
            </div>
        </AddFormStyle>
    )
}

export default AddForm;