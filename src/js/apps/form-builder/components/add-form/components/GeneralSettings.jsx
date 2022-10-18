import Checkbox from 'Components/form-fields/Checkbox.jsx';
import Radio from 'Components/form-fields/Radio.jsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { components, default as Select } from 'react-select';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import Switch from 'react-switch';
import formUpdater from 'Helper/FormUpdater';
import { handleDynamicEdit } from '../../../redux/form/actionCreator';
import { GeneralSettingWrap } from './Style';

import questionIcon from 'Assets/svg/icons/question-circle.svg';

export const fontOptions = [
    { value: 'roboto', label: 'Roboto' },
    { value: 'inter', label: 'Inter' },
    { value: 'legend', label: 'Legend' },
];

export const fontSizeOptions = [
    { value: "1.3", label: "large" },
    { value: "1.5", label: "x-large" },
    { value: "2", label: "xx-large" },
    { value: "1.2", label: "medium" },
    { value: "1", label: "small" },
    { value: ".85", label: "smaller" },
    { value: ".80", label: "x-small" },
]

const GeneralSettings = () => {
    /* initialize Form Data */
    const {
        formData,
        primaryColor,
        displayDefault,
        templateName,
        templateTheme,
        displayedCustomPages,
        chatVisibilityType,
        sendMail,
    } = useSelector((state) => {
        return {
            formData: state.form.data,
            pageBackground: state.form.data[0].options.page_background_color,
            fontColor: state.form.data[0].options.font_family,
            primaryColor: state.form.data[0].options.primary_color,
            fontFamily: state.form.data[0].options.font_color,
            fontSize: state.form.data[0].options.font_size,
            displayDefault: state.form.data[0].is_default,
            templateName: state.form.data[0].name,
            templateTheme: state.form.data[0].options.theme,
            displayedCustomPages: state.form.data[0].pages
                ? state.form.data[0].pages.split(',')
                : [],
            chatVisibilityType: state.form.data[0].options.chat_visibility_type,
            sendMail:
                state.form.data[0].options.send_mail_upon_message_submission,
        };
    });

    const [state, setState] = useState({
        openCollapse: true,
    });

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <Checkbox
                        id={`wpwax-vm${props.value}`}
                        label={props.label}
                        onChange={handleCustomPageCheckbox}
                        value={props.isSelected}
                    />
                </components.Option>
            </div>
        );
    };

    const customPages = [];
    wpWaxCustomerSupportApp_CoreScriptData.wp_pages.map((item, index) => {
        customPages.push({ value: `${item.id}`, label: `${item.title}` });
    });

    const handleCustomPageCheckbox = ()=>{}

    /* To Handle Template Change */
    const handleChatVisibility = (e) => {
        let visiblityType = e.target.value;
        const updatedData = formUpdater(
            'chat-visibility',
            visiblityType,
            formData
        );
        dispatch(handleDynamicEdit(updatedData));
    };

    const handleChangeInputValue = (e) => {
        const updatedData = formUpdater(e.target.id, e.target.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    };

    const handleChangeSwitchValue = (value, event, id) => {
        if(id === 'wpwax-vm-display-default'){
            value = !value;
        }
        const updatedData = formUpdater(id, value, formData);
        dispatch(handleDynamicEdit(updatedData));
    };

    const handleChangeSelectValue = (selectEvent, e) => {
        let customPageIds = '';
        let updatedData = '';
        if (e.name === 'wpwax-vm-display-custom-pages') {
            let newPageIdsArray = [];
            selectEvent.map((item) => {
                newPageIdsArray.push(item.value);
            });
            customPageIds = newPageIdsArray.join(',');
            updatedData = formUpdater(e.name, customPageIds, formData);
        } else {
            updatedData = formUpdater(e.name, selectEvent.value, formData);
        }
        dispatch(handleDynamicEdit(updatedData));
    };

    function getSelectedPageDefault() {
        let newArray = [];
        if (displayedCustomPages.length !== 0) {
            displayedCustomPages.map((previousSelected) => {
                const filteredPage = customPages.filter(
                    (item) => item.value === previousSelected
                );
                newArray.push(filteredPage[0]);
            });
        }
        return newArray;
    }

    return (
        <GeneralSettingWrap>
            <div className='wpwax-vm-form-group'>
                <div className='wpwax-vm-form-group__label'>
                    <label htmlFor='wpwax-vm-form-name'>
                        Form Name
                        <span className='wpwax-vm-require-sign'>*</span>
                    </label>
                </div>
                <input
                    type='text'
                    className='wpwax-vm-form__element'
                    id='wpwax-vm-form-name'
                    value={templateName}
                    placeholder='Enter form name (eg. Support Form)'
                    onChange={(e) => handleChangeInputValue(e)}
                />
            </div>


            <div className='wpwax-vm-form-group'>
                <div className='wpwax-vm-form-group__label'>
                    <span className='wpwax-vm-tooltip-wrap'>
                        <span>Display on custom pages</span>
                        <span className='wpwax-vm-tooltip'>
                            <span className='wpwax-vm-tooltip-icon'>
                                <ReactSVG src={questionIcon} />
                            </span>
                            <span className='wpwax-vm-tooltip-text'>
                                Tooltip Text will be here
                            </span>
                        </span>
                    </span>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor='#6551f2'
                            offColor='#E2E2E2'
                            onHandleColor='#FFFFFF'
                            className='wpwax-vm-switch'
                            id='wpwax-vm-display-default'
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={!displayDefault}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
                {
                    displayDefault ? null :
                    <Select
                        classNamePrefix='wpwax-vm-select'
                        options={customPages}
                        isMulti
                        searchable={false}
                        hideSelectedOptions={false}
                        components={{
                            Option,
                        }}
                        defaultValue={getSelectedPageDefault()}
                        name='wpwax-vm-display-custom-pages'
                        onChange={handleChangeSelectValue}
                        allowSelectAll={true}
                    />
                }
            </div>

            <div className='wpwax-vm-form-group'>
                <div className='wpwax-vm-form-group__label'>
                    <span>Close chat option</span>
                </div>
                <div className='wpwax-vm-radio-list'>
                    <div className='wpwax-vm-radio-single'>
                        <span>If closed never show again</span>
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
                        <span>Show on reload</span>
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
            <div className='wpwax-vm-form-group'>
                <div className='wpwax-vm-form-group__label wpwax-vm-mb-0'>
                    <span>Receive email upon message submission</span>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor='#6551f2'
                            offColor='#E2E2E2'
                            onHandleColor='#FFFFFF'
                            className='wpwax-vm-switch'
                            id='wpwax-vm-send-mail'
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={sendMail}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
            </div>
        </GeneralSettingWrap>
    );
};

export default GeneralSettings;
