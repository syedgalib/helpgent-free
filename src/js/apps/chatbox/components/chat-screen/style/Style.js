import Styled from 'styled-components';

const ChatboxForm = Styled.div`
    font-size: 16px;
    height: 100%;
    box-sizing: border-box;
    font-family: var(--font-family);
    &:hover{
        .wpwax-vm-btn-play{
            opacity: 1;
            visibility: visible;
            z-index: 10;
        }
    }
    .wpwax-vm-chatbox-bg{
        position: absolute;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        overflow: hidden;
        z-index: -1;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        video{
            height: 100%;
        }
    }
    .wpwax-vm-chatbox-header{
        padding: 25px;
        max-height: 160px;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        /* Hide scrollbar for Chrome, Safari and Opera */
        &::-webkit-scrollbar {
            display: none;
        }

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
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
                }
            }
            .wpwax-vm-fulscreen-trigger{
                line-height: 1;
            }
        }
        .wpwax-vm-chatbox-title{
            word-break: break-word;
            font-weight: 600;
            line-height: 1.25;
            text-transform: capitalize;
            margin: 15px 0 5px;
            color: var(--color-text-greet);
            font-family: var(--font-family);
            font-size: var(--font-size-greet);
        }
        .wpwax-vm-chatbox-description{
            font-size: 15px;
            font-weight: 500;
            display: inline-block;
            margin-top: 8px;
            word-break: break-word;
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
        background-color: var(--play-button-bg);
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
        svg.wpwax-vm-play{
            margin-left: 3px;
        }
    }
    .wpwax-vm-chatbox-footer{
        &.wpwax-vm-chatbox-footer-copyright{
            .wpwax-vm-chatbox-footer__text{
                margin: 0 0 8px;
            }
        }
        .wpwax-vm-chatbox-footer__title{
            font-weight: 600;
            text-align: center;
            margin-bottom: 18px;
            text-transform: inherit;
            line-height: 1.5;
            font-family: var(--font-family);
            font-size: var(--font-size-chat);
            color: var(--color-text-chat);
        }
        .wpwax-vm-chatbox-footer__actions{
            display: flex;
            flex-wrap: wrap;
            margin: -5px -10px 10px;
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
                word-break: normal;
                white-space: nowrap;
                transform: scale(1);
                transition transform .2s ease-in;
                &:hover{
                    transform: scale(1.06);
                    background-color: var(--primary-button-bg);
                    color: var(--primary-button-color);
                }
                @media only screen and (max-width: 1399px){
                    height: min(80vh,80px);
                    width: 80px;
                    flex-basis: 80px;
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
                    fill: var(--primary-button-color);
                    path{
                        fill: var(--primary-button-color);
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
            font-weight: 500;
            opacity: .8;
            margin: 0 0 14px;
            text-align: center;
            min-height: 20px;
            font-family: var(--font-family);
            font-size: var(--footer-text-font-size);
            color: var(--color-footer-text);
        }
        .wpwax-vm-chatbox-footer__bottom{
            position: relative;
            bottom: -1px;
            margin: 0;
            font-size: 12px;
            font-weight: 500;
            padding: 8px;
            text-align: center;
            border-radius: 0 0 22px 22px;
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
            box-shadow: 0 3px 30px rgba(0,0,0,.10);
            border-radius: 25px;
            &:before,
            &:after{
                display: none;
            }
            &.wpwax-copyright-active{
                .wpwax-vm-chatbox-header{
                    &.wpwax-welcome-video{
                        .wpwax-vm-chatbox-description{
                            min-height: auto;
                        }
                    }
                }
            }
            .wpwax-vm-chatbox-header{
                padding: 20px 20px 18px;
                border-radius: 25px 25px 0 0;
                flex: 0 0 auto;
                background-color: var(--color-page-header-bg);
                @media only screen and (max-width: 767px){
                    padding: 15px;
                }
                &.wpwax-welcome-video{
                    .wpwax-vm-chatbox-description{
                        min-height: auto;
                    }
                }
                .wpwax-vm-chatbox-title{
                    text-transform: capitalize;
                    word-break: break-word;
                    font-weight: 600;
                    margin: 0;
                    font-family: var(--font-family);
                    font-size: var(--font-size-greet);
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
                    ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                    top: -110px;
                    width: 100%;
                    height: 280px;
                    opacity: .9;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
                    content: '';
                    z-index: 10;
                }
                &:before{
                    position: absolute;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
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
                    ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 15px;
                    z-index: 101;
                    span{
                        font-size: 13px;
                        font-weight: 600;
                        &.wpwax-vm-timer{
                            display: block;
                            font-family: var(--font-family);
                            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
                            color: var(--color-white);
                        }
                    }
                    .wpwax-vm-fulscreen-trigger{
                        line-height: 1;
                    }
                }
                video{
                    object-fit: cover;
                    height: 100%;
                }
                .wpwax-vm-chatbox-img,
                .wpwax-vm-chatbox-video{
                    position: relative;
                    display: flex;
                    width: 100%;
                    z-index: 10;
                }

                .wpwax-vm-chatbox-video{
                    height: 100%;
                }
                .wpwax-vm-chatbox-img{
                    height: 100%;
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
                    svg.wpwax-vm-play{
                        margin-left: 3px;
                    }
                }
                .wpwax-vm-chatbox-img{
                    /* height: 400px; */
                    height: 100%;
                    @media only screen and (max-width: 1399px) {
                        /* height: 240px; */
                    }
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
                &.wpwax-vm-chatbox-footer-copyright{
                    .wpwax-vm-chatbox-footer__text{
                        margin: 0 0 8px;
                    }
                }
                .wpwax-vm-chatbox-footer__title{
                    font-weight: 600;
                    margin: 0 0 20px;
                    padding-top: 14px;
                    font-family: var(--font-family);
                    font-size: var(--font-size-chat);
                    color: var(--color-text-chat);
                }
                .wpwax-vm-chatbox-footer__text{
                    font-weight: 500;
                    margin: 0 0 14px;
                    font-size: var(--footer-text-font-size);
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
            font-family: var(--font-family);
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
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 25px;
            .wpwax-vm-btn{
                border-radius: 10px;
                svg{
                    width: 16px;
                    height: 16px;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
                }
            }
        }
    }
`;

export { ChatboxForm, ContactFormWrap };