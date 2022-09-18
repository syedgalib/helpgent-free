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
    width: 480px;
    z-index: 10;
    position: relative;
    word-break: break-all;
    padding-top: 0;
    font-family: var(--font-family);
    color: var(--color-text);
    @media only screen and (max-width: 1199px) {
        width: 420px;
    }
    @media only screen and (max-width: 1024px) {
        width: 360px;
    }
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
                margin-right: 6px;
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
            height: 280px;
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
            height: 250px;
            opacity: .9;
            border-radius: 0 0 25px 25px;
            background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
            content: '';
            z-index: 0;
        }
    }
    .wpwax-vm-preview-header{
        position: relative;
        .wpwax-vm-preview-title{
            font-weight: 600;
            line-height: 1.25;
            margin: 0 0 15px;
            max-width: 320px;
            font-size: var(--font-size-greet);
            color: var(--color-text-greet);
        }
        .wpwax-vm-preview-subtitle{
            font-size: 15px;
            font-weight: 500;
            line-height: 1.5;
            opacity: .8;
        }
    }
    .wpwax-vm-preview-inner{
        /* position: relative; */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 140px 0 50px;
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
        background-color: var(--color-white);
        i{
            width: 30px;
            height: 30px;
            color: var(--color-primary);
            &:before{
                font-size: 30px;
            }
        }
    }
    .wpwax-vm-preview-footer{
        position: relative;
        .wpwax-vm-preview-footer__title{
            font-size: var(--font-size-chat);
            font-weight: 600;
            color: var(--color-text-chat);
            text-align: center;
        }
        .wpwax-vm-preview-footer__actions{
            display: flex;
            flex-wrap: wrap;
            margin: -10px;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                box-sizing: border-box;
                min-height: 100px;
                height: auto;
                text-transform: capitalize;
                flex: 0 0 30.3333%;
                margin: 1.5%;
                @media only screen and (max-width: 1199px) {
                    padding: 0 15px;
                }
                >div{
                    line-height: 0;
                }
                svg{
                    width: 18px;
                    height: 18px;
                    margin-bottom: 4px;
                    path,
                    circle{
                        fill: var(--primary-btn-color);
                    }
                }
            }
        }
        .wpwax-vm-preview-footer__text{
            font-size: 13px;
            font-weight: 500;
            opacity: .8;
            margin: 18px 0 0;
            text-align: center;
        }
    }
    .wpwax-vm-preview-general{
        // width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        padding: 270px 30px;
        background-color: var(--color-dark);
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
        // width: 100%;
        border-radius: 25px;
        padding: 30px;
        background-color: var(--color-page-bg);
        &.wpwax-vm-preview-form-theme-2{
            padding: 0;
            background-color: var(--color-page-bg);
        }
    }
    .wpwax-vm-preview-from{
        &.wpwax-vm-preview-form-theme-2{
            .wpwax-vm-preview-header{
                position: relative;
                padding: 20px;
                border-radius: 25px 25px 0 0;
                z-index: 100;
                background-color: var(--color-primary);
                .wpwax-vm-preview-title{
                    font-size: var(--font-size-greet);
                    font-weight: 600;
                    margin: 0;
                    color: var(--color-text-greet);
                }
                .wpwax-vm-preview-subtitle{
                    display: block;
                    margin-top: 8px;
                }
            }
           .wpwax-vm-preview-inner{
               padding: 0;
               min-height: 220px;
               &:after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 280px;
                    opacity: .9;
                    border-radius: 25px 25px 0 0;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
                    content: '';
                    z-index: 10;
                }
                &:before{
                    position: absolute;
                    left: 0;
                    bottom: 2px;
                    width: 100%;
                    height: 250px;
                    opacity: .9;
                    border-radius: 0 0 25px 25px;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
                    content: '';
                    z-index: 10;
                }
               .wpwax-vm-btn-play{
                   position: absolute;
                   left: 50%;
                   top: 50%;
                   transform: translate(-50%,-50%);
                   z-index: 10;
               }
               .wpwax-vm-preview-img{  
                    position: relative;
                    z-index: 10; 
                    min-height: 355px;
                    background-size: cover;
                    &:before{
                        border-radius: 0px;
                        bottom: -100px;
                        z-index: -1;
                    }
                    &:after{
                        border-radius: 0px;
                        z-index: -1;
                    }
               }
               video{
                    width: 100%;
                    height: 340px;
               }
               
           }
           .wpwax-vm-preview-footer{
                position: relative;
                z-index: 10;
                border-radius: 0 0 25px 25px;
                padding: 0 30px;
                background-color: var(--color-white);
                @media only screen and (max-width: 1199px) {
                    padding: 0 15px;
                }
                .wpwax-vm-preview-footer__title{
                    font-size: var(--font-size-chat);
                    font-weight: 600;
                    margin: 14px 0 20px;
                    color: var(--color-text-chat);
                }
                .wpwax-vm-preview-footer__text{
                    font-size: 13px;
                    font-weight: 500;
                    margin-bottom: 15px;
                    color: #4D4D4D;
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
        width: 100%;
        height: 100%;
        padding: 155px 0 30px;
        border-radius: 25px;
        box-sizing: border-box;
        background-color: var(--color-white);
        @media only screen and (max-width: 1024px) {
            padding: 155px 15px 30px;
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
                color: var(--color-thank-desc);
            }
        }
        .wpwax-vm-preview-thank__botttom{
            margin-top: 200px;
            padding: 0 20px;
        }
    }
`;

export {
    GeneralSettingWrap,
    FormSettingsWrap,
    ThankSettingsWrap,
    PreviewWrap,
};

