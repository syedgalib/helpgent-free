import Styled from 'styled-components';

const ChatboxForm = Styled.div`
    font-family: var(--font-family);
    height: 100%;
    box-sizing: border-box;
    .wpwax-vm-chatbox-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        overflow: hidden;
        z-index: -1;
        img{
            height: 100%;
            object-fit: cover;
        }
    }
    .wpwax-vm-chatbox-header{
        padding: 25px;
        .wpwax-vm-chatbox-header__top{
            display: flex;
            justify-content: flex-end;
            span{
                font-size: 14px;
                font-weight: 600;
                color: var(--color-white);
                &.wpwax-vm-timer{
                    margin-right: 20px;
                }
            }
        }
        .wpwax-vm-chatbox-title{
            font-size: var(--font-size-greet);
            font-weight: 600;
            line-height: 1.33;
            color: var(--color-text-greet);
            margin: 15px 0 15px;
        }
        .wpwax-vm-chatbox-description{
            font-size: 15px;
            font-weight: 500;
            color: var(--color-description)
        }
    }
    .wpwax-vm-chatbox-inner{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wpwax-vm-btn-play{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
        text-decoration: none;
        background-color: var(--color-white);
        i{
            width: 30px;
            height: 30px;
            color: var(--color-primary);
            &:before{
                font-size: 30px;
            }
        }
    }
    .wpwax-vm-chatbox-footer{
        .wpwax-vm-chatbox-footer__title{
            font-size: var(--font-size-chat);
            font-weight: 600;
            text-align: center;
            margin-bottom: 15px;
            text-transform: capitalize;
            color: var(--color-text-chat);
        }
        .wpwax-vm-chatbox-footer__actions{
            display: flex;
            flex-wrap: wrap;
            padding: 0 25px;
            margin: -10px;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                box-sizing: border-box;
                min-height: 100px;
                height: auto;
                flex: 0 0 30.3333%;
                margin: 1.5%;
                &:hover{
                    fill: var(--color-primary);
                    path{
                        fill: var(--color-primary);
                    }
                }
                svg{
                    width: 18px;
                    height: 18px;
                    margin: 0 0 4px;
                    fill: var(--color-white);
                    path{
                        fill: var(--color-white);
                    }
                }
            }
        }
        .wpwax-vm-chatbox-footer__text{
            font-size: var(--footer-text-font-size);
            font-weight: 500;
            opacity: .8;
            margin: 12px 0 8px;
            text-align: center;
            min-height: 20px;
            color: var(--color-footer-text);
        }
        .wpwax-vm-chatbox-footer__bottom{
            margin: 0;
            font-size: 12px;
            font-weight: 500;
            padding: 8px;
            text-align: center;
            border-radius: 0 0 25px 25px;
            background-color: #4537A5;
            color: rgba(255,255,255,.80);
            a{
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                color: var(--color-white);
            }
        }
    }
    .wpwax-vm-chatbox-wrap{
        &.wpwax-vm-chatbox-theme-2{
            height: auto;
            box-shadow: 0 3px 30px rgba(0,0,0,.10);
            border-radius: 25px;
            &:before,
            &:after{
                display: none;
            }
            .wpwax-vm-chatbox-header{
                padding: 20px;
                border-radius: 25px 25px 0 0;
                background-color: var(--color-primary);
                .wpwax-vm-chatbox-title{
                    font-size: var(--font-size-greet);
                    font-weight: 600;
                    margin: 0;
                }
            }
            .wpwax-vm-chatbox-inner{
                position: relative;
                padding: 0;
                overflow: hidden;
                &:after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 280px;
                    opacity: .9;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
                    content: '';
                    z-index: 10;
                }
                &:before{
                    position: absolute;
                    left: 0;
                    bottom: -210px;
                    width: 100%;
                    height: 320px;
                    opacity: .9;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
                    content: '';
                    z-index: 101;
                }
                .wpwax-vm-chatbox-inner-action{
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                    z-index: 101;
                    span{
                        font-size: 13px;
                        font-weight: 600;
                        &.wpwax-vm-timer{
                            display: block;
                            margin-right: 20px;
                            color: var(--color-white);
                        }
                    }
                    .wpwax-vm-fulscreen-trigger{
                        line-height: 1;
                    }
                }
                video{
                    object-fit: cover;
                }
                .wpwax-vm-chatbox-img{
                    position: relative;
                    height: 330px;
                    width: 100%;
                    z-index: 10;
                }
                .wpwax-vm-btn-play{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    z-index: 100;
                }
                .wpwax-vm-chatbox-img{
                    img{
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .wpwax-vm-chatbox-footer{
                position: relative;
                z-index: 101;
                border-radius: 0 0 25px 25px;
                padding: 0;
                background-color: var(--color-white);
                .wpwax-vm-chatbox-footer__title{
                    font-size: var(--font-size-chat);
                    font-weight: 600;
                    margin: 0 0 20px;
                    padding-top: 12px;
                    color: var(--color-text-chat);
                }
                .wpwax-vm-chatbox-footer__text{
                    font-size: var(--footer-text-font-size);
                    font-weight: 500;
                    margin: 12px 0 8px;
                    color: var(--color-footer-text);
                }
            }
        }
    }  
`;

const ContactFormWrap = Styled.div`
    .wpwax-vm-contact-form{
        padding: 60px 25px 25px;
        position: relative;
        min-height: 595px;
        .wpwax-vm-contact-form__title{
            font-size: 18px;
            font-weight: 500;
            line-height: 1.333;
            margin: 0 0 30px;
            color: var(--color-dark);
        }
        .wpwax-vm-form-group{
            margin-bottom: 0;
            .wpwax-vm-form__element{
                min-height: 46px;
                border-radius: 8px;
            }
        }
        .wpwax-vm-form__bottom{
            position: absolute;
            width: calc( 100% - 50px );
            bottom: 25px;
            left: 25px;
            .wpwax-vm-btn{
                border-radius: 10px;
                svg{
                    width: 16px;
                    height: 16px;
                    margin-left: 10px;
                }
            }
        }
    }
`;

export { ChatboxForm, ContactFormWrap };