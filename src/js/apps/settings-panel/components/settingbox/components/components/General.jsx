import React from 'react';
import { default as Select } from 'react-select';
import Switch from "react-switch";
import Radio from 'Components/form-fields/Radio.jsx';

const General = props =>{
    const qualityOptions = [
        { value: '720', label: '720p' },
        { value: '500', label: '500p' },
        { value: '300', label: '300p' },
    ];

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

    const handleChangeSelectValue = (selectEvent, e) => {
        // let updatedData = '';
        setContentState({
            ...contentState,
            options: {
                ...contentState.options,
                [e.name]: selectEvent.value
            }
        });
    };


    const dashboardPages = [];
    SettingsScriptData.pages.map((item, index) => {
        dashboardPages.push({ value: `${item.id}`, label: `${item.title}` });
    });

    return(
        <div className="wpwax-vm-settings">
            <div className="wpwax-vm-settings__single">
                <h4 className="wpwax-vm-settings__single--label">Enable Email Notification</h4>
                <div className="wpwax-vm-settings__single--element">
                    <Select
                        classNamePrefix='wpwax-vm-select'
                        options={dashboardPages}
                        searchable={false}
                        hideSelectedOptions={false}
                        defaultValue={dashboardPages.filter(function (option) {
                            return option.value === contentState.options.userDashboardPage;
                        })[0]}
                        name='userDashboardPage'
                        onChange={handleChangeSelectValue}
                        allowSelectAll={true}
                    />
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-max-video-length">Maximum Video Lenngth</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="number" className="wpwax-vm-form__element" id="wpwax-vm-max-video-length" name="maxVideoLength" placeholder="ex in Minx: 10" value={contentState.options.maxVideoLength} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-max-video-length">VIdeo Quelity (select)</label>
                <div className="wpwax-vm-settings__single--element">
                    <Select
                        classNamePrefix="wpwax-vm-select"
                        options={qualityOptions}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        searchable={false}
                        name="videoQuality"
                        onChange={handleChangeSelectValue}
                        defaultValue={qualityOptions.filter(function (option) {
                            return option.value === contentState.options.videoQuality;
                        })[0]}
                    />
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-max-video-length">Maximum Upload Size</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="number" className="wpwax-vm-form__element" id="wpwax-vm-max-video-length" name="maxUploadSize" placeholder="ex in MB: 10" value={contentState.options.maxUploadSize} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-settings__single">
                <label className="wpwax-vm-settings__single--label" htmlFor="wpwax-vm-max-video-length">Attachment deletion After</label>
                <div className="wpwax-vm-settings__single--element">
                    <div className="wpwax-vm-form-group">
                        <input type="number" className="wpwax-vm-form__element" id="wpwax-vm-max-video-length" name="attatchmentDeletionAfter" placeholder="ex in days: 16" value={contentState.options.attatchmentDeletionAfter} onChange={handleChange}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default General;