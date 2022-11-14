import React, { useState } from 'react';



const License = (props) => {

    const [state, setState] = useState({
        licenseStatus: 'diactivated',
        updateLicense: false,
        updateLicenseMessage: ''
    });
    const { contentState, setContentState } = props;

    const handleUpdateSwitch = (value, event, id) => {
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [id]: value,
            },
        });
    };

    const handleChange = (event) => {
        const settingName = event.target.name;
        const settingValue = event.target.value;
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [settingName]: settingValue,
            },
        });
    };

    const handleChangeSelectValue = (selectEvent, e) => {
        // let updatedData = '';
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [e.name]: selectEvent.value,
            },
        });
    };

    return (
        <div className='wpwax-vm-settings'>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='wpwax-vm-license-key'
                >
                    Active you license
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <div className='wpwax-vm-form-group wpwax-vm-form-group-mixed'>
                        <input
                            type='text'
                            className='wpwax-vm-form__element'
                            id='wpwax-vm-license-key'
                            name='licenseKey'
                            placeholder='Ex: helpgent'
                            value={contentState.options.licenseKey}
                            onChange={handleChange}
                        />
                        <button className={state.licenseStatus ==='diactivated' ? 'wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-success wpwax-vm-btn-activation' : 'wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-danger wpwax-vm-btn-activation'}>
                            {state.licenseStatus ==='diactivated' ? 'Activate' : "Diactivate"}
                        </button>
                    </div>
                    {
                        state.updateLicense ? <span className="wpwax-alert-success">{state.updateLicenseMessage}</span> : <span className="wpwax-alert-danger">{state.updateLicenseMessage}</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default License;
