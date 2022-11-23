import Styled from 'styled-components';

const GeneralSettingWrap = Styled.div`
    
`;
const FormSettingsWrap = Styled.div`
    
`;
const ThankSettingsWrap = Styled.div`
    .wpwax-vm-chekbox-list{
        .wpwax-vm-chekbox-single{
            span{
                text-transform: capitalize;
            }
        }
    }
`;
const PreviewWrap = Styled.div`
    z-index: 10;
    position: relative;
    word-break: break-all;
    padding-top: 0;
    font-family: var(--font-family);
    color: var(--color-text);
    
    &.wpwax-vm-loder-active{
        &:after{
            border-radius: 25px;
        }
    }
    .wpwax-vm-loading-spin{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 100;
    }
    .wpwax-vm-media-preview{
        position: absolute;
        left: -90%;
        top: -160px;
        height: 210px;
        &:after{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .50);
            z-index: 0;
            border-radius: 12px;
            content: '';
        }
        .wpwax-vm-media-preview__replace{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 15px;
            z-index: 10;
            svg{
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 6px;
            }
        }
    }
    .wpwax-vm-preview-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        img{
            width: 100%;
            height: 100%;
            border-radius: 25px;
            object-fit: cover;
        }
    }
    .wpwax-vm-preview-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        img{
            width: 100%;
            height: 100%;
            border-radius: 25px;
            object-fit: cover;
        }
        video{
            width: 100%;
            height: 100%;
            border-radius: 25px;
            object-fit: cover;
        }
        &:after{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 360px;
            opacity: .9;
            border-radius: 25px 25px 0 0;
            background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
            content: '';
            z-index: 0;
        }
        &:before{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 340px;
            opacity: .9;
            border-radius: 0 0 25px 25px;
            background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
            content: '';
            z-index: 0;
        }
    }
    .wpwax-vm-preview-header{
        position: relative;
        padding: 25px 25px 0;
        .wpwax-vm-chatbox-header__top{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .wpwax-vm-timer{
                margin-right: 20px;
            }
            span{
                font-size: 14px;
                font-weight: 600;
                color: var(--color-white);
            }
            .wpwax-vm-fulscreen-trigger{
                line-height: 1;
            }
        }
        .wpwax-vm-preview-title{
            font-weight: 600;
            line-height: 1.25;
            margin: 15px 0 15px;
            word-break: break-word;
            font-size: var(--font-size-greet);
            color: var(--color-text-greet);
        }
        .wpwax-vm-preview-description{
            font-size: 15px;
            font-weight: 500;
            line-height: 1.5;
            word-break: break-word;
            color: var(--color-description);
        }
    }
    .wpwax-vm-preview-inner{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 80px 0 55px;
        @media only screen and (max-width: 1199px) {
            padding: 70px 0 45px;
        }
    }
    .wpwax-vm-btn-play{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
        text-decoration: none;
        opacity: 0;
        visibility: visible;
        z-index: -1;
        background-color: var(--play-button-bg);
        i,
        svg{
            width: 26px;
            height: 26px;
            color: var(--color-primary);
            fill: var(--color-primary);
            &:before{
                font-size: 30px;
            }
        }
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
        svg.wpwax-vm-play{
            margin-left: 3px;
        }
    }
    .wpwax-vm-preview-footer{
        position: relative;
        .wpwax-vm-preview-footer__title{
            font-size: var(--font-size-chat);
            font-weight: 600;
            color: var(--color-text-chat);
            padding: 0 25px;
            word-break: break-word;
            text-align: center;
        }
        .wpwax-vm-preview-footer__actions{
            display: flex;
            padding: 0 25px;
            margin: -10px;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                box-sizing: border-box;
                white-space: nowrap;
                height: min(80vh,90px);
                text-transform: capitalize;
                width: 90px;
                flex-basis: 90px;
                flex-grow: 1;
                margin: 5px;
                pointer-events: none;
                white-space: nowrap;
                @media only screen and (max-width: 1199px) {
                    padding: 0 15px;
                    width: 95px;
                    flex-basis: 95px;
                    height: min(80vh,80px);
                }
                @media only screen and (max-width: 575px) {
                    height: min(80vh,60px);
                }
                >div{
                    line-height: 0;
                }
                svg{
                    width: 18px;
                    height: 18px;
                    margin: 6px 0 6px;
                    path,
                    circle{
                        fill: var(--primary-button-color);
                    }
                }
                span{
                    @media only screen and (max-width: 760px) {
                        display: none;
                    }
                }
            }
        }
        .wpwax-vm-preview-footer__text{
            font-size: var(--footer-text-font-size);
            font-weight: 500;
            padding: 0 25px;
            margin: 18px 0 10px;
            min-height: 20px;
            opacity: .8;
            text-align: center;
            word-break: break-word;
            color: var(--color-footer-text);
        }
        .wpwax-vm-chatbox-footer__bottom{
            margin: 0;
            font-size: 12px;
            font-weight: 500;
            padding: 8px;
            text-align: center;
            border-radius: 0 0 25px 25px;
            background-color: #4537A5;
            color: rgba(255,255,255,.80);
            a{
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                color: var(--color-white);
            }
        }
    }
    .wpwax-vm-preview-general{
        width: 370px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        padding: 270px 30px;
        background-color: var(--color-dark);
        @media only screen and (max-width: 1399px) {
            width: 370px;
            padding: 240px 30px;
        }
        @media only screen and (max-width: 1199px) {
            padding: 220px 30px;
            width: 320px;
        }
        @media only screen and (max-width: 991px) {
            width: 290px;
        }
        @media only screen and (max-width: 475px) {
            max-height: 480px;
            width: 280px;
        }
        @media only screen and (max-width: 375px) {
            max-height: 380px;
            width: 240px;
        }
        p{
            font-size: 20px;
            font-weight: 500;
            opacity: .4;
        }
    }
    .wpwax-vm-preview-from{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 430px;
        min-height: 560px;
        border-radius: 25px;
        font-size: 18px;
        background-color: var(--color-page-bg);
        &:hover{
            .wpwax-vm-btn-play{
                opacity: 1;
                visibility: visible;
                z-index: 10;
            }
        }
        &.wpwax-vm-preview-form-theme-2{
            padding: 0;
            width: 430px;
            background-color: var(--color-page-bg);
            @media only screen and (max-width: 1199px) {
                width: 370px
            }
            @media only screen and (max-width: 991px) {
                width: 350px;
            }
            @media only screen and (max-width: 575px) {
                width: 320px;
            }
            @media only screen and (max-width: 760px) {
                width: 370px;
            }
            @media only screen and (max-width: 475px) {
                width: 320px;
            }
            @media only screen and (max-width: 360px) {
                width: 300px;
            }
        }
        @media only screen and (max-width: 1399px) {
            font-size: 16px;
            min-height: 480px;
        }
        @media only screen and (max-width: 1199px) {
            width: 370px
        }
        @media only screen and (max-width: 1024px) {
            width: 350px;
            font-size: 14px;
            min-height: 480px;
        }
        @media only screen and (max-width: 991px) {
            width: 320px;
        }
        @media only screen and (max-width: 760px) {
            width: 380px;
        }
        @media only screen and (max-width: 575px) {
            width: 320px;
            padding: 20px;
        }
        @media only screen and (max-width: 475px) {
            width: 280px;
        }
        @media only screen and (max-width: 360px) {
            width: 260px;
        }
    }
    .wpwax-vm-preview-from{
        &.wpwax-vm-preview-form-theme-2{
            /* min-height: 620px; */
            .wpwax-vm-preview-header{
                position: relative;
                padding: 20px;
                border-radius: 25px 25px 0 0;
                z-index: 100;
                background-color: var(--color-page-header-bg);
                .wpwax-vm-preview-title{
                    font-size: var(--font-size-greet);
                    font-weight: 600;
                    margin: 0;
                    word-break: break-word;
                    color: var(--color-text-greet);
                }
                .wpwax-vm-preview-description{
                    display: block;
                    margin-top: 8px;
                    word-break: break-word;
                }
            }
           .wpwax-vm-preview-inner{
                position: relative;
                padding: 0;
                min-height: 290px;
                @media only screen and (max-width: 1199px) {
                    min-height: 250px;
                }
                &:after{
                    position: absolute;
                    left: 0;
                    top: -100px;
                    width: 100%;
                    height: 280px;
                    opacity: .9;
                    border-radius: 25px 25px 0 0;
                    background: -moz-linear-gradient(top,  rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
                    background: -webkit-linear-gradient(top,  rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
                    background: linear-gradient(to bottom,  rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 );
                    content: '';
                    z-index: 10;
                }
                &:before{
                    position: absolute;
                    left: 0;
                    bottom: -200px;
                    width: 100%;
                    height: 320px;
                    opacity: .9;
                    border-radius: 0 0 25px 25px;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
                    content: '';
                    z-index: 10;
                }
                .wpwax-vm-chatbox-inner-action{
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                    z-index: 101;
                    span.wpwax-vm-timer{
                        display: block;
                        margin-right: 20px;
                        color: var(--color-white);
                    }
                    span{
                        font-size: 13px;
                        font-weight: 600;
                    }
                    .wpwax-vm-fulscreen-trigger{
                        line-height: 1;
                    }
                }
                .wpwax-vm-chatbox-video{
                    position: relative;
                    height: 300px;
                    overflow: hidden;
                }
               .wpwax-vm-btn-play{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    z-index: 100;
                    svg.wpwax-vm-play{
                        margin-left: 3px;
                    }
               }
               .wpwax-vm-preview-img{  
                    position: relative;
                    z-index: 10;
                    min-height: 290px;
                    background-size: cover;
                    &:before,
                    &:after{
                        display: none
                    }
               }
               video{
                    width: 100%;
                    height: 300px;
               }
               
           }
           .wpwax-vm-preview-footer{
                position: relative;
                z-index: 10;
                border-radius: 0 0 25px 25px;
                min-height: 185px;
                background-color: var(--color-page-bg);
                .wpwax-vm-preview-footer__title{
                    font-size: var(--font-size-chat);
                    font-weight: 600;
                    margin: 14px 0 20px;
                    padding: 0 25px;
                    word-break: break-word;
                    color: var(--color-text-chat);
                }
                .wpwax-vm-preview-footer__text{
                    font-size: var(--footer-text-font-size);
                    font-weight: 500;
                    margin-bottom: 15px;
                    opacity: .8;
                    word-break: break-word;
                    color: var(--color-footer-text);
                }
           }
           .wpwax-vmpreview-video{
                position: relative;
                z-index: 10;
                &:after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background-color: rgba(3,3,8,.30);
                }
            }
        }
    }
    .wpwax-vm-preview-thank{
        display: flex; 
        flex-direction: column;
        font-size: 18px;
        width: 100%;
        height: 100%;
        padding: 120px 30px 30px;
        border-radius: 25px;
        box-sizing: border-box;
        width: 430px;
        height: min(80vh, 560px);
        background-color: var(--color-thank-page-bg);
        @media only screen and (max-width: 1399px) {
            width: 400px;
            padding: 75px 30px 30px;
        }
        @media only screen and (max-width: 1199px) {
            width: 400px;
            padding: 100px 20px 20px;
        }
        @media only screen and (max-width: 991px) {
            width: 360px;
        }
        @media only screen and (max-width: 760px) {
            width: 400px;
        }
        @media only screen and (max-width: 479px) {
            width: 350px;
        }
        @media only screen and (max-width: 375px) {
            width: 300px;
        }
        .wpwax-vm-preview-thank__content{
            text-align: center;
            max-width: 370px;
            margin: 0 auto;
            h3{
                font-size: var(--font-size-thank-title);
                font-weight: 600;
                line-height: 1.07;
                color: var(--color-thank-title);
            }
            p{
                font-size: var(--font-size-thank-desc);
                font-weight: 500;
                line-height: 1.625;
                word-break: break-word;
                color: var(--color-thank-desc);
            }
        }
        .wpwax-vm-preview-thank__botttom{
            margin-top: auto;
            padding: 0;
        }
    }
`;

export {
    GeneralSettingWrap,
    FormSettingsWrap,
    ThankSettingsWrap,
    PreviewWrap,
};

