import Styled from 'styled-components';

const VideoReplyWrap = Styled.div`
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    width: calc( 100% - 60px );
    border-radius: 30px;
    z-index: 1000001;
    &:after{
        position: absolute;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        top: 0;
        width: 100%;
        height: 150px;
        opacity: .80;
        z-index: 10;
        content: "";
        border-radius: 30px 30px 0 0;
        background: linear-gradient(to top, rgba(0,0,0,0),rgba(0,0,0,1))
    }
    &:before{
        position: absolute;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        bottom: 0;
        width: 100%;
        height: 150px;
        opacity: .60;
        z-index: 10;
        content: "";
        background: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,1))
    }

	.wpwax-vm-reply-countdown {
		position: relative;
		z-index: 99999;
		color: #fff;
		top: 50%;
		transform: translate(0,-50%);

		.wpwax-vm-countdown {
			.wpwax-vm-countdown-heading, .wpwax-vm-countdown-text {
				font-weight: bold;
			}
		}
	}

    .wpwax-vm-reply-video-bg{
        position: absolute;
        top: 0;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        width: 100%;
        height: 100%;
        border-radius: 30px;
        background-size: cover;
    }
    .wpwax-vm-reply-top{
        position: relative;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        padding: 40px 40px 0;
        @media only screen and (max-width: 767px){
            padding: 20px 20px 0;
        }
        h4{
            font-size: 26px;
            font-weight: 600;
            margin: 0;
            color: var(--color-white);
            @media only screen and (max-width: 767px){
                font-size: 20px;
            }
            .wpwax-vm-timer{
                display: block;
                font-size: 16px;
                margin-top: 14px;
            }
        }
        .wpwax-vm-reply-close{
            text-decoration: none;
            .dashicons{
                font-size: 22px;
                color: var(--color-white);
            }
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
    }
    .wpwax-vm-reply-bottom{
        display: flex;
        justify-content: center;
        position: relative;
        text-align: center;
        bottom: 40px;
        z-index: 100;
        .wpwax-vm-btn-record{
            position: relative;
            display: block;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: var(--color-white);
            @media only screen and (max-width: 767px){
                width: 70px;
                height: 70px;
            }
            &:focus{
                outline: none;
                box-shadow: 0 0;
                border: 0 none;
            }
            &:after{
                width: 25px;
                height: 25px;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                content: '';
                background-color: var(--color-danger);
            }
        }
    }
    &.wpwax-vm-reply-start{
        .wpwax-vm-reply-bottom{
            .wpwax-vm-btn-record{
                background-color: var(--color-danger);
                &:after{
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    background-color: var(--color-white);
                }
            }
        }
    }
    &.wpwax-vm-reply-ready{
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 80px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 80px;
        top: 80px;
        bottom: 0;
        width: calc( 100% - 160px );
        height: calc( 100vh - 160px );
		background-color: #000000;
        @media only screen and (max-width: 991px){
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 30px;
            width: calc( 100% - 60px );
        }
        @media only screen and (max-width: 767px){
            flex-direction: column;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 15px;
            width: calc( 100% - 30px );
        }
        &:after{
            border-radius: 30px 0 0 0;
        }
        &.wpwax-vm-reply-upload{
            .wpwax-vm-reply-ready__video{
                border-radius: 30px 0 0 30px;
                background-color: var(--color-dark);
                @media only screen and (max-width: 767px){
                    /* display: none; */
                    border-radius: 30px 30px 0 30px;
                }
            }
            .wpwax-vm-reply-ready__file-input{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 40px 45px;
                padding: 20px;
                border-radius: 14px;
                min-height: 260px;
                border: 1px dashed #C4C4C4;
                background-color: #EAEAEA;
                @media only screen and (max-width: 1399px){
                    margin: 0 30px 40px;
                    min-height: 180px;
                }
                input[type=file]{
                    display: none;
                }
                strong{
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 500;
                    margin: 12px 0;
                    color: var(--color-dark);
                }
                span,
                p{
                    font-size: 14px;
                    font-weight: 500;
                }
                p + p{
                    margin-top: 4px;
                }
                .wpwax-vm-dark-alert{
                    display: inline-block;
                    margin: 10px 0 14px;
                    color: var(--color-dark);
                }
                p{
                    margin: 0;
                    color: var(--color-text);
                }
            }
            .wpawax-vm-reply-btn-upload{
                font-size: 14px;
                font-weight: 600;
                padding: 0 20px;
                display: inline-flex;
                align-items: center;
                min-height: 38px;
                border-radius: 8px;
                text-decoration: none;
                color: var(--color-white);
                background-color: var(--color-dark);
            }
        }
        .wpwax-vm-reply-close{
            position: absolute;
            top: -40px;
            ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 40px;
            text-decoration: none;
            color: var(--color-white);
            .dashicons{
                font-size: 28px;
            }
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
        &:before{
            display: none;
        }
        &:after{
            width: 50%;
            @media only screen and (max-width: 767px){
                width: 100%;
                border-radius: 30px 30px 0 0;
            }
        }
        .wpwax-vm-reply-ready__video{
            width: 50%;
            position: relative;
            @media only screen and (max-width: 767px){
                /* display: none; */
                width: 100%;
                min-height: 240px;
                height: 100%;
            }
            .wpwax-vm-reply-video-bg{
                border-radius: 0px;
                @media only screen and (max-width: 767px){
                    border-radius: 30px 30px 0 0;
                }
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 30px 0 0 0;
                @media only screen and (max-width: 767px){
                    border-radius: 30px 30px 0 0;
                }
            }
            video{
                border-radius: 30px 0 0 30px;
            }
            .wpwax-vm-reply-ready__video--top{
                display: flex;
                justify-content: flex-end;
                position: relative;
                padding: 40px 40px 0 0;
                color: var(--color-white);
                z-index: 100001;
                .wpwax-vm-video-timer{
                    font-size: 14px;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
                    display: inline-block;
                }
            }
            .wpwax-vm-video_play{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                display: flex;
                align-items: center;
               justify-content: center;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                text-decoration: none;
                box-shadow: 0 3px 20px rgba(0,0,0,.05);
                background-color: var(--color-white);
                .dashicons{
                    position: relative;
                    top: -3px;
                    width: 30px;
                    height: 22px;
                    font-size: 30px;
                    color: var(--color-danger);
                }
            }
        }
        .wpwax-vm-reply-ready__content{
            position: relative;
            display: flex;
            flex-direction: column;
            /* overflow-y: auto; */
            width: 50%;
            border-radius: 0 30px 30px 0;
            background-color: #F0F0F0;
            @media only screen and (max-width: 767px){
                width: 100%;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                border-radius: 0 0 30px 30px;
                &::-webkit-scrollbar {
                    width: 11px;
                }

                &::-webkit-scrollbar-track {
                    background: var(--color-light);
                }

                &::-webkit-scrollbar-thumb {
                    background-color: var(--color-bg-gray);
                    border-radius: 6px;
                    border: 3px solid var(--color-light);
                }
            }
            .wpwax-vm-media{
                padding: 40px 50px 45px;
                @media only screen and (max-width: 1399px){
                    padding: 20px 30px 25px;
                }
                .wpwax-vm-media__body{
                    top: -2px;
                }
                .wpwax-vm-media__title{
                    font-size: 22px;
                    font-weight: 600;
                    font-family: 'Inter', sans-serif;
                    text-transform: initial;
                    width: 250px;
                    line-height: 1.5;
                    margin-bottom: 6px;
                    @media only screen and (max-width: 1399px){
                        font-size: 20px;
                    }
                }
                .wpwax-vm-media__meta{
                    span{
                        font-size: 15px;
                        color: var(--color-text);
                        @media only screen and (max-width: 1399px){
                            font-size: 14px;
                        }
                    }
                }
                .wpax-vm-imglist{
                    img{
                        max-width: 50px;
                        border-radius: 50%;
                    }
                }
            }
            .wpwax-vm-reply-ready__text-form{
                overflow-y: auto;
                &::-webkit-scrollbar {
                    width: 11px;
                }

                &::-webkit-scrollbar-track {
                    background: var(--color-light);
                }

                &::-webkit-scrollbar-thumb {
                    background-color: var(--color-bg-gray);
                    border-radius: 6px;
                    border: 3px solid var(--color-light);
                }
            }
        }
        .wpwax-vm-reply-ready__text-form-input{
            padding: 0 50px;
            @media only screen and (max-width: 1399px){
                padding: 0 30px;
            }
            textarea{
                font-size: 18px;
                width: 100%;
                border: 0 none;
                min-height: 200px;
                background-color: transparent;
                &:focus{
                    outline: none;
                    border: 0 none;
                    box-shadow: 0 0;
                }
            }
        }
        .wpwax-vm-reply-ready__text-form--action{
            position: absolute;
            bottom: 0;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            width: 100%;
            display: flex;
            border-radius: 0 0 30px 0;
            background-color: var(--color-white);
            /* @media only screen and (max-width: 767px){
                position: fixed;
            } */
            .wpwax-vm-reply-ready-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 1;
                min-height: 80px;
                text-align: center;
                text-decoration: none;
                color: #4D4D4D;
                @media only screen and (max-width: 1299px){
                    min-height: 60px;
                }
                @media only screen and (max-width: 767px){
                    min-height: 50px;
                }
                &:hover{
                    .wpwax-vm-reply-ready-btn__text{
                        color: var(--color-primary);
                    }
                    span,
                    svg path{
                        color: var(--color-primary);
                        fill: var(--color-primary);
                    }
                }
                .wpwax-vm-reply-ready-btn__text{
                    display: inline-block;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
                }
                svg{
                    path{
                        fill: #4D4D4D;
                    }
                }
                &.wpwax-vm-btn-send{
                    ${({ theme }) => (theme.direction === 'ltr' ? 'border-left' : 'border-right')}: 1px solid #EDEDED;
                    .wpwax-vm-reply-ready-btn__text{
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 10px;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 0;
                    }
                }
            }
        }
    }
`;

export { VideoReplyWrap };