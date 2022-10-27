import Styled from 'styled-components';

const ChatboxForm = Styled.div`
    font-family: var(--font-family);
    font-size: 18px;
    height: 100%;
    box-sizing: border-box;
    &:hover{
        .wpwax-vm-btn-play{
            opacity: 1;
            visibility: visible;
            z-index: 10;
        }
    }
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
        @media only screen and (max-width: 767px){
            padding: 15px;
        }
        .wpwax-vm-chatbox-header__top{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span{
                font-size: 14px;
                font-weight: 600;
                color: var(--color-white);
                &.wpwax-vm-timer{
                    margin-right: 20px;
                }
            }
            .wpwax-vm-fulscreen-trigger{
                line-height: 1;
            }
        }
        .wpwax-vm-chatbox-title{
            font-family: var(--font-family);
            font-size: var(--font-size-greet);
            font-weight: 600;
            line-height: 1.2;
            color: var(--color-text-greet);
            margin: 15px 0 5px;
        }
        .wpwax-vm-chatbox-description{
            font-size: 15px;
            font-weight: 500;
            display: inline-block;
            margin-top: 8px;
            font-family: var(--font-family);
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
        opacity: 0;
        visibility: visible;
        z-index: -1;
        background-color: var(--color-white);
        i,
        svg{
            width: 22px;
            height: 26px;
            color: var(--color-primary);
            fill: var(--color-primary);
            &:before{
                font-size: 30px;
            }
        }
    }
    .wpwax-vm-chatbox-footer{
        .wpwax-vm-chatbox-footer__title{
            font-family: var(--font-family);
            font-size: var(--font-size-chat);
            font-weight: 600;
            text-align: center;
            margin-bottom: 15px;
            text-transform: inherit;
            color: var(--color-text-chat);
        }
        .wpwax-vm-chatbox-footer__actions{
            display: flex;
            flex-wrap: wrap;
            margin: -10px;
            padding: 0 25px;
            @media only screen and (max-width: 767px){
                padding: 0 20px;
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                box-sizing: border-box;
                height: min(80vh,90px);
                width: 90px;
                flex-basis: 90px;
                flex-grow: 1;
                margin: 5px;
                transform: scale(1);
                transition transform .2s ease-in;
                &:hover{
                    background-color: var(--primary-button-bg);
                    color: var(--primary-button-color);
                    transform: scale(1.06);
                    /* fill: var(--primary-button-bg);
                    path{
                        fill: var(--primary-button-bg);
                    } */
                }
                @media only screen and (max-width: 767px){
                    height: min(80vh,70px);
                    width: 60px;
                    flex-basis: 60px;
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
                span{
                    @media only screen and (max-width: 767px){
                        display: none;
                    }
                }
            }
        }
        .wpwax-vm-chatbox-footer__text{
            font-family: var(--font-family);
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
                background-color: var(--color-page-header-bg);
                @media only screen and (max-width: 767px){
                    padding: 15px;
                }
                .wpwax-vm-chatbox-title{
                    font-family: var(--font-family);
                    font-size: var(--font-size-greet);
                    font-weight: 600;
                    margin: 0;
                }
            }
            .wpwax-vm-chatbox-inner{
                position: relative;
                padding: 0;
                overflow: hidden;
                &:hover{
                    .wpwax-vm-btn-play{
                        opacity: 1;
                        z-index: 100;
                        visibility: visible;
                    }
                }
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
                    height: 300px;
                    width: 100%;
                    z-index: 10;
                    @media only screen and (max-width: 1399px){
                        height: 250px;
                    }
                }
                .wpwax-vm-btn-play{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    opacity: 0;
                    visibility: hidden;
                    transition: .3s;
                    z-index: 10;
                }
                .wpwax-vm-chatbox-img{
                    img{
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }
            .wpwax-vm-chatbox-footer{
                position: relative;
                z-index: 101;
                border-radius: 0 0 25px 25px;
                padding: 0;
                background-color: var(--color-page-bg);
                .wpwax-vm-chatbox-footer__title{
                    font-family: var(--font-family);
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
            font-family: var(--font-family);
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