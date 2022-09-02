import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from 'react-svg';
import Dropdown from "Components/formFields/Dropdown.jsx"
import Radio from "Components/formFields/Radio.jsx"
import ChatBoxPreview from "./ChatBoxPreview.jsx";
import angleDown from 'Assets/svg/icons/angle-down.svg';
import angleUp from 'Assets/svg/icons/angle-up.svg';
import handRight from 'Assets/svg/icons/hand-right.svg';
import handDown from 'Assets/svg/icons/hand-down.svg';
import Switch from "react-switch";
import { SettingContentWrap } from '../Style';

const SettingContent = () => {

    /* initialize Form Data */
    const { settingActive } = useSelector(state => {
        return {
            settingActive: state.settings.sidebarPath,
        };
    });

    const [formState, setFormState] = useState({
        messageSubmission: false,
    });

    const { messageSubmission } = formState;

    const handleMessageSubmission = () => {
        setFormState({
            ...formState,
            messageSubmission: !messageSubmission
        });
    }
    const emailTemplate = [
        {
            icon: "",
            text: "Edit"
        },
        {
            icon: "",
            text: "Open"
        },
        {
            icon: "",
            text: "Newest"
        },
        {
            icon: "",
            text: "Oldest"
        },
    ];
    const SettingContentData = [
        {
            key: "language",
            content: [
                {
                    label: "Receive email upon message submission",
                    component: <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        className="wpwax-vm-switch"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={messageSubmission}
                        onChange={handleMessageSubmission}
                    />
                },
                {
                    label: "Send user an email",
                    component: <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        className="wpwax-vm-switch"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={messageSubmission}
                        onChange={handleMessageSubmission}
                    />
                },
                {
                    label: "Email template",
                    component: <Dropdown selectable dropdownText={false} dropdownSelectedText={true} dropdownIconOpen={angleUp} dropdownIconClose={angleDown} dropdownList={emailTemplate} dropdownWidth="full" />
                }
            ]
        },
        {
            key: "live-chat",
            content: [
                {
                    label: "Select the form to integrate",
                    component: <Dropdown selectable dropdownText={false} dropdownSelectedText={true} dropdownIconOpen={angleUp} dropdownIconClose={angleDown} dropdownList={emailTemplate} dropdownWidth="full" />
                },
                {
                    label: "Activate Chat Button",
                    component: <div className="wpwax-vm-setting-has-info">
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551F2"
                            offColor="#E2E2E2"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={messageSubmission}
                            onChange={handleMessageSubmission}
                        />
                        <a className="wpwax-vm-setting-info" href="#"><ReactSVG src={handRight} /> <span className="wpwax-vm-setting-has-info__text">See, what would it look like!</span></a>
                    </div>
                },
                {
                    label: "Chat Button Position",
                    component: <div className="wpwax-vm-radio-list">
                        <div className="wpwax-vm-radio-list__item">
                            <Radio id="wpwax-vm-btn-position-one" label="Position one" name="wpwax-vm-btn-position" />
                        </div>
                        <div className="wpwax-vm-radio-list__item">
                            <Radio id="wpwax-vm-btn-position-two" label="Position two" name="wpwax-vm-btn-position" />
                        </div>
                        <div className="wpwax-vm-radio-list__item">
                            <Radio id="wpwax-vm-btn-position-three" label="Position three" name="wpwax-vm-btn-position" />
                        </div>
                    </div>
                },
                {
                    label: "Chat Button Color",

                    component: <div className="wpwax-vm-form__color-plate">
                        <span className="wpwax-vm-form__color-text">#6551f2</span>
                        <label htmlFor="wpwax-vm-form-button-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: "#6551f2" }}></label>
                        <input type="color" id="wpwax-vm-form-button-color" className="wpwax-vm-form__element" value="#6551f2" />
                    </div>
                },
                {
                    label: "Chat Box Text",

                    component: <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-chat-btn-text" value="Get Started" />
                    </div>
                },
                {
                    label: "Chat Button Text",

                    component: <div className="wpwax-vm-form-group">
                        <textarea type="text" className="wpwax-vm-form__element" id="wpwax-vm-chat-btn-text" value="Leave your questions below and we will get back to you asap." />
                    </div>
                }
            ]
        }
    ];
    return (
        <SettingContentWrap className="wpwax-vm-settings-inner">
            <form action="">
                {/* {

                    SettingContentData.filter(item => item.key == "language")[0].content.map((settingItem, index) => {
                        return (
                            <div className="wpwax-vm-settings__single" key={index}>
                                <h4 className="wpwax-vm-settings__single--label">Receive email upon message submission</h4>
                                <div className="wpwax-vm-settings__single--element">
                                    {
                                        settingItem.component
                                    }
                                </div>
                            </div>
                        )
                    })
                } */}
                {
                    SettingContentData.filter(item => item.key == "live-chat")[0].content.map((settingItem, index) => {
                        return (
                            <div className="wpwax-vm-settings__single" key={index}>
                                <h4 className="wpwax-vm-settings__single--label">{settingItem.label}</h4>
                                <div className="wpwax-vm-settings__single--element">
                                    {
                                        settingItem.component
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="wpwax-vm-setting-preview-wrap">
                    <span className="wpwax-vm-indicator"><ReactSVG src={handDown} /> <span className="wpwax-vm-indicator__text">See, what would it look like!</span> </span>
                    <ChatBoxPreview />
                </div>
            </form>

        </SettingContentWrap>
    );
}

export default SettingContent;