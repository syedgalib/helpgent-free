import React from 'react';
import Switch from "react-switch";
import Radio from 'Components/form-fields/Radio.jsx';

const EmailGeneral = props =>{
    const { contentState, setContentState } = props;

    const handleUpdateSwitch = (value, event, id)=>{
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [id]: value
            }
        });
    }

    const handleChange = (event) => {
        const settingName = event.target.name;
        const settingValue = event.target.value;
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [settingName]: settingValue
            }
        });
    }
    return(
        <div className="wpwax-vm-settings">
            <div className="wpwax-vm-settings__single">
                <h4 className="wpwax-vm-settings__single--label">Enable Email Notification</h4>
                <div className="wpwax-vm-settings__single--element">
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        className="wpwax-vm-switch"
                        id="enableEmailNotification"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={contentState.options.enableEmailNotification || true}
                        onChange={handleUpdateSwitch}
                    />
                    <div className={contentState.options.enableEmailNotification || true ? "wpwax-vm-settings__swtich-content wpwax-vm-show" : "wpwax-vm-settings__swtich-content"}>
                        <div className="wpwax-vm-settings__swtich-content--item">
                            <h4>Admin Events</h4>
                            <div className='wpwax-vm-radio-list'>
                                <div className='wpwax-vm-radio-single'>
                                    <Radio
                                        id='wpwax-vm-admin-send-mail-single'
                                        label='First message in a conversation'
                                        value='single'
                                        name='adminEmailNotificationType'
                                        onChange={(e) => handleChange(e)}
                                        checked={contentState.options.adminEmailNotificationType || "multiple" === "single"}
                                    />
                                </div>
                                <div className='wpwax-vm-radio-single'>
                                    <Radio
                                        id='wpwax-vm-admin-send-mail-multiple'
                                        label='Every message in a conversion'
                                        value='multiple'
                                        name='adminEmailNotificationType'
                                        onChange={(e) => handleChange(e)}
                                        checked={contentState.options.adminEmailNotificationType || "multiple" === "multiple"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="wpwax-vm-settings__swtich-content--item">
                            <h4>User Events</h4>
                            <div className='wpwax-vm-radio-list'>
                                <div className='wpwax-vm-radio-single'>
                                    <Radio
                                        id='wpwax-vm-user-send-mail-single'
                                        label='First message in a conversation'
                                        value='single'
                                        name='userEmailNotificationType'
                                        onChange={(e) => handleChange(e)}
                                        checked={contentState.options.userEmailNotificationType || "multiple" === "single"}
                                    />
                                </div>
                                <div className='wpwax-vm-radio-single'>
                                    <Radio
                                        id='wpwax-vm-user-send-mail-multiple'
                                        label='Every message in a conversion'
                                        value='multiple'
                                        name='userEmailNotificationType'
                                        onChange={(e) => handleChange(e)}
                                        checked={contentState.options.userEmailNotificationType || "multiple" === "multiple"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-name">From Name</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-name" name="emailTemplateFromName" placeholder="ex. Vidsupp" value={contentState.options.emailTemplateFromName || "Help"} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-email">From Email</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-email" name="emailTemplateFromEmail" placeholder="example@gmail.com" value={contentState.options.emailTemplateFromEmail} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default EmailGeneral;