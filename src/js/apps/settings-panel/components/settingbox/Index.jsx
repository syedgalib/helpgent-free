import React, { useState, useEffect } from 'react';
import ReactSVG from 'react-inlinesvg';
import apiService from 'apiService/Service.js';
import Sidebar from "./components/Sidebar.jsx";
import SettingContent from "./components/SettingContent.jsx";
import File from 'Assets/svg/icons/file.svg';
import QuestonCircle from 'Assets/svg/icons/question-circle.svg';
import LoadingSpinDot from 'Components/LoadingSpinDot.jsx';
import { SetingBoxWrap } from './Style';

const SettingBox = () => {
    const [settingContentState, setSettingContentState] = useState({
        contentKey: "general",
        options: {
            userDashboardPage: "2",
            maxVideoLength: "2",
            videoQuality: "700",
            attatchmentDeletionAfter: "20",
            maxUploadSize: "300",
            enableEmailNotification: true,
            adminEmailNotificationType: "single",
            userEmailNotificationType: "single",
            enableEmailHeader: true,
            emailHeaderColor: "#000000",
            addSiteLogo: true,
            emailTemplateFromName: "",
            emailTemplateFromEmail: "",
            emailTemplateGreetingSubject: "",
            emailTemplateGreetingBody: "",
            emailTemplateMessageSubject: "",
            emailTemplateMessageBody: ""
        },
        loading: true
    });

    const getPath = ()=> {
        if(settingContentState.contentKey === "email_general"){
            return "Email General";
        }else if(settingContentState.contentKey === "email_template"){
            return "Email Template"
        }
    }

    useEffect(() => {

        setSettingContentState({
            ...settingContentState,
            loading: true,
        });

		const fetchSettings = async ()=>{
            const fetchSettingsResponse = await apiService.getAll('/settings')
            return fetchSettingsResponse;
        }

        fetchSettings()
            .then( fetchSettingsResponse => {
                setSettingContentState({
                    ...settingContentState,
                    options: fetchSettingsResponse.data.data,
                    loading: false,
                });
            })
            .catch((error) => {
                setSettingContentState({
                    ...settingContentState,
                    loading: false,
                });
            });
    }, []);

    const handleSaveSetting = event => {
        event.preventDefault();
        setSettingContentState({
            ...settingContentState,
            loading: true,
        });
        const saveSettings = async ()=>{
            const saveSettingsResponse = await apiService.dataAdd(`/settings`, settingContentState)
            return saveSettingsResponse;
        }
        saveSettings()
            .then( saveSettingsResponse => {
                setSettingContentState({
                    ...settingContentState,
                    options: saveSettingsResponse.data.data,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log(error)
                setSettingContentState({
                    ...settingContentState,
                    loading: false,
                });
            });
    }

    return (
        <SetingBoxWrap>
            <div className="wpwax-vm-settings-top">
                <h2 className="wpwax-vm-settings-top__title">Settings</h2>

                <div className="wpwax-vm-settings-top__links">
                    <a href="#">
                        <span className="wpwax-vm-settings-top__link-icon"><ReactSVG src={File} /></span>
                        <span className="wpwax-vm-settings-top__link-text">Documentation</span>
                    </a>
                    <a href="#">
                        <span className="wpwax-vm-settings-top__link-icon"><ReactSVG src={QuestonCircle} /></span>
                        <span className="wpwax-vm-settings-top__link-text">Support</span>
                    </a>
                </div>
            </div>
            <div className="wpwax-vm-seetings-box">
                <div className="wpwax-vm-seetings-box__header">
                    <div className="wpwax-vm-seetings-box__breadcrumb">
                        <ul>
                            <li><a href="#">Email <span className="dashicons dashicons-arrow-right-alt2"></span></a></li>
                            <li><a href="#" className="wpwax-vm-active">{getPath()}</a></li>
                        </ul>
                    </div>
                    <div className="wpwax-vm-seetings-box__actions">
                        {/* <div className="wpwax-vm-seetings-box-search">
                            <input type="text" name="wpwax-vm-settings-search" id="wpwax-vm-settings-search" placeholder="Search settings here..." />
                        </div> */}
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={handleSaveSetting}>Save Changes</a>
                    </div>
                </div>
                <div className="wpwax-vm-seetings-box__body">
                    <Sidebar contentState={settingContentState} setContentState={setSettingContentState} />
                    
                    <div className={settingContentState.loading ? "wpwax-settings-content-box wpwax-vm-loder-active" : "wpwax-settings-content-box"}>
                        {
                            settingContentState.loading ? <LoadingSpinDot /> : <SettingContent contentState={settingContentState} setContentState={setSettingContentState} />

                        }
                    </div>
                </div>
                <div className="wpwax-vm-seetings-box__footer">
                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={handleSaveSetting}>Save Changes</a>
                </div>
            </div>
        </SetingBoxWrap>
    );
}

export default SettingBox;