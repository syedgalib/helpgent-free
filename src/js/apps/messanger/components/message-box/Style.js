import Styled from 'styled-components';

const ChatBoxWrap = Styled.div`
	height: 100%;
    >div{
        @media only screen and (max-width: 1399px) {
            min-height: 620px !important;
        }
    }
    .wpwax-vm-replymode-wrap{
        position: relative;
        &:after{
            position: fixed;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            top: 0;
            width: 100%;
            height: 100%;
            content: '';
            z-index: 100001;
            background-color: rgba(0,0,0,.80);
        }
    }
    .wpwax-vm-record-home{
        position: fixed;
        top: 80px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        width: 100%;
        height: 100%;
        z-index: 100002;
        border-radius: 30px 30px 0 0;
        display: flex;
        align-items: center;
        background-color: var(--color-white);
        .wpwax-vm-record-home__close{
            position: absolute;
            ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 40px;
            top: -50px;
            text-decoration: none;
            color: var(--color-white);
            .dashicons{
                font-size: 30px;
            }
        }

    }
    .wpwax-vm-video-msg{
        position: absolute;
        bottom: 95px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 200px;
        width: 100%;
        height: auto;
        max-width: 484px;
        border-radius: 30px;
        z-index: 10;
        box-shadow: 0 20px 50px rgba(0,0,0,.10);
        background-color: var(--color-white);
        @media only screen and (max-width: 1399px){
            max-width: 434px;
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 40px;
        }
        @media only screen and (max-width: 1199px){
            ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            bottom: 80px;
            max-width: 400px;
        }
        @media only screen and (max-width: 767px){
            max-width: fit-content;
        }
        &.wpwax-vm-video-msg-home{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 50px;
            border-radius: 30px;
            @media only screen and (max-width: 1399px){
                padding: 40px;
            }
            @media only screen and (max-width: 767px){
                padding: 20px;
            }
            .wpwax-vm-video-msg__close{
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 40px;
                top: -50px;
                text-decoration: none;
                color: var(--color-white);
                .dashicons{
                    font-size: 30px;
                }
            }
            .wpwax-vm-video-home__title{
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 20px;
                font-family: var(--font-family);
                color: var(--color-dark);
                @media only screen and (max-width: 1199px){
                    font-size: 16px;
                }
                @media only screen and (max-width: 767px){
                    text-align: center;
                    margin: 20px 25px;
                }
            }
            .wpwax-vm-video-home__action{
                display: flex;
                margin: -10px;
                @media only screen and (max-width: 767px){
                    flex-direction: column;
                }
                .wpwax-vm-video-home__action--btn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;
                    font-weight: 600;
                    margin: 10px;
                    border-radius: 10px;
                    text-align: center;
                    text-decoration: none;
                    min-height: 70px;
                    padding: 0 32px;
                    border-radius: 10px;
                    background-color: var(--color-bg-general);
                    @media only screen and (max-width: 1199px){
                        font-size: 14px;
                        min-height: 50px;
                        padding: 0 20px;
                    }
                    @media only screen and (max-width: 767px){
                        min-height: 46px;
                    }
                    &:focus{
                        outline: none;
                        box-shadow: 0 0;
                    }
                    &:hover{
                        .wpwax-vm-video-home__action--icon{
                            svg{
                                path{
                                    fill: var(--color-primary)
                                }
                            }
                        }
                        .wpwax-vm-video-home__action--text{
                            color: var(--color-primary);
                        }
                    }
                    .wpwax-vm-video-home__action--icon{
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 15px;
                        svg{
                            width: 26px;
                            height: 26px;
                            @media only screen and (max-width: 1199px){
                                width: 20px;
                                height: 20px;
                            }
                            path{
                                fill: var(--color-dark);
                            }
                        }
                    }
                    .wpwax-vm-video-home__action--text{
                        font-size: 15px;
                        font-weight: 600;
                        color: var(--color-dark);
                    }
                }
            }
        }
    }
`;

