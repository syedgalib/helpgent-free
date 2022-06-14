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
    &.wpwax-vm-record-staging{
        height: 620px;
        z-index: 101;
        padding: 0;
        animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
        &:after,
        &:before{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 15%;
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
                text-align: left;
                margin: 0;
                padding: 40px;
                color: var(--color-dark);
                .wpwax-vm-timer{
                    display: block;
                    margin: 6px 0 0;
                }
            }
            .wpwax-vm-record-staging__btn-expand{
                position: absolute;
                right: 15px;
                top: 40px;
            }
        }
    }
    &.wpwax-vm-record-ready{
        padding: 90px 25px 90px;
        .wpwax-vm-record-ready__top{
            position: relative;
            .wpwax-vm-recorded-preview{
                min-height: 240px;
                position: relative;
                z-index: 101;
                &:after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                    background-color: rgba(3,3,8,1);
                    opacity: .3;
                    content: "";
                    z-index: -1;
                }
                &.wpax-vm-preview-bg{
                    background-size: cover;
                }
            }
            .wpwax-vm-recorded-play{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 70px;
                margin: 0 auto;
                border-radius: 50%;
                z-index: 101;
                background-color: var(--color-white);
                box-shadow: 0 5px 50px rgba(0,0,0,.15);
                div{
                    line-height: 1;
                    svg{
                        position: relative;
                        left: 2px;
                        path{
                            fill: var(--color-danger);
                        }
                    }
                }
            }
        }
        .wpwax-vm-record-ready__bottom{
            padding-top: 36px;
            h4{
                font-size: 20px;
                font-weight: 600;
                margin: 0 0 20px;
            }
            .wpwax-vm-record-ready__bottom--actions{
                a + a{
                    margin-top: 10px;
                }
            }
        }
    }
`;

export { VideoHomeWrap, VideoRecordWrap };