import Styled from 'styled-components';

const VideoHomeWrap = Styled.div`
    text-align: center;
    padding: 180px 25px 180px;
    border-radius: 25px;
    min-width: 420px;
    box-sizing: border-box;
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
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
        .wpwax-vm-btn{
            margin-top: 28px;
            border-radius: 10px;
        }
    }
    &.wpwax-vm-record-staging{
        height: 100%;
        z-index: 101;
        padding: 0;
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
        padding: 25px;
        .wpwax-vm-form{
            position: relative;
            min-height: 570px;
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
            margin-top: 30px;
            position: relative;
            .wpwax-vm-recorded-preview{
                border-radius: 15px;
                background-size: cover;
                position: relative;
				video {
					width: 100%;
					border-radius: 15px;
					box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
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
            position: absolute;
            width: 100%;
            bottom: 25px;
            .wpwax-vm-btn{
                svg{
                    position: relative;
                    top: 3px;
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
    &.wpwax-vm-record-send-progress{
        min-height: 620px;
        display: flex;
        align-items: center;
        justify-content: center;
        .wpwax-vm-record-send-progress__bar{
            position: relative;
            width: 164px;
            height: 164px;
            border-radius: 50%;
            margin: 0 auto 40px;
            &:after{
                content: "";
                position: absolute;
                top: 3px;
                left: 3px;
                width: 158px;
                height: 158px;
                border-radius: 50%;
                background-color: white;
            }
            &:before{
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-image: linear-gradient(90deg, #6551F2 0%, transparent 0%, transparent), linear-gradient(270deg, #6551F2 50%, #E8E8E8 50%, #E8E8E8);
                content: "";
            }
            span{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                font-size: 16px;
                font-weight: 600;
                z-index: 101;
            }
        }
        p{
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            color: var(--color-dark);
            &.wpwax-vm-danger-text{
                color:  var(--color-danger);
            }
            &+p{
                margin-top: 6px;
            }
        }
    }
    &.wpwax-vm-record-send-success{
        padding: 0;
        min-height: 620px;
        border-radius: 25px;
        .wpwax-vm-record-send-success__top{
            padding: 30px 0 40px;
            background-color: #030308;
            border-radius: 25px 25px 0 0;
            .wpwax-vm-record-send-success__check{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70px;
                height: 70px;
                margin: 0 auto;
                border-radius: 50%:
                background-color: var(--color-success);
            }
            h4{
                margin: 20px 0 0;
                font-size: 20px;
                font-weight: 600;
                margin: 18px auto 0;
                line-height: 1.3;
                color:  var(--color-white);
            }
        }
        .wpwax-vm-record-send-success__content{
            padding: 50px 30px 0;
            .wpwax-vm-record-send-success__title{
                font-size: 24px;
                font-weight: 600;
                color: var(--color-dark);
            }
            p{
                font-size: 16px;
                font-weight: 500;
                color: var(--color-text);
            }
        }
        .wpwax-vm-record-send-success__bottom{
            padding: 120px 30px 30px 30px;
        }
    }
`;

export { VideoHomeWrap, VideoRecordWrap };