import { useState } from "react";
import { useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import Dropdown from "Components/form-fields/Dropdown.jsx"
import Radio from "Components/form-fields/Radio.jsx"
import ChatBoxPreview from "./ChatBoxPreview.jsx";
import EmailGeneral from './components/EmailGeneral.jsx';
import EmailTemplate from "./components/EmailTemplate.jsx";
import angleDown from 'Assets/svg/icons/angle-down.svg';
import angleUp from 'Assets/svg/icons/angle-up.svg';
import handRight from 'Assets/svg/icons/hand-right.svg';
import handDown from 'Assets/svg/icons/hand-down.svg';
import Switch from "react-switch";
import { SettingContentWrap } from '../Style';

const SettingContent = props => {

    const { contentState, setContentState } = props;
    
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
    return (
        <SettingContentWrap className="wpwax-vm-settings-inner">
            <form action="">
                {
                    contentState.contentKey === "email_general" ? <EmailGeneral  contentState={contentState} setContentState={setContentState} /> : null
                }
                {
                    contentState.contentKey === "email_template" ? <EmailTemplate  contentState={contentState} setContentState={setContentState} /> : null
                }
                
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
                {/* {
                    SettingContentData.filter(item => item.key == contentState.contentKey)[0].content.map((settingItem, index) => {
                        return (
                            
                        )
                    })
                } */}
                {/* <div className="wpwax-vm-setting-preview-wrap">
                    <span className="wpwax-vm-indicator"><ReactSVG src={handDown} /> <span className="wpwax-vm-indicator__text">See, what would it look like!</span> </span>
                    <ChatBoxPreview />
                </div> */}
            </form>

        </SettingContentWrap>
    );
}

export default SettingContent;