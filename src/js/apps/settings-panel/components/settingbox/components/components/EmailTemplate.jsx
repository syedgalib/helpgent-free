import React from 'react';
import Radio from 'Components/form-fields/Radio.jsx';

const EmailTemplate = ()=>{
    return(
        <div className="wpwax-vm-settings__single">
            <h4 className="wpwax-vm-settings__single--label">Enable Email Notification</h4>
            <div className="wpwax-vm-settings__single--element">
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
                <div className="wpwax-vm-settings__swtich-content">
                    <div className='wpwax-vm-radio-list'>
                        <div className='wpwax-vm-radio-single'>
                            <span>First message in a conversation</span>
                            <Radio
                                id='wpwax-vm-never-show'
                                label=''
                                value='never_load'
                                name='wpwax-vm-close-option'
                                onChange={(e) => handleChatVisibility(e)}
                                checked={chatVisibilityType === 'never_load'}
                            />
                        </div>
                        <div className='wpwax-vm-radio-single'>
                            <span>Every message in a conversion</span>
                            <Radio
                                id='wpwax-vm-load-show'
                                label=''
                                value='show_on_reload'
                                name='wpwax-vm-close-option'
                                onChange={(e) => handleChatVisibility(e)}
                                checked={chatVisibilityType === 'show_on_reload'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailTemplate;