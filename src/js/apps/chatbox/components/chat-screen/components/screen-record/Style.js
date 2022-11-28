import Styled from 'styled-components';

const ScreenRecordWrap = Styled.div`
    position: relative;
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
    .wpwax-vm-btn-back{
        position: absolute;
        left: 15px;
        top: 15px;
        @media only screen and (max-width: 767px){
            top: 15px;
            left: 15px;
        }
    }
    &.wpwax-vm-record-staging{
        display: flex;
        flex-direction: column;
        justify-content: center;
		height: min(80vh,620px);
        .wpwax-vm-timer{
            font-family: var(--font-family);
            span{
                font-size: 50px;
                font-weight: 500;
                color: var(--color-text);
            }
            &.wpwax-vm-timer-start{
                span{
                    color: #FC495D;
                }
            }
        }
        .wpwax-vm-record-staging__bottom{
            padding-top: 180px;
            @media only screen and (max-width: 1399px){
                padding-top: 120px;
            }
            @media only screen and (max-width: 1299px){
                padding-top: 100px;
            }
            p{
                min-height: 32px;
            }
            .wpwax-vm-highlighted{
                display: inline-block;
            }
            .wpwax-vm-record-staging__bottom--action{
                position: relative;
                .wpwax-vm-pause-btn{
                    display: none;
                    position: relative;
                    &:after{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 40px;
                        height: 40px;
                        border-radius: 14px;
                        transform: translate(-50%,-50%);
                        content: '';
                        background-color: var(--color-white);
                        z-index: 101;
                    }
                }
                .wpwax-vm-record-btn{
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        svg{
                            path{
                                fill: #FC495D;
                            }
                        }
                        &:after{
                            background-color: #FC495D;
                        }
                    }
                    &:after{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        width: 36px;
                        height: 36px;
                        border-radius: 12px;
                        content: '';
                        display: none;
                        background-color: var(--color-white);
                    }
                    &.wpwax-vm-record-progress{
                        svg{
                            display: none;
                        }
                        &:after{
                            display: block;
                        }
                    }
                    svg{
                        width: 36px;
                        height: 36px;
                        path{
                            fill: var(--color-white);
                        }
                    }

                }
                .wpwax-vm-record-btn,
                .wpwax-vm-pause-btn{
                    width: 110px;
                    height: 110px;
                    margin: 0 auto;
                    border-radius: 50%;
                    transition: background-color .3s ease-in-out;
                    background-color: #FC495D;
                    border: 2px solid #FC495D;
                    &:hover{
                        color: #FC495D;
                        background-color: #fff;
                    }
                    @media only screen and (max-width: 767px){
                        width: 90px;
                        height: 90px;
                    }
                }
                &.wpwax-vm-record-start{
                    .wpwax-vm-record-btn{
                        display: none;
                    }
                    .wpwax-vm-pause-btn{
                        display: block;
                    }
                    .wpwax-vm-btn-close{
                        display: none;
                    }
                }
            }
            p{
                font-size: 18px;
                font-weight: 600;
                margin-bottom:30px;
                color: var(--color-dark);
                .wpwax-vm-highlighted{
                    color: #EF0000;
                }
            }
        }
    }
    .wpwax-hg-btn-minimize{
        position: absolute;
        top: 10px;
        right: 30px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 40px;
        line-height: 1;
        @media only screen and (max-width: 767px){
            top: 0;
            right: 25px;
        }
        svg{
            width: 25px;
            height: 25px;
            fill: var(--color-text);
        }
    }
    .wpwax-hg-record-timer{
        display: block;
        font-size: 30px;
        color: #FC495D;
        text-align: center;
        margin-bottom: 30px;
    }
    .wpwax-hg-screenrecord-action{
        .wpwax-vm-btn{
            width: 100%;
            min-height: 50px;
            box-sizing: border-box;
        }
    }
    &.wpwax-vm-record-permission{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: min(80vh,620px);
        .wpwax-vm-btn{
            border-radius: 10px;
            margin: 28px 0 0;
            min-height: 54px;
            width: 100%;
            box-sizing: border-box;
        }
        .wpwax-video-screen-title{
            margin-top: 0;
            font-size: 18px;
            font-weight: 500;
            text-align: center;
            margin: 0 0 30px;
            font-family: var(--font-family);
        }
        img{
            max-width: 380px;
        }
        .wpwax-vm-alert{
            width: 100%;
            margin-top: 15px;
            box-sizing: border-box;
        }
    }
    &.wpwax-vm-record-ready{
        padding: 0 25px;
        height: min(80vh,620px);
        .wpwax-vm-form{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }
        .wpwax-vm-text-reply{
            .wpwax-vm-form-group{
                .wpwax-vm-form__element{
                    background-color: transparent;
                    &:focus{
                        outline: 0 none;
                        border: 0 none;
                    }
                }
            }
        }
        .wpwax-vm-recored-video{
            margin-bottom: 40px;
            position: relative;
            @media only screen and (max-width: 1299px){
                margin-bottom: 15px;
            }
            .wpwax-vm-recorded-preview{
                position: relative;
                border-radius: 15px;
                background-size: cover;
				video {
					width: 100%;
                    height: auto;
                    object-fit: cover;
					border-radius: 15px;
				}
            }
            .wpwax-vm-recored-video__play{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                margin: 0 auto;
                border-radius: 50%;
                background-color: var(--color-white);
                box-shadow: 0 3px 20px rgba(0,0,0,.05);
                div{
                    line-height: .5;
                    svg {
                        width: 16px;
                        height: 16px;
                        path{
                            fill: var(--color-danger);
                        }
                    }
                }
            }
        }
        .wpwax-vm-form-bottom{
            p{
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 18px;
                text-align: center;
            }
            .wpwax-vm-btn{
                svg{
                    position: relative;
                    top: 0;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
                    width: 16px;
                    height: 16px;
                }
            }
            .wpwax-vm-btn-link{
                display: block;
                text-decoration: none;
                font-size: 16px;
                font-weight: 600;
                margin-top: 14px;
                &:hover{
                    color: var(--color-primary);
                }
            }
        }
    }
`;

export default ScreenRecordWrap;