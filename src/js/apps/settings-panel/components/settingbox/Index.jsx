import React, { useState, useEffect } from 'react';
import ReactSVG from 'react-inlinesvg';
import apiService from 'apiService/Service.js';
import useSettingsAPI from 'API/useSettingsAPI.js';
import Sidebar from './components/Sidebar.jsx';
import SettingContent from './components/SettingContent.jsx';
import File from 'Assets/svg/icons/file.svg';
import QuestonCircle from 'Assets/svg/icons/question-circle.svg';
import globe from 'Assets/svg/icons/globe.svg';
import envelope from 'Assets/svg/icons/envelope.svg';
import slider from 'Assets/svg/icons/slider.svg';
import handShake from 'Assets/svg/icons/handshake.svg';
import link from 'Assets/svg/icons/link.svg';
import LoadingSpinDot from 'Components/LoadingSpinDot.jsx';
import { SetingBoxWrap } from './Style';

const SettingBox = () => {
    const { getItems: getSettingOptions, updateItem: updateSettings } =
        useSettingsAPI();
    const settingsNav = [
        {
            label: 'General',
            path: 'general',
            navId: 'wpwax-vm-general-settings',
            icon: <ReactSVG src={slider} />,
        },
        {
            label: 'Email',
            path: 'email_general',
            navId: 'wpwax-vm-email-settings',
            icon: <ReactSVG src={envelope} />,
            iconClosed: (
                <span className='dashicons dashicons-arrow-down'></span>
            ),
            iconOpened: <span className='dashicons dashicons-arrow-up'></span>,

            subNav: [
                {
                    label: 'Email General',
                    path: 'email_general',
                },
                {
                    label: 'Email Template',
                    path: 'email_template',
                },
            ],
        },
    ];

    const totalNav = settingsNav.length;

    const [settingContentState, setSettingContentState] = useState({
        contentKey: 'general',
        navParent: 'general',
        options: {
            guestSubmission: true,
            chatHeadPosition: 'bottom-right',
            userDashboardPage: '',
            maxVideoLength: '2',
            maxVoiceLength: '2',
            videoResolution: '720',
            attatchmentDeletionAfter: '20',
            maxUploadSize: '300',
            enableEmailNotification: true,
            adminEmailNotificationType: 'single',
            userEmailNotificationType: 'single',
            enableEmailHeader: true,
            emailHeaderColor: '#000000',
            emailTemplateFromName: '',
            emailTemplateFromEmail: '',
            emailTemplateGreetingSubject: '',
            emailTemplateGreetingBody: '',
            emailTemplateMessageSubject: '',
            emailTemplateMessageBody: '',
            enableEmailFooter: true,
            helpgent_license: "",
        },
        message: '',
        loading: true,
    });

    const getPath = () => {
        if (settingContentState.contentKey === 'email_general') {
            return 'Email General';
        } else if (settingContentState.contentKey === 'email_template') {
            return 'Email Template';
        }
    };

    useEffect(() => {
        setSettingContentState({
            ...settingContentState,
            loading: true,
        });

        const fetchSettings = async () => {
            const fetchSettingsResponse = await getSettingOptions();
            return fetchSettingsResponse;
        };

        fetchSettings()
            .then((fetchSettingsResponse) => {
                setSettingContentState({
                    ...settingContentState,
                    options: {
                        ...settingContentState.options,
                        ...fetchSettingsResponse.data,
                    },
                    loading: false,
                });
            })
            .catch((error) => {
                setSettingContentState({
                    ...settingContentState,
                    loading: false,
                });
            });
    }, []);

    const handleSaveSetting = (event) => {
        event.preventDefault();
        setSettingContentState({
            ...settingContentState,
            loading: true,
        });
        const saveSettings = async () => {
            const saveSettingsResponse = await updateSettings(
                settingContentState.options
            );
            return saveSettingsResponse;
        };
        saveSettings()
            .then((saveSettingsResponse) => {
                setSettingContentState({
                    ...settingContentState,
                    options: saveSettingsResponse.data,
                    message: 'Setting changes saved',
                    loading: false,
                });
                setTimeout(() => {
                    setSettingContentState({
                        ...settingContentState,
                        message: '',
                    });
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                setSettingContentState({
                    ...settingContentState,
                    loading: false,
                });
            });
    };

    const breadcrumbNav = settingsNav.filter(
        (item) => item.path === settingContentState.navParent
    );
    let breadcrumbSubnav;
    if (breadcrumbNav[0].subNav) {
        breadcrumbSubnav = breadcrumbNav[0].subNav.filter(
            (item) => item.path === settingContentState.contentKey
        );
    }

    return (
        <SetingBoxWrap>
            <div className='wpwax-vm-settings-top'>
                <h2 className='wpwax-vm-settings-top__title'>Settings</h2>

                <div className='wpwax-vm-settings-top__links'>
                    <a href='#'>
                        <span className='wpwax-vm-settings-top__link-icon'>
                            <ReactSVG src={File} />
                        </span>
                        <span className='wpwax-vm-settings-top__link-text'>
                            Documentation
                        </span>
                    </a>
                    <a href='#'>
                        <span className='wpwax-vm-settings-top__link-icon'>
                            <ReactSVG src={QuestonCircle} />
                        </span>
                        <span className='wpwax-vm-settings-top__link-text'>
                            Support
                        </span>
                    </a>
                    <a target='_blank' href='https://wpwax.com/helpgent/'>
                        <span className='wpwax-vm-settings-top__link-icon'>
                            <ReactSVG src={link} />
                        </span>
                        <span className='wpwax-vm-settings-top__link-text'>
                            Go Pro
                        </span>
                    </a>
                </div>
            </div>
            <div className='wpwax-vm-seetings-box'>
                <div className='wpwax-vm-seetings-box__header'>
                    <div className='wpwax-vm-seetings-box__breadcrumb'>
                        <ul>
                            {breadcrumbNav.map((item, i) => {
                                return (
                                    <li key='i'>
                                        <a href='#'>{item.label} </a>
                                    </li>
                                );
                            })}
                            {breadcrumbSubnav
                                ? breadcrumbSubnav.map((item, i) => {
                                      return (
                                          <li key={i}>
                                              <span className='dashicons dashicons-arrow-right-alt2'></span>
                                              <a
                                                  href='#'
                                                  className={
                                                      item.path ===
                                                      settingContentState.contentKey
                                                          ? 'wpwax-vm-active'
                                                          : nyll
                                                  }
                                              >
                                                  {' '}
                                                  {item.label}{' '}
                                              </a>
                                          </li>
                                      );
                                  })
                                : null}
                        </ul>
                    </div>
                    <div className='wpwax-vm-seetings-box__actions'>
                        <p>{settingContentState.message}</p>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary'
                            onClick={handleSaveSetting}
                        >
                            Save Changes
                        </a>
                    </div>
                </div>
                <div className='wpwax-vm-seetings-box__body'>
                    <Sidebar
                        contentState={settingContentState}
                        setContentState={setSettingContentState}
                        nav={settingsNav}
                    />

                    <div className='wpwax-settings-content-box'>
                        <SettingContent
                            contentState={settingContentState}
                            setContentState={setSettingContentState}
                        />
                    </div>
                </div>
                <div className='wpwax-vm-seetings-box__footer'>
                    <a
                        href='#'
                        className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary'
                        onClick={handleSaveSetting}
                    >
                        Save Changes
                    </a>
                </div>
            </div>
        </SetingBoxWrap>
    );
};

export default SettingBox;