const MessageBoxWrap = Styled.div`
    border-radius: 20px;
    min-height: 600px;
    background-color: var(--color-white);
    @media only screen and (max-width: 1199px){
        min-height: 550px;
    }
    &.wpwax-vm-loder-active{
        min-height: 500px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6{
        font-family: 'Inter', sans-serif;
    }
    .wpwax-vm-messagebox-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-bg-general);
        @media only screen and (max-width: 1199px){
            flex-direction: column;
            align-items: flex-start;
        }
        .wpwax-vm-media__title{
            text-transform: initial;
            line-height: 1.45;
            font-family: 'Inter', sans-serif;
        }
    }
    .wpwax-vm-messagebox-header__left{
        ${({ theme }) => (theme.direction === 'ltr' ? 'padding-left' : 'padding-right')}: 30px;
        @media only screen and (max-width: 1199px){
            padding: 0 15px 0;
            margin: 0;
        }
        .wpwax-vm-media{
            .wpax-vm-imglist{
                margin: 3px;
                display: flex;
                img{
                    margin: 3px;
                    max-width: 44px;
                    border-radius: 50%;
                    @media only screen and (max-width: 1399px){
                        max-width: 34px;
                        height: 34px;
                    }
                }
                .wpwax-vm-more-img{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    padding: 4px;
                    margin: 3px;
                    background-color: var(--color-primary);
                    @media only screen and (max-width: 1399px){
                        width: 26px;
                        height: 26px;
                    }
                    >div{
                        line-height: 1;
                        width: max-content;
                    }
                    svg{
                        width: 24px;
                        height: 24px;
                        fill: var(--color-white);
                        @media only screen and (max-width: 1399px){
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }
            .wpwax-vm-media__title{
                width: 340px;
                @media only screen and (max-width: 1299px){
                    width: 280px;
                }
                @media only screen and (max-width: 575px){
                    width: 220px;
                }
            }
        }
    }
    .wpwax-vm-messagebox-header__right{
        ${({ theme }) => (theme.direction === 'ltr' ? 'padding-right' : 'padding-left')}: 30px;
        box-sizing: border-box;
        @media only screen and (max-width: 1199px){
            padding: 5px 15px 0 25px;
        }
        &.wpwax-vm-search-active{
            width: 100%;
            padding: 8px 30px;
            .wpwax-vm-messagebox-header__actionlist{
                margin: 0;
                width: 100%;
                .wpwax-vm-searchbox{
                    width: 100%;
                    display: block;
                }
                .wpwax-vm-messagebox-header__action-item{
                    width: 100%;
                    &.wpwax-vm-messagebox-header-search{
                        padding: 0;
                    }
                }
            }
            .wpwax-vm-search-toggle{
                .dashicons{
                    font-size: 28px;
                    width: 28px;
                    height: 28px;;
                    color: var(--color-danger);
                }
            }

        }
        .wpwax-vm-messagebox-header__actionlist{
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
            @media only screen and (max-width: 767px){
                /* flex-direction: column; */
                align-items: center;
                margin: -15px;
            }
        }
        .wpwax-vm-searchbox{
            width: 100%;
            display: none;
            input{
                font-size: 16px;
                width: 100%;
                border: 0 none;
                border-radius: 0px;
                &:focus{
                    outline: none;
                    box-shadow: 0 0;
                }
            }
        }
        .wpwax-vm-search-toggle{
            text-decoration: none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
            span{
                font-size: 24px;
            }
        }
    }
    .wpwax-vm-messagebox-header__action-item{
        display: flex;
        align-items: center;
        padding: 0 15px;
        line-height: 1;
        @media only screen and (max-width: 767px){
            margin: 10px 0;
        }
        &.wpwax-vm-messagebox-header-search{
            min-height: 40px;
        }
        .wpwax-vm-messagebox-header__action--link{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #4D4D4D;
            text-decoration: none;
            &:hover{
                svg path,
                svg circle,
                span{
                    color: var(--color-primary);
                    fill: var(--color-primary);
                }
            }
            &.active{
				color: var(--color-primary);
                svg path,
                svg circle,
                span{
                    color: var(--color-primary);
                    fill: var(--color-primary);
                }
            }
            @media only screen and (max-width: 1399px){
                font-size: 13px;
            }
            svg path,
            span{
                transition: .3s;
            }
            .wpwax-vm-messagebox-header__action--text{
                font-weight: 500;
                display: inline-block;
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 8px;
            }
            svg{
                @media only screen and (max-width: 1399px){
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }

    .wpwax-vm-messagebox-body{
        position: relative;
        .infinite-scroll-component {
            padding-top: 25px;
            /* max-height: 600px; */
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
        .wpwax-vm-scroll-bottom{
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            display: none;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            box-shadow: 0 5px 50px rgba(0,0,0,.15);
            border-radius: 50%;
            transform: translateX(-50%);
            text-decoration: none;
            color: var(--color-dark);
            background-color: var(--color-white);
            &.wpwax-vm-show{
                display: flex;
            }
        }
    }
    .wpwax-vm-messagebox-footer{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        border-top: 1px solid var(--color-border-light);
        @media only screen and (max-width: 1199px){
            flex-direction: column;
        }
        @media only screen and (max-width: 1299px){
            padding: 20px;
        }
        .wpwax-vm-btn{
            border-radius: 10px;
            &:hover{
                color: var(--color-white);
                background-color: var(--color-primary);
                svg path,
                svg circle{
                    fill: var(--color-white);
                }
            }
            &.wpwax-vm-btn-lg{
                height: 48px;
                padding: 0 30px;
            }
        }
        .wpwax-vm-messagebox-footer__text{
            display: inline-block;
            font-size: 15px;
            font-weight: 500;
            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 10px;
            color: #4D4D4D;
            @media only screen and (max-width: 1399px){
                font-size: 14px;
            }
            @media only screen and (max-width: 1199px){
                margin: 0 0 20px 0;
            }
        }
        .wpwax-vm-messagebox-footer__actionlist{
            margin: -5px 0;
            display: flex;
            align-items: center;
            @media only screen and (max-width: 1199px){
                text-align: center;
            }
            .wpwax-vm-btn{
                margin: 5px;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                &.wpwax-vm-btn-lg{
                    @media only screen and (max-width: 1399px){
                        padding: 0 25px;
                        font-size: 14px;
                        margin: 5px;
                    }
                    @media only screen and (max-width: 1240px){
                        padding: 0 10px;
                        margin: 5px;
                    }
                    @media only screen and (max-width: 1199px){
                        padding: 0 20px;
                        margin: 5px;
                    }
                    @media only screen and (max-width: 575px){
                        height: 38px;
                    }
                }
                &:hover{
                    .wpwax-vm-btn-icon{
                        svg circle,
                        svg path{
                            fill: var(--color-white);
                        }
                    }
                }
                .wpwax-vm-btn-icon,
                .wpwax-vm-btn-text{
                    display: inline-block;
                    line-height: .5;
                }
                .wpwax-vm-btn-text{
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
                    @media only screen and (max-width: 575px){
                        display: none;
                    }
                }
                .wpwax-vm-btn-icon{
                    svg circle,
                    svg path{
                        fill: var(--color-dark);
                    }

                    svg{
                        width: 18px;
                        height: 18px;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 0;
                    }
                }
                &.wpwax-vm-btn-recording{
                    color: var(--color-white);
                    background-color: var(--color-secondary);
                    .wpwax-vm-btn-text{
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 0;
                    }
                }
            }
        }
        .wpwax-vm-messagebox-reply{
            display: flex;
            width: 100%;
            padding: 0 30px;
            @media only screen and (max-width: 767px){
                padding: 0 15px;
            }
            .wpwax-vm-messagebox-reply__input{
                display: flex;
                align-items: center;
                width: 100%;
                min-height: 52px;
                border-radius: 26px;
                padding: 0 30px 0 25px;
                background-color: var(--color-bg-general);
                form{
                    width: 100%;
                }
                input{
                    font-size: 18px;
                    border: 0 none;
                    padding: 0;
                    width: 100%;
                    background-color: transparent;
                    &:focus{
                        outline: none;
                        box-shadow: 0 0;
                        border: 0 none;
                    }
                }
                .wpwax-vm-audio-range{
                    position: relative;
                    display: block;
                    width: 100%;
                    min-height: 10px;
                    border-radius: 100px;
                    margin: 0 25px;
                    background-color: #C4C4C4;
                    .wpwax-vm-audio-range-inner{
                        position: absolute;
                        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                        top: 0;
                        width: 100%;
                        height: 10px;
                        display: block;
                        border-radius: 100px 0 0 100px;
                        background-color: var(--color-dark);
                    }
                }
                .wpwax-vm-timer{
                    font-size: 14px;
                    font-weight: 500;
                    color:  var(--color-dark);
                }
            }
        }
        .wpwax-vm-messagebox-reply-send{
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 52px;
            height: 52px;
            border-radius: 50%;
            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
            background-color: var(--color-primary);

			&[disabled] {
				opacity: 50%;
				pointer-events: none;
			}
        }
        .wpwax-vm-messagebox-reply-text-close{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -27px;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            text-decoration: none;
            color: var(--color-white);
            background-color: var(--color-dark);
        }
        .wpwax-vm-messagebox-reply-voice-play,
        .wpwax-vm-messagebox-reply-voice-pause{
            min-width: 24px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--color-dark);
            text-decoration: none;
            color: var(--color-dark);
            .dashicons{
                font-size: 16px;
                width: 16px;
                height: 16px;
                line-height: 1;
                position: relative;
                color: var(--color-white);
            }
        }
        .wpwax-vm-messagebox-reply-voice-pause{
            background-color: var(--color-text);
            .dashicons{
                ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
            }
        }
    }
`;

export {ChatBoxWrap, MessageBoxWrap};