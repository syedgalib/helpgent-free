import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "Components/formFields/Dropdown.jsx"
import angleDown from 'Assets/svg/icons/angle-down.svg';
import angleUp from 'Assets/svg/icons/angle-up.svg';
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
            text: "Dropdown"
        },
        {
            icon: "",
            text: "Dropdown"
        },
        {
            icon: "",
            text: "Dropdown"
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
                    label: "Send user an email",
                    component: <Dropdown dropdownText={false} dropdownSelectedText={true} dropdownIconOpen={angleUp} dropdownIconClose={angleDown} dropdownList={emailTemplate} dropdownWidth="full" />
                }
            ]
        }
    ];
    return (
        <SettingContentWrap className="wpwax-vm-settings-inner">
            {
                console.log(SettingContentData.filter(item => item.key == "language"))
            }
            {

                SettingContentData.filter(item => item.key == "language")[0].content.map((settingItem, index) => {
                    return (
                        <div className="wpwax-vm-settings__single" key={index}>
                            <h4 className="wpwax-vm-settings__single--label">Receive email upon message submission</h4>
                            {
                                settingItem.component
                            }
                        </div>
                    )
                })
            }
        </SettingContentWrap>
    );
}

export default SettingContent;