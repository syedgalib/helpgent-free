import Styled from 'styled-components';

const ScreenRecordWrap = Styled.div`
    position: relative;
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;

    &.wpwax-vm-chat-screen{
        min-height: min(30vh,520px);
    }
    .wpwax-hg-btn-minimize{
        position: absolute;
        top: 10px;
        right: 40px;
        line-height: 1;
        svg{
            width: 25px;
            height: 25px;
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
                text-align: center;
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

export default ScreenRecordWrap;