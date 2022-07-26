import { useState } from "react";
import { useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
// import apiService  from "../../../../../apiService/Service";
import { ReactSVG } from 'react-svg';
import handsDown from 'Assets/svg/icons/hand-down.svg';
import FormSettings from "./overview/FormSettings.jsx";
import GeneralSettings from "./overview/GeneralSettings.jsx";
import PreviewOne from "./overview/PreviewOne.jsx";
import PreviewTwo from "./overview/PreviewTwo.jsx";
import ThankSettings from "./overview/ThankSettings.jsx";
import { AddFormStyle } from './Style';

const AddForm = ()=>{
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data[0],
        };
    });
    
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
                <span className="wpwax-vm-preview-label"><ReactSVG src={ handsDown } />Preview your changes</span>
                {
                formInitialData.formStyle === 'theme-1' ?
                    <PreviewOne previewStage={ formStage } />
                    :
                    <PreviewTwo previewStage={formStage} />
                }
            </div>
        </AddFormStyle>
    )
}

export default AddForm;