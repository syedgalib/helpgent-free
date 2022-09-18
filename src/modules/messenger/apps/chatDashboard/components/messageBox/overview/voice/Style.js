import Styled from 'styled-components';

const RecorderWrap = Styled.div`
    text-align: center;
    padding: 0 25px;
    max-width: 450px;
    margin: 0 auto;
    box-sizing: border-box;
    /* animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling; */
    .wpwax-video-screen-title{
        font-size: 18px;
        font-weight: 500;
        margin: 0 0 30px;
    }
    img{
        max-width: 370px;
        margin-bottom: 26px;
    }
    &.wpwax-vm-record-staging{
        padding: 80px 25px;
        .wpwax-vm-timer{
            span{
                font-size: 50px;
                font-weight: 500;
                color: var(--color-text);
            }
            &.wpwax-vm-timer-start{
                span{
                    color: var(--color-danger);
                }
            }
        }
        .wpwax-vm-record-staging__bottom{
            padding-top: 180px;
            .wpwax-vm-record-staging__bottom--action{
                position: relative;
                min-width: 380px;
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
                    display: block;
                }
                .wpwax-vm-record-btn,
                .wpwax-vm-pause-btn{
                    width: 110px;
                    height: 110px;
                    margin: 0 auto;
                    border-radius: 50%;
                    background-color: var(--color-danger);
                }
                .wpwax-vm-btn-close{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 70px;
                    height: 70px;
                    position: absolute;
                    right: 40px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 50%;
                    background-color: #B4B4B4;
                    text-decoration: none;
                    color: var(--color-white);
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

export { RecorderWrap };
