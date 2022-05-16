import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import apiService  from "../../../../../apiService/Service";
import GeneralSettings from "./overview/GeneralSettings";
import PreviewOne from "./overview/PreviewOne";
import { AddFormStyle } from './Style';

const AddForm = ()=>{

    return(
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="">
                    <Tabs className="wpwax-vm-add-form__tab">
                        <TabList className="wpwax-vm-add-form__top">
                            <Tab href="#" className="wpwax-vm-add-form__top-btn wpwax-vm-active">General</Tab>
                            <Tab href="#" className="wpwax-vm-add-form__top-btn">Form Settings</Tab>
                            <Tab href="#" className="wpwax-vm-add-form__top-btn">Thank You Page</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="wpwax-vm-add-form__content">
                                <GeneralSettings/>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </Tabs>
                    
                    
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