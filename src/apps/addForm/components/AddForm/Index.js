import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import apiService  from "../../../../../apiService/Service";
import { ReactSVG } from 'react-svg';
import GeneralSettings from "./overview/GeneralSettings";
import FormSettings from "./overview/FormSettings";
import ThankSettings from "./overview/ThankSettings";
import PreviewOne from "./overview/PreviewOne";
import { AddFormStyle } from './Style';

const AddForm = ()=>{

    const [formStage, setFormStage] = useState("general");
    
    return(
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="">
                    <Tabs className="wpwax-vm-add-form__tab">
                        <TabList className="wpwax-vm-add-form__top">
                            <Tab href="#" className="wpwax-vm-add-form__top--btn" onClick={() => setFormStage("general")}>General</Tab>
                            <Tab href="#" className="wpwax-vm-add-form__top--btn" onClick={() => setFormStage("form")}>Form Settings</Tab>
                            <Tab href="#" className="wpwax-vm-add-form__top--btn" onClick={() => setFormStage("thank")}>Thank You Page</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="wpwax-vm-add-form__content">
                                <GeneralSettings/>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="wpwax-vm-add-form__content">
                                <FormSettings />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="wpwax-vm-add-form__content">
                                <ThankSettings/>
                            </div>
                        </TabPanel>
                    </Tabs>
                    
                    
                    <div className="wpwax-vm-add-form__bottom">
                        <a href="#" className="wpwax-vm-form-save">Save</a>
                    </div>
                </form>
            </div>
            <div className="wpwax-vm-preview">
                <span className="wpwax-vm-preview-label"><ReactSVG src={require(`../../../../../assets/svg/icons/hand-down.svg`).default} />Preview your changes</span>
                <PreviewOne previewStage={ formStage } />
            </div>
        </AddFormStyle>
    )
}

export default AddForm;