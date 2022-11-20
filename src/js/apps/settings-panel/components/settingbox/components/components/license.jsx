import React, { useState } from 'react';
import useLicenseAPI from 'API/useLicenseAPI.js';
import Modal from 'Components/Modal.jsx';

const License = (props) => {

    const { updateItem: updateLicense } = useLicenseAPI();
    const [state, setState] = useState({
        updateLicense: false,
        modalStatus: false,
    });

    const [messageState, setMessageState] = useState({
        updateLicenseMessageType: '',
        updateLicenseMessage: ''
    });
    const { contentState, setContentState } = props;


    /* Handle Delete Confirmation */
    const handleOk = (e) => {
        e.preventDefault();
        updateLicenseStatus();
    };

    /* Handle Delete Modal Cancelation */
    const handleCancel = (e) => {
        e.preventDefault();
        setState({
            ...state,
            modalStatus: 'close',
        });
    };

    /* Handle Input Change */
    const handleInputChange = (event) => {
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

    /* Handle License Activate & Deactivate */
    const handleLicense = event =>{
        event.preventDefault();
        if(onlySpaces(contentState.options.helpgent_license)){
            setMessageState({
                ...messageState,
                updateLicenseMessageType: 'danger',
                updateLicenseMessage: 'Plear Enter Your License Key'
            });
            return;
        }
        if(contentState.options.helpgent_license_activated ===1){
            setState({
                ...state,
                modalStatus: 'open',
            });
            
        }else{
            updateLicenseStatus();
        }
    }

    function onlySpaces(str) {
        return str.trim().length === 0;
    }

    /* Handle License Status Update */
    function updateLicenseStatus(){
        const licenseKey = {
            license: contentState.options.helpgent_license,
            action: `${contentState.options.helpgent_license_activated === 1 ? 'deactivate' : 'activate'}`
        }
        setState({
            ...state,
            modalStatus: 'close',
            updateLicense: true,
        });
        const licenseUpdate = async () => {
            const licenseUpdateResponse = await updateLicense(licenseKey);
            return licenseUpdateResponse;
        };
        licenseUpdate()
            .then((licenseUpdateResponse) => {
                if(licenseUpdateResponse.success){
                    setState({
                        ...state,
                        modalStatus: 'close',
                        updateLicense: false,
                        
                    });
                    setMessageState({
                        ...messageState,
                        updateLicenseMessageType: 'success',
                        updateLicenseMessage: licenseUpdateResponse.message
                    });
                    setTimeout(() => {
                        setMessageState({
                            ...messageState,
                            updateLicenseMessageType: 'success',
                            updateLicenseMessage: ''
                        });
                    }, 3000);
                    if(licenseUpdateResponse.data.license === 'valid'){
                        setContentState({
                            ...contentState,
                            options: {
                                ...contentState.options,
                                helpgent_license_activated: 1,
                            },
                        });
                    }else{
                        setContentState({
                            ...contentState,
                            options: {
                                ...contentState.options,
                                helpgent_license_activated: 0,
                            },
                        });
                    }
                    
                }else{
                    setState({
                        ...state,
                        modalStatus: 'close',
                        updateLicense: false,
                        
                    });
                    setMessageState({
                        ...messageState,
                        updateLicenseMessageType: 'danger',
                        updateLicenseMessage: licenseUpdateResponse.message
                    });
                    setTimeout(() => {
                        setMessageState({
                            ...messageState,
                            updateLicenseMessageType: 'danger',
                            updateLicenseMessage: ''
                        });
                    }, 2000);
                }
            })
    }

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
                            name='helpgent_license'
                            placeholder='Ex: helpgent'
                            value={contentState.options.helpgent_license}
                            onChange={handleInputChange}
                        />
                        <button className={contentState.options.helpgent_license_activated === 1 ? 'wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-danger wpwax-vm-btn-activation' : 'wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-success wpwax-vm-btn-activation'} onClick={handleLicense}>
                            {contentState.options.helpgent_license_activated === 1 ? 
                            state.updateLicense ? <span> <span className="wpwax-vm-btn-text">Deactivating</span> <span className="wpwax-vm-dots"></span></span> : <span> <span className="wpwax-vm-btn-text">Deactivate</span> </span> 
                            : state.updateLicense ? <span className="wpwax-vm-btn-text">Activating <span className="wpwax-vm-dots"></span></span> : <span> <span className="wpwax-vm-btn-text">Activate</span> </span>}
                        </button>
                    </div>
                    {
                        messageState.updateLicenseMessageType === 'success' ? <span className="wpwax-alert-success">{messageState.updateLicenseMessage}</span> : null
                    }
                    {
                        messageState.updateLicenseMessageType === 'danger' ? <span className="wpwax-alert-danger">{messageState.updateLicenseMessage}</span> : null
                    }
                </div>
            </div>
            <Modal
                title='License Deactivation Alert'
                handleOk={(e) => handleOk(e)}
                handleCancel={(e) => handleCancel(e)}
                status={state.modalStatus}
                footer={true}
            >
                <p>Are Your Sure ?</p>
            </Modal>
        </div>
    );
};

export default License;
