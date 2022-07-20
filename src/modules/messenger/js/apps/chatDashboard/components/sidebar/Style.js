import Styled from 'styled-components';

const SidebarWrap = Styled.div`
    .wpwax-vm-sidebar-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        .wpwax-vm-sidebar-title{
            margin: 0;
        }
        .wpwax-vm-sidebar-refresher{
            line-height: 1;
        }
    }
    .wpwax-vm-sidebar-filter{
        .wpwax-vm-dropdown{
            .wpwax-vm-dropdown__content{
                top: 30px;
                li{
                    margin-bottom: 0;
                }
            }
        }
    }
    .wpwax-vm-sidebar-search{
        .wpwax-vm-form__element{
            border-radius: 10px;
            background-color: #DDDDDD;
        }
    }
    .wpwax-vm-sidebar-userlist{
        margin-top: 6px;
        ul {
            .wpwax-vm-usermedia{
                padding: 12px;
                border-radius: 10px;
                margin: 0 -12px;
                background-color: transparent;
                transition: background .3s ease-in;
                &.wpwax-vm-active,
                &:hover{
                    background: var(--color-white);
                }
                .wpwax-vm-dropdown{
                    .wpwax-vm-dropdown__content{
                        top: 40px;
                    }
                }
            }
        }
    }
    .wpwax-vm-usermedia{
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .wpwax-vm-dropdown{
            &.wpwax-vm-dropdown-open{
                .wpwax-vm-dropdown__toggle{
                    background-color: var(--color-bg-gray);
                }
            }
            .wpwax-vm-dropdown__toggle{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 34px;
                height: 34px;
                line-height: 1;
                border-radius: 50%;
                &:hover{
                    background-color: var(--color-bg-gray);
                }
                svg{
                    width: 3px;
                }
            }
            
            .wpwax-vm-dropdown__content{
                li{
                    padding: 0 16px;
                    margin-bottom: 0;
                    &:last-child{
                        a{
                            padding-top: 10px;
                            transition: color .25s ease-in;
                            border-radius: 0px;
                            border-top: 1px solid var(--color-bg-general);
                            svg path{
                                transition: fill .25s ease-in; 
                            }
                            &:hover{
                                color: var(--color-danger);
                                svg path{
                                    fill: var(--color-danger);
                                }
                                &:after{
                                    display: none;
                                }
                            }
                        }
                    }
                    a{
                        padding: 0;
                        margin-top: 10px;
                        position: relative;
                        z-index: 10;
                        &:after{
                            position: absolute;
                            left: -15px;
                            top: 50%;
                            width: calc(100% + 30px);
                            height: 100%;
                            transform: translateY(-50%);
                            border-radius: 8px;
                            content: '';
                            z-index: -1;
                            opacity: 0;
                            visibility: hidden;
                            transition: .25s ease-in;
                            background-color: var(--color-bg-general);
                        }
                        &:hover{
                            background-color: transparent;
                            &:after{
                                opacity: 1;
                                visibility: visible;
                            }
                        }
                    }
                }
            }
        }
        .wpwax-vm-usermedia__right{
            position: relative;
            display: flex;
            align-items: center;
            .wpwax-vm-usermedia-status{
                margin-right: 5px;

            }
        }
    }
`;

export default SidebarWrap;