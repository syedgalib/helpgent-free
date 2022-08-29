import Styled from 'styled-components';

const SidebarWrap = Styled.div`
    .wpwax-vm-loading-spin{
        position: absolute;
        left: 50%;
        top: 50%;
    }
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
        >ul {
            height: 800px;
            overflow-x: hidden;
            overflow-y: scroll;
            scrollbar-width: thin;
            margin: 0 -12px;
            scrollbar-color: var(--color-light);
            &::-webkit-scrollbar {
                width: 11px;
            }

            &::-webkit-scrollbar-track {
                background: var(--color-light);
            }

            &::-webkit-scrollbar-thumb {
                background-color: var(--color-bg-gray);
                border-radius: 6px;
                border: 3px solid var(--color-light);
            }
            .wpwax-vm-usermedia{
                padding: 12px;
                border-radius: 10px;
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
                .wpax-vm-imglist{
                    display: flex;
                    align-items: center;
                    img{
                        max-width: 35px;
                    }
                    .wpwax-vm-more-img{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        margin-left: -16px;
                        background-color: var(--color-bg-gray);
                        box-shadow: 0 6px 40px rgba(144,144,144,.25);
                        >div{
                            line-height: 1;
                        }
                        svg{
                            width: 18px;
                            height: 18px;
                            fill: var(--color-primary);
                        }
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
                left: auto;
                right: 0;
                min-width: 220px;
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