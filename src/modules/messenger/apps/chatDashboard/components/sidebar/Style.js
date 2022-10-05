import Styled from 'styled-components';

const SidebarWrap = Styled.div`
    min-height: 600px;
    &.wpwax-vm-loder-active{
        &:after{
            background-color: #ffffff;
            border-radius: 10px;
        }
    }
    .wpwax-vm-loading-spin{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 100;
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
    .wpwax-vm-notice{
        margin-bottom: 15px;
    }
    .wpwax-vm-sidebar-filter{
        margin-bottom: 20px;
        .wpwax-vm-dropdown{
            .wpwax-vm-dropdown__toggle--text{
                margin-right: 15px;
            }
            .wpwax-vm-dropdown__content{
                top: 30px;
                li{
                    margin-bottom: 0;
                }
            }
        }
    }
    .wpwax-vm-sidebar-filter__quick-actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .wpwax-vm-btn-all-tags{
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            white-space: nowrap;
            color: #4D4D4D;
            >div{
                line-height: .75;
                margin-right: 10px;
            }
        }
    }
    .wpwax-vm-sidebar-search{
        position: relative;
        .wpwax-vm-form__element{
            border-radius: 10px;
            background-color: #DDDDDD;
            margin: 0;
            /* &:focus{
                background-color: var(--color-bg-white);
            } */
        }
        .wpwax-vm-search-toggle{
            position: absolute;
            right: 20px;
            top: 12px;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
            svg{
                path{
                    fill: var(--font-color);
                }
            }
        }
    }
    .wpwax-vm-sidebar-userlist{
        margin-top: 6px;
        .infinite-scroll-component {
            min-height: 340px;
            padding-bottom: 40px;
        }
        >ul {
            height: 470px;
            overflow-x: hidden;
            overflow-y: auto;
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
                margin-left: 0;
                &.wpwax-vm-active,
                &:hover{
                    background: var(--color-white);
                }
                &:nth-last-child(-n+2){
                    .wpwax-vm-dropdown{
                        .wpwax-vm-dropdown__content{
                            top: -180px;
                        }
                    }
                }
                &:nth-child(1),
                &:nth-child(2){
                    .wpwax-vm-dropdown{
                        .wpwax-vm-dropdown__content{
                            top: 40px !important;
                        }
                    }
                }
                .wpwax-vm-dropdown{
                    .wpwax-vm-dropdown__content{
                        top: 40px;
                    }
                }
                .wpwax-vm-media__body{
                    top: -3px;
                }
                .wpwax-vm-media__title{
                    line-height: 1.5;
                }
                .wpax-vm-imglist{
                    display: flex;
                    align-items: center;
                    img{
                        max-width: 35px;
                        border-radius: 50%;
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
                    .wpwax-vm-img-include-replyer{
                        position: relative;
                        .wpwax-vm-replyer{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 15px;
                            width: 15px;
                            padding: 2px;
                            line-height: 1;
                            border-radius: 50%;
                            position: absolute;
                            top: 20px;
                            right: -2px;
                            background-color: var(--color-white);
                            img{
                                max-width: 15px;
                            }
                            >div{
                                width: 12px;
                                height: 12px;
                            }
                            svg{
                                width: 12px;
                                height: 12px;
                                color: #0F5197;
                                fill: #0F5197;
                            }
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
                            background-color: #f0f0f1;
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

    .wpwax-vm-taglist-author{
        display: flex;
        align-items: center;
        .wpwax-vm-taglist-author__img{
            display: flex;
            align-items: center;
            margin-right: 12px;
            line-height: 1;
            img{
                max-width: 40px;
                border-radius: 50%;
            }
            .wpwax-vm-more-img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: -20px;
                background-color: var(--color-bg-general);
                svg{
                    width: 20px;
                    fill: var(--color-primary);
                }
            }
        }
        .wpwax-vm-taglist-author__name{
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            line-height: 1.5;
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--color-dark);
        }
    }
`;

const SessionFilterWrap = Styled.div`
    position: relative;
    &.wpwax-vm-search-dropdown-show{
        .wpwax-vm-search-dropdown{
            display: block;
        }
        .wpwax-vm-sidebar-search {
            .wpwax-vm-form__element{
                margin: 0;
                border-radius: 10px 10px 0 0;
                background-color: var(--color-white);
            }
        }
        .wpwax-vm-search-toggle{
            svg {
                path{
                    fill: var(--color-primary);
                }
            }
        }
    }
    .wpwax-vm-search-dropdown{
        position: absolute;
        left: 0;
        top: 40px;
        width: 100%;
        margin: 0;
        border-radius: 0 0 10px 10px;
        z-index: 10;
        padding: 12px 0px;
        display: none;
        border-top: 1px solid var(--color-border-light);
        box-shadow: 0 20px 40px rgba(144,144,144,.25);
        background-color: var(--color-white);
        li{
            position: relative;
            margin: 0;
            list-style: none;
            cursor: pointer;
            .dashicons{
                width: 14px;
                height: 14px;
                font-size: 14px;
            }
            >a{
                display: flex;
                justify-content: space-between;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                padding: 12px 20px;
                color: var(--color-dark);
                &:focus{
                    outline: none;
                    box-shadow: 0 0;
                }
            }
        }
    }
`;

export {SidebarWrap, SessionFilterWrap};