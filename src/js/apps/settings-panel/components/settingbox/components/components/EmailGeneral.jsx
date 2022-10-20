import React from 'react';
import Switch from "react-switch";
import Radio from 'Components/form-fields/Radio.jsx';

const EmailGeneral = props =>{
    const { contentState, setContentState } = props;
    const handleUpdateSwitch = (value, event, id)=>{
        console.log(value)
        if(id === "wpwax-vm-enable-mail-notification"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    enableEmailNotification: value
                }
            });
        }else if(id === "wpwax-vm-enable-mail"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    enableHtmlEmail: value
                }
            });
        }else if(id === "wpwax-vm-enable-mail-header"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    enableEmailHeader: value
                }
            });
        }else if(id === "wpwax-vm-add-site-logo"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    addSiteLogo: value
                }
            });
        }
    }
    const handleUpdateInput = (event)=>{
        if(event.target.id === "wpwax-vm-mail-header-color"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailHeaderColor: event.target.value
                }
            });
        }else if(event.target.id === "wpwax-vm-mail-from-name"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailTemplateFromName: event.target.value
                }
            });
        }else if(event.target.id === "wpwax-vm-mail-from-email"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailTemplateFromEmail: event.target.value
                }
            });
        }else if(event.target.id === "wpwax-vm-mail-from-subject"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailTemplateFromSubject: event.target.value
                }
            });
        }else if(event.target.id === "wpwax-vm-mail-from-body"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailTemplateBody: event.target.value
                }
            });
        }
    }
    const handleSettingSwitch = (event)=>{
        
    }
    const handleUpdateRadio = (event)=>{
        if(event.target.id === "wpwax-vm-send-mail-single"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailNotificationType: "single"
                }
            })
        }else if(event.target.id === "wpwax-vm-send-mail-multiple"){
            setContentState({
                ...contentState,
                options: {
                    ...contentState.options,
                    emailNotificationType: "multiple"
                }
            })
        }
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
                        id="wpwax-vm-enable-mail-notification"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={contentState.options.enableEmailNotification}
                        onChange={handleUpdateSwitch}
                    />
                    <div className="wpwax-vm-settings__swtich-content">
                        <div className='wpwax-vm-radio-list'>
                            <div className='wpwax-vm-radio-single'>
                                <Radio
                                    id='wpwax-vm-send-mail-single'
                                    label='First message in a conversation'
                                    value='single'
                                    name='wpwax-vm-send-mail-option'
                                    onChange={(e) => handleUpdateRadio(e)}
                                    checked={contentState.options.emailNotificationType === "single"}
                                />
                            </div>
                            <div className='wpwax-vm-radio-single'>
                                <Radio
                                    id='wpwax-vm-send-mail-multiple'
                                    label='Every message in a conversion'
                                    value='multiple'
                                    name='wpwax-vm-send-mail-option'
                                    onChange={(e) => handleUpdateRadio(e)}
                                    checked={contentState.options.emailNotificationType === "multiple"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <h4 className="wpwax-vm-settings__single--label">Enable HTML email</h4>
                <div className="wpwax-vm-settings__single--element">
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        className="wpwax-vm-switch"
                        id="wpwax-vm-enable-mail"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={contentState.options.enableHtmlEmail}
                        onChange={handleUpdateSwitch}
                    />
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <h4 className="wpwax-vm-settings__single--label">Enable Header</h4>
                <div className="wpwax-vm-settings__single--element">
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        className="wpwax-vm-switch"
                        id="wpwax-vm-enable-mail-header"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={contentState.options.enableEmailHeader}
                        onChange={handleUpdateSwitch}
                    />
                    <div className="wpwax-vm-settings__swtich-content">
                        <div className="wpwax-vm-form__color-plate wpwax-vm-mb-20 wpwax-vm-mt-20">
                            <span className="wpwax-vm-form__color-text">{contentState.options.emailHeaderColor}</span>
                            <label htmlFor="wpwax-vm-mail-header-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: contentState.options.emailHeaderColor }}></label>
                            <input type="color" id="wpwax-vm-mail-header-color" className="wpwax-vm-form__element" value={contentState.options.emailHeaderColor} onChange={handleUpdateInput}/>
                        </div>
                        <div className="wpwax-vm-inline-switch">
                            <label htmlFor="">Add site logo</label>
                            <Switch
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onColor="#6551F2"
                                offColor="#E2E2E2"
                                className="wpwax-vm-switch"
                                id="wpwax-vm-add-site-logo"
                                handleDiameter={14}
                                height={22}
                                width={40}
                                checked={contentState.options.addSiteLogo}
                                onChange={handleUpdateSwitch}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-name">Email From Name</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-name" placeholder="ex. Vidsupp" value={contentState.options.emailTemplateFromName} onChange={handleUpdateInput}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-email">Email From Email</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-email" placeholder="example@gmail.com" value={contentState.options.emailTemplateFromEmail} onChange={handleUpdateInput}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-subject">Email From  Subject</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-subject" placeholder="ex. mail Subject" value={contentState.options.emailTemplateSubject} onChange={handleUpdateInput}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-body">Email From  Body</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <textarea className="wpwax-vm-form__element" id="wpwax-vm-mail-from-body" placeholder='' value={contentState.options.emailTemplateBody} onChange={handleUpdateInput}/>
                    </div>
                    <div className="wpwax-vm-note">
                        <div className="wpwax-vm-note__icon">
                            <span className="dashicons dashicons-info"></span>
                        </div>
                        <div className="wpwax-vm-note__inner">
                            <h4 className="wpwax-vm-note__title">Allowed Placeholders</h4>
                            <div className="wpwax-vm-note__content">
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==NAME==:</span>
                                    <span className="wpwax-vm-note__single--text">Name of the person who sent the initial message.</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==SITE_NAME==:</span>
                                    <span className="wpwax-vm-note__single--text">It outputs your site name</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==SITE_LINK==:</span>
                                    <span className="wpwax-vm-note__single--text">==It outputs your site url with link==</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==SITE_URL==:</span>
                                    <span className="wpwax-vm-note__single--text"> It outputs your site url with link</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==MESSAGE==:</span>
                                    <span className="wpwax-vm-note__single--text">It outputs messege details.</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==TODAY==:</span>
                                    <span className="wpwax-vm-note__single--text">It outputs the current date</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==NOW==:</span>
                                    <span className="wpwax-vm-note__single--text">It outputs the current time</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==DASHBOARD_LINK==:</span>
                                    <span className="wpwax-vm-note__single--text">It outputs the user dashboard page link</span>
                                </div>
                                <div className="wpwax-vm-note__single">
                                    <span className="wpwax-vm-note__single--label">==REPLIER_NAME==:</span>
                                    <span className="wpwax-vm-note__single--text">the person who will reply in a conversation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default EmailGeneral;