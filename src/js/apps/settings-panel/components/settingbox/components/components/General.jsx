import React from 'react';
import { default as Select } from 'react-select';
import Switch from 'react-switch';
import Radio from 'Components/form-fields/Radio.jsx';

const qualityOptions = [
    { value: '720', label: '720p' },
    { value: '500', label: '500p' },
    { value: '300', label: '300p' },
];

const chatHeadPositions = [
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'bottom-middle', label: 'Bottom Middle' },
    { value: 'bottom-left', label: 'Bottom Left' },
];

const General = (props) => {
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

    const dashboardPages = [];
    SettingsScriptData.pages.map((item, index) => {
        dashboardPages.push({ value: `${item.id}`, label: `${item.title}` });
    });

    return (
        <div className='wpwax-vm-settings'>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='chat-head-position'
                >
                    Chat Head Position
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <Select
                        inputId='chat-head-position'
                        classNamePrefix='wpwax-vm-select'
                        options={chatHeadPositions}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        searchable={false}
                        name='chatHeadPosition'
                        onChange={handleChangeSelectValue}
                        placeholder='Select a position...'
                        defaultValue={
                            chatHeadPositions.filter(function (option) {
                                return (
                                    option.value ===
                                    contentState.options.chatHeadPosition
                                );
                            })[0]
                        }
                    />
                </div>
            </div>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='user-messages-page'
                >
                    User Messages Page
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <Select
                        inputId='user-messages-page'
                        classNamePrefix='wpwax-vm-select'
                        options={dashboardPages}
                        searchable={false}
                        hideSelectedOptions={false}
                        placeholder='Select a page...'
                        defaultValue={
                            dashboardPages.filter(function (option) {
                                return (
                                    option.value ===
                                    contentState.options.userDashboardPage
                                );
                            })[0]
                        }
                        name='userDashboardPage'
                        onChange={handleChangeSelectValue}
                        allowSelectAll={true}
                    />
                </div>
            </div>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='wpwax-vm-max-video-length'
                >
                    Maximum Video Length
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <div className='wpwax-vm-form-group'>
                        <input
                            type='number'
                            className='wpwax-vm-form__element'
                            id='wpwax-vm-max-video-length'
                            name='maxVideoLength'
                            placeholder='Ex: 10'
                            value={contentState.options.maxVideoLength}
                            onChange={handleChange}
                            min='0'
                        />
                        <div className='wpwax-vm-input-addon'>
                            <span className='wpwax-vm-input-addon__text'>
                                Mins
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='video-quality'
                >
                    Video Quality
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <Select
                        inputId='video-quality'
                        classNamePrefix='wpwax-vm-select'
                        options={qualityOptions}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        searchable={false}
                        name='videoQuality'
                        onChange={handleChangeSelectValue}
                        placeholder='Select video quality...'
                        defaultValue={
                            qualityOptions.filter(function (option) {
                                return (
                                    option.value ===
                                    contentState.options.videoQuality
                                );
                            })[0]
                        }
                    />
                </div>
            </div>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='wpwax-vm-max-upload-size'
                >
                    Maximum Upload Size
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <div className='wpwax-vm-form-group'>
                        <input
                            type='number'
                            className='wpwax-vm-form__element'
                            id='wpwax-vm-max-upload-size'
                            name='maxUploadSize'
                            placeholder='Ex: 10'
                            value={contentState.options.maxUploadSize}
                            onChange={handleChange}
                            min='0'
                        />
                        <div className='wpwax-vm-input-addon'>
                            <span className='wpwax-vm-input-addon__text'>
                                MB
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wpwax-vm-settings__single'>
                <label
                    className='wpwax-vm-settings__single--label'
                    htmlFor='wpwax-vm-delete-attatchment'
                >
                    Store Attachments For
                </label>
                <div className='wpwax-vm-settings__single--element'>
                    <div className='wpwax-vm-form-group'>
                        <input
                            type='number'
                            className='wpwax-vm-form__element'
                            id='wpwax-vm-delete-attatchment'
                            name='attatchmentDeletionAfter'
                            placeholder='Ex: 45'
                            value={
                                contentState.options.attatchmentDeletionAfter
                            }
                            onChange={handleChange}
                            min='0'
                        />
                        <div className='wpwax-vm-input-addon'>
                            <span className='wpwax-vm-input-addon__text'>
                                Days
                            </span>
                        </div>
                    </div>
                    <p className='wpwax-vm-input-desc'>
                        Then delete automatically. Or leave empty to store as
                        many days as you want.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default General;
