import React from 'react';
import Switch from "react-switch";

const EmailTemplate = props =>{
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
        <div className="wpwax-vm-setting-wrap">
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
            <div className="wpwax-vm-settings wpwax-vm-mb-20">
                <div className="wpwax-vm-settings__single">
                    <h2>Email Customization</h2>
                </div>
            </div>
            
            <div className="wpwax-vm-card">
                <div className="wpwax-vm-card-header">
                    <h3 className="wpwax-vm-card-header__title">Greetings</h3>
                </div>
                <div className="wpwax-vm-card-body">
                    <div className="wpwax-vm-settings">
                        <div className="wpwax-vm-settings__single">
                            <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-subject">Email Subject</label>
                            <div className="wpwax-vm-settings__single--element">
                                <div className="wpwax-vm-form-group">
                                    <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-mail-from-subject" name="emailTemplateGreetingSubject" placeholder="ex. mail Subject" value={contentState.options.emailTemplateGreetingSubject} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="wpwax-vm-settings__single">
                            <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-mail-from-body">Email Body</label>
                            <div className="wpwax-vm-settings__single--element">
                                <div className="wpwax-vm-form-group">
                                    <textarea className="wpwax-vm-form__element" id="wpwax-vm-mail-from-body" name="emailTemplateGreetingBody" placeholder='' value={contentState.options.emailTemplateGreetingBody} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-card">
                <div className="wpwax-vm-card-header">
                    <h3 className="wpwax-vm-card-header__title">New Meaage</h3>
                </div>
                <div className="wpwax-vm-card-body">
                    <div className="wpwax-vm-settings">
                        <div className="wpwax-vm-settings__single">
                            <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-message-mail-from-subject">Email Subject</label>
                            <div className="wpwax-vm-settings__single--element">
                                <div className="wpwax-vm-form-group">
                                    <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-message-mail-from-subject" name="emailTemplateMessageSubject" placeholder="ex. mail Subject" value={contentState.options.emailTemplateMessageSubject} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="wpwax-vm-settings__single">
                            <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-message-mail-from-body">Email Body</label>
                            <div className="wpwax-vm-settings__single--element">
                                <div className="wpwax-vm-form-group">
                                    <textarea className="wpwax-vm-form__element" id="wpwax-vm-message-mail-from-body" name="emailTemplateMessageBody" placeholder='' value={contentState.options.emailTemplateMessageBody} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailTemplate;