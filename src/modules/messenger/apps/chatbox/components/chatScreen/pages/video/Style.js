import Styled from 'styled-components';

const VideoHomeWrap = Styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 180px 25px 180px;
    border-radius: 25px;
    min-width: 420px;
    box-sizing: border-box;
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
    .wpwax-vm-video-home{
        width: 100%;
    }
    .wpwax-vm-video-home__title{
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 30px;
        color: var(--color-dark);
    }
    .wpwax-vm-video-home__btns{
        a,
        span{
            display: flex;
            justify-content: center;
        }
        span{
            font-size: 13px;
            font-weight: 500;
            margin: 12px 0;
            display: inline-block;
        }
    }
    .wpwax-vm-btn{
        &.wpwax-vm-btn-light{
            color: var(--color-dark);
            background-color: var(--color-border-light);
            &:hover{
                color: var(--color-dark);
                background-color: #cfd1d4;
            }
        }
    }
    .wpwax-vm-short-text{
        font-size: 12px;
        font-weight: 500;
        color: #898989;
        margin: 0;
    }
`;

const VideoRecordWrap = Styled.div`
    position: relative;
    padding: 100px 25px;
    min-width: 420px;
    box-sizing: border-box;
    text-align: center;
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
    .wpwax-video-screen-title{
        font-size: 18px;
        font-weight: 500;
        color: var(--color-dark);
    }
    &.wpwax-vm-record-permission{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        .wpwax-vm-btn{
            border-radius: 10px;
            margin: 28px 0 20px;
            min-height: 54px;
        }
        .wpwax-video-screen-title{
            margin-top: 0;
        }
    }
    &.wpwax-vm-record-staging{
        height: 100%;
        z-index: 101;
        animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
        &:after,
        &:before{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 20%;
            content: '';
            z-index: -1;
            opacity: .8;
            background-image: linear-gradient(to top, rgba(0,0,0,0),rgba(0,0,0,1));
        }
        &:after{
            border-radius: 25px 25px 0 0;
        }
        &:before{
            top:auto;
            bottom: 0;
            border-radius: 0 0 25px 25px;
            opacity: .6;
            background-image: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,1));
        }
        video{
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 25px;
        }
        .wpwax-vm-record-staging__top{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .wpwax-vm-record-staging__title{
                font-size: 26px;
                font-weight: 600;
                text-align: left;
                margin: 0;
                padding: 30px;
                color: var(--color-white);
                .wpwax-vm-timer{
                    display: block;
                    margin: 6px 0 0;
                }
            }
            .wpwax-vm-record-staging__btn-expand{
                position: absolute;
                right: 15px;
                top: 30px;
            }
        }
        .wpwax-vm-record-staging__action{
            position: absolute;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            z-index: 101;
            &.wpwax-vm-record-start{
                .wpwax-vm-btn-record{
                    background-color: var(--color-danger);
                    &:after{
                        border-radius: 8px;
                        background-color: var(--color-white);
                    }
                }
            }
        }
        .wpwax-vm-btn-record{
            display: block;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: var(--color-white);
            &:after{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 25px;
                height: 25px;
                border-radius: 50%;
                content: "";
                z-index: 101;
                background-color: var(--color-danger);
            }
        }
    }
    &.wpwax-vm-record-ready{
        padding: 80px 25px;
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
            .wpwax-vm-recorded-preview{
                position: relative;
                border-radius: 15px;
                background-size: cover;
				video {
					width: 100%;
                    height: 240px;
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
            }
            .wpwax-vm-btn{
                svg{
                    position: relative;
                    top: 0;
                    margin-left: 10px;
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

export { VideoHomeWrap, VideoRecordWrap };