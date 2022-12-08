import Styled from 'styled-components';

const VideoHomeWrap = Styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0 25px 0;
    border-radius: 25px;
    /* min-width: 420px; */
    height: min(80vh,620px);
    box-sizing: border-box;
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
    .wpwax-vm-video-home{
        width: 100%;
        font-family: var(--font-family);
    }
    .wpwax-vm-video-home__title{
        font-size: 18px;
        font-weight: 600;
        font-family: var(--font-family);
        margin: 0 0 30px;
        color: var(--color-dark);
        @media only screen and (max-width: 767px){
            font-size: 15px;
        }
    }
    .wpwax-vm-video-home__btns{
        a,
        span{
            font-family: var(--font-family);
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
        font-family: var(--font-family);
        color: #898989;
        margin: 0;
    }
`;

const VideoRecordWrap = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 25px;
    height: min(80vh,620px);
    /* min-width: 420px; */
    box-sizing: border-box;
    text-align: center;
    font-family: var(--font-family);
    animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
    .wpwax-vm-btn-back{
        position: absolute;
        left: 15px;
        top: 15px;
        z-index: 100;
        @media only screen and (max-width: 767px){
            top: 15px;
            left: 15px;
        }
    }
    .wpwax-video-screen-title{
        font-size: 18px;
        font-weight: 500;
        font-family: var(--font-family);
        color: var(--color-dark);
    }
    &.wpwax-vm-record-permission{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .wpwax-vm-btn{
            border-radius: 10px;
            margin: 28px 0 0;
            min-height: 54px;
            width: 100%;
            box-sizing: border-box;
        }
        .wpwax-video-screen-title{
            margin: 0 0 25px;
        }
        .wpwax-vm-alert{
            width: 100%;
            margin-top: 15px;
            box-sizing: border-box;
        }
    }
    &.wpwax-vm-record-staging{
        z-index: 101;
		height: min(80vh,620px);
        animation: 0.4s ease-in-out 0s 1 normal none wpwaxVmScaling;
        &:after,
        &:before{
            position: absolute;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            top: 0;
            width: 100%;
            height: 20%;
            content: '';
            z-index: 1;
            opacity: .8;
            background-image: linear-gradient(to top, rgba(0,0,0,0),rgba(0,0,0,1));
        }
        &:after{
            top: 0;
            border-radius: 23px 23px 0 0;
        }
        &:before{
            top: auto;
            bottom: 0;
            border-radius: 0 0 23px 23px;
            opacity: .6;
            background-image: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,1));
        }
        .wpwax-vm-btn-back{
            background-color: transparent;
            border: 1px solid var(--color-white);
            &:hover{
                background-color: rgba(255,255,255,.10);
            }
            svg{
                width: 12px;
                path{
                    fill: var(--color-white);
                }
            }
        }
        .wpwax-vm-record-staging__top{
            .wpwax-vm-record-staging__title{
                .wpwax-vm-timer{
                    left: 20px;
                }
            }
        }
        video{
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 25px;
			object-fit: cover;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
        }
        .wpwax-vm-record-staging__countdown {
			position: absolute;
			z-index: 9999;
			color: #fff;
			background: rgb(127 127 127 / 50%);
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 25px;

			.wpwax-vm-countdown {
                font-family: var(--font-family);
				.wpwax-vm-countdown-heading, .wpwax-vm-countdown-text {
					font-family: var(--font-family);
					font-weight: bold;
					color: #fff;
				}
				.wpwax-vm-countdown-heading {
    				margin: 0;
					font-size: 100px;
				}
				.wpwax-vm-countdown-text {
					margin: 20px 0;
					font-size: 30px;	
				}
			}
		}
        .wpwax-vm-record-staging__top{
            position: absolute;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            top: 0;
            width: 100%;
            font-family: var(--font-family);
            display: flex;
            justify-content: space-between;
            z-index: 10;
            .wpwax-vm-record-staging__title{
                font-size: 26px;
                font-weight: 600;
                text-align: left;
                margin: 0;
                padding: 30px;
                color: var(--color-white);
                .wpwax-vm-timer{
                    position: absolute;
                    display: block;
                    font-size: 20px;
                    top: 20px;
                    left: 65px;
                    font-family: var(--font-family);
                }
            }
            .wpwax-vm-record-staging__btn-expand{
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 15px;
                top: 30px;
            }
        }
        .wpwax-vm-record-staging__action{
            position: relative;
            width: 100%;
            margin-top: auto;
            margin-bottom: 25px;
            z-index: 101;
            &.wpwax-vm-record-start{
                .wpwax-vm-btn-record{
                    background-color: transparent;
                    border: 5px solid var(--color-white);
                    &:after{
                        width: 25px;
                        height: 25px;
                        border-radius: 8px;
                    }
                }
            }
            .wpwax-vm-btn-record-right{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 75px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                background-color: transparent;
                text-decoration: none;
                transition: background-color,border-color .3s ease-in-out;
                color: var(--color-dark);
                @media only screen and (max-width: 767px){
                    width: 30px;
                    height: 30px;
                }
                &.wpwax-vm-btn-pause,
                &.wpwax-vm-btn-play{
                    border: 3px solid var(--color-white);
                    svg{
                        width: 14px;
                        height: 14px;
                        path{
                            fill: var(--color-white);
                        }
                    }
                    &:hover{
                        background-color: rgba(255,255,255,.10);
                        /* border-color: rgba(255,255,255,.10); */
                    }
                }
                &.wpwax-vm-btn-play{
                    transition: background-color .2s ease-in-out;
                    background-color: #FC495D;
                    &:hover{
                        background-color: #ff2a42;
                    }
                }
            }
        }
        .wpwax-vm-btn-record{
            position: relative;
            display: block;
            width: 70px;
            height: 70px;
            margin: 0 auto;
            border-radius: 50%;
            border: 5px solid var(--color-white);
            background-color: var(--color-white);
            &:after{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: calc( 100% );
                height: calc( 100% );
                border-radius: 50%;
                content: "";
                z-index: 101;
                transition-property: width, height, border-radius;
                transition-duration: .2s;
                transition-timing-function: ease-in; 
                background-color: #FC495D;
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
            width: 100%;
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

export { VideoHomeWrap, VideoRecordWrap };