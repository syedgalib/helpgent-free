import Styled from 'styled-components';

const RecorderWrap = Styled.div`
    text-align: center;
    padding: 0 25px;
    min-width: 420px;
    box-sizing: border-box;
    font-family: var(--font-family);
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
    .wpwax-video-screen-title{
        font-size: 18px;
        font-weight: 500;
        font-family: var(--font-family);
        margin: 0 0 30px;
    }
    img{
        max-width: 370px;
        margin-bottom: 26px;
    }
    &.wpwax-vm-record-staging{
        padding: 80px 25px;
		height: calc( 100vh - 100px );
		max-height: 650px;
        .wpwax-vm-timer{
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
            p{
                min-height: 32px;
            }
            .wpwax-vm-highlighted{
                display: inline-block;
                margin: 0 6px;
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        svg{
                            path{
                                fill: #FC495D;
                            }
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
                }
                .wpwax-vm-record-btn-right{
                    position: relative;
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
                    transition: background-color .3s ease-in-out;
                    color: var(--color-white);
                    &.wpwax-vm-btn-close{
                        &:hover{
                            background-color: var(--color-danger);
                        }
                    }
                    &.wpwax-vm-btn-send{
                        border: 2px solid #FC495D;
                        background-color: #FC495D;
                        &:after{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            width: 16px;
                            height: 16px;
                            border-radius: 4px;
                            content: '';
                            background-color: var(--color-white);
                        }
                        &:hover{
                            background-color: var(--color-white);
                            &:after{
                                background-color: #FC495D;
                            }
                        }
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
    &.wpwax-vm-record-before-send{
        padding: 80px 25px;
    }
    &.wpwax-vm-record-ready{
        padding: 160px 25px 25px;
        .wpwax-vm-record-ready__top{
            position: relative;
            /* .wpwax-vm-recorded-preview{
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
            } */
            .wpwax-vm-recorded-btn{
                /* position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%); */
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 70px;
                margin: 0 auto;
                border-radius: 50%;
                z-index: 101;
                transition: box-shadow .2s ease-in;
                background-color: var(--color-white);
                box-shadow: 0 5px 50px rgba(0,0,0,.15);
                &:hover{
                    box-shadow: 0 20px 60px rgba(0,0,0,.20);
                }
                >div{
                    width: 25px;
                    height: 25px;
                    line-height: 1;
                    svg{
                        width: 25px;
                        height: 25px;
                        position: relative;
                        left: 0;
                        path{
                            fill: var(--color-primary);
                        }
                    }
                }
            }

            .wpwax-vm-audio-range{
                width: calc(100% + 50px);
                display: block;
                margin: 100px 0 0 -30px;
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
