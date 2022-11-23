import Styled from 'styled-components';

const ChatboxForm = Styled.div`
    box-sizing: border-box;
	a:focus, a:active {
		outline: none !important;
		box-shadow: none !important;
	}
    .wpwax-vm-chatbox-bg{
        position: absolute;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        z-index: -1;
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
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
                }
            }
        }
        .wpwax-vm-chatbox-title{
            font-size: 15px;
            font-weight: 600;
            line-height: 1.33;
            color: #ffffff;
            word-break: break-word;
            margin: 15px 0 15px;
        }
        .wpwax-vm-chatbox-subtitle{
            font-size: 15px;
            font-weight: 500;
            opacity: .8;
        }
    }
    .wpwax-vm-chatbox-inner{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 140px 0 50px;
    }
    .wpwax-vm-btn-play,
    .wpwax-vm-btn-pause{
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
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 15px;
            text-transform: inherit;
            color: var(--color-white);
        }
        .wpwax-vm-chatbox-footer__actions{
            display: flex;
            flex-wrap: wrap;
            padding: 0 25px;
            margin: -10px;
            @media only screen and (max-width: 767px){
                padding: 0 20px;
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                min-height: 44px;
                flex: 0 0 48%;
                margin: 1%;
            }
        }
        .wpwax-vm-chatbox-footer__text{
            font-size: 13px;
            font-weight: 500;
            opacity: .8;
            margin: 12px 0 8px;
            text-align: center;
            color: var(--color-white);
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
            box-shadow: 0 3px 30px rgba(0,0,0,.10);
            border-radius: 25px;
            .wpwax-vm-chatbox-header{
                padding: 20px;
                border-radius: 25px 25px 0 0;
                background-color: var(--color-page-header-bg);
                @media only screen and (max-width: 767px){
                    padding: 15px;
                }
                .wpwax-vm-chatbox-title{
                    font-size: 15px;
                    font-weight: 600;
                    word-break: break-word;
                    margin: 0;
                }
            }
            .wpwax-vm-chatbox-inner{
                position: relative;
                display: block;
                padding: 0;
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
                            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
                            color: var(--color-white);
                        }
                    }
                    .wpwax-vm-fulscreen-trigger{
                        line-height: 1;
                    }
                }
                .wpwax-vm-chatbox-img{
                    position: relative;
                    min-height: 300px;
                    z-index: 10;
                    @media only screen and (max-width: 1399px){
                        height: 250px;
                    }
                    &:after{
                        position: absolute;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                        top: 0;
                        width: 100%;
                        height: 280px;
                        opacity: .9;
                        background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
                        content: '';
                        z-index: -1;
                    }
                    &:before{
                        position: absolute;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                        bottom: -100px;
                        width: 100%;
                        height: 250px;
                        opacity: .9;
                        background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
                        content: '';
                        z-index: -1;
                    }
                }
                .wpwax-vm-btn-play,
                .wpwax-vm-btn-pause{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    z-index: 10;
                }
            }
            .wpwax-vm-chatbox-footer{
                position: relative;
                z-index: 101;
                border-radius: 0 0 25px 25px;
                padding: 0;
                background-color: var(--color-page-bg);
                .wpwax-vm-chatbox-footer__title{
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 20px;
                    padding-top: 12px;
                    color: var(--color-dark);
                }
                .wpwax-vm-chatbox-footer__text{
                    font-size: 13px;
                    font-weight: 500;
                    margin: 12px 0 8px;
                    color: var(--color-text);
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

const MessageBox = Styled.div`
	.wpwax-vm-message-content__inner p {
		white-space: pre-wrap;
	}
    &.wpwax-vm-message-single{
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin-bottom: 30px;
        padding: 0 30px;
        @media only screen and (max-width: 767px){
            padding: 0 15px;
        }
        .wpwax-vm-message-author{
            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 15px;
            img{
                max-width: 44px;
                border-radius: 50%;
            }
        }
        .wpwax-vm-message-content{
            max-width: 870px;
            @media only screen and (max-width: 1599px){
                max-width: 730px;
            }
            @media only screen and (max-width: 1399px){
                max-width: 590px;
            }
            @media only screen and (max-width: 1299px){
                max-width: 540px;
            }
            &.wpwax-vm-message-attachment-not-found{
                .wpwax-vm-message-content__inner{
                    background-color: transparent;
                    cursor: not-allowed;
                    padding: 14px 18px;
                    border: 1px solid var(--color-border-light);
                    p{
                        font-size: 16px;
                        opacity: .25;
                        color: var(--color-dark);
                    }
                }
            }
            .wpwax-vm-message-content__top{
                text-align: right;
                margin-bottom: 8px;
                span{
                    font-size: 14px;
                    color: var(--color-text);
                }
                .wpwax-vm-message-time{
                    display:  inline-block;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 4px;
                }
            }
            .wpwax-vm-message-content__inner{
                padding: 12px 18px 14px;
                border-radius: 16px 0 16px 16px;
                background-color: var(--color-bg-general);
                p{
                    font-size: 17px;
                    margin: 0;
                    color: #4D4D4D;
                    @media only screen and (max-width: 1299px){
                        font-size: 15px;
                    }
                }
            }
        }
        &.wpwax-vm-message-single-video{
            .wpwax-vm-message-content__inner{
                padding: 18px;
            }
        }
        &.wpwax-vm-message-single-replied{
            justify-content: flex-start;
            .wpwax-vm-message-author{
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 0;
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 15px;
                order: -1;
            }
            .wpwax-vm-message-content{
                .wpwax-vm-message-content__top{
                    text-align: left;
                }
                .wpwax-vm-message-content__inner{
                    border-radius: 0 16px 16px;
                }
            }

        }
        &.wpwax-vm-message-single-video{
            .wpwax-vm-message-content{
                &.wpwax-vm-message-attachment-not-found{
                    .wpwax-vm-message-content__inner{
                        background-color: transparent;
                    }
                }
                .wpwax-vm-message-content__inner{
                    background-color: #F3F3F3;
                    width: 440px;
                    position: relative;
                    @media only screen and (max-width: 767px){
                        min-height: 140px;
                        width: 240px;
                    }
                    @media only screen and (max-width: 375px){
                        min-height: 140px;
                        width: 200px;
                    }
                    video{
                        width: 100%;
                        height: 100%;
                    }
                    .wpwax-vm-btn-play,
                    .wpwax-vm-btn-pause{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        text-decoration: none;
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        background-color: var(--color-black);
                        .dashicons,
                        svg{
                            position: relative;
                            top: 0;
                            font-size: 24px;
                            color: var(--color-white);
                        }
                    }
                }
            }
        }
        .wpwax-vm-message-content__inner--video{
            display: flex;
            align-items: center;
            position: relative;
            &:after{
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 16px;
                content: '';
                z-index: 0;
                background-color: rgba(3,3,8,.30);
            }
            .wpwax-vm-btn-expander,
            .wpwax-vm-btn-download{
                position: absolute;
                top: 30px;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 40px;
                z-index: 10;
            }
            .wpwax-vm-btn-download{
                top: auto;
                bottom: 20px;
                svg{
                    width: 18px;
                    height: 18px;
                    path{
                        fill: var(--color-white);
                    }
                }
            }
            .wpwax-vm-btn-play,
            .wpwax-vm-btn-pause{
                z-index: 10;
                svg{
                    width: 20px;
                    height: 20px;
                    path{
                        fill: var(--color-white);
                    }
                }
            }
            .wpwax-vm-btn-play{
                svg{
                    position: relative;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 2px;
                    top: 0px;
                }
            }
        }
        &.wpwax-vm-message-single-audio{
            .wpwax-vm-message-content__inner--audio{
                display: flex;
                align-items: flex-start;
                .wpwax-vm-btn-play,
                .wpwax-vm-btn-pause{
                    position: relative;
                    top: 2px;
                    text-decoration: none;
                    line-height: 1;
                    svg,
                    .dashicons{
                        top: 0;
                        font-size: 24px;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 10px;
                        color: var(--color-dark);
                    }
                }
            }
            .wpwax-hg-audio-info{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 14px;
                svg{
                    width: 18px;
                    height: 18px;
                    path{
                        transition: fill .2s ease-in;
                        fill: #A3A3A3;
                    }
                }
            }
            .wpwax-vm-timer{
                display: inline-block;
                font-size: 14px;
                font-weight: 500;
                color: var(--color-dark);
            }
            .wpwax-hg-download{
                line-height: 1;
                border-radius: 50%;
                &:hover{
                    svg{
                        path{
                            fill: var(--color-dark);
                        }
                    }
                }
            }
        }
    }
`;

export  {ChatboxForm, ContactFormWrap, MessageBox};