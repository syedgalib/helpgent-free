import Styled from 'styled-components';

const ChatboxForm = Styled.div`
    .wpwax-vm-chatbox-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        background-size: cover;
        z-index: -1;
    }
    .wpwax-vm-chatbox-header{
        padding: 25px;
        .wpwax-vm-chatbox-header__top{
            text-align: right;
        }
        .wpwax-vm-chatbox-title{
            font-size: 15px;
            font-weight: 600;
            line-height: 1.25;
            color: #ffffff;
            margin-bottom: 15px;
            max-width: 320px;
        }
        .wpwax-vm-chatbox-subtitle{
            font-size: 15px;
            font-weight: 500;
            opacity: .8;
        }
    }
    .wpwax-vm-chatbox-inner{
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
    .wpwax-vm-chatbox-footer{
        .wpwax-vm-chatbox-footer__title{
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }
        .wpwax-vm-chatbox-footer__actions{
            display: flex;
            flex-wrap: wrap;
            padding: 0 25px;
            margin: -10px;
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                min-height: 46px;
                flex: 0 0 48%;
                margin: 1%;
            }
        }
        .wpwax-vm-chatbox-footer__text{
            font-size: 13px;
            font-weight: 500;
            opacity: .8;
            margin: 15px 0 0;
            text-align: center;
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
                color: var(--color-white);
            }
        }
    }
    
    &.wpwax-vm-chatbox-form-theme-2{
        .wpwax-vm-chatbox-header{
            padding: 20px;
            border-radius: 25px 25px 0 0;
            background-color: var(--color-primary);
            .wpwax-vm-chatbox-title{
                font-size: 15px;
                font-weight: 600;
                margin: 0;
            }
        }
        .wpwax-vm-chatbox-inner{
            position: relative;
            display: block;
            padding: 0;
            .wpwax-vm-chatbox-img{
                position: relative;
                z-index: 10;
                &:after{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 280px;
                    opacity: .9;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
                    content: '';
                    z-index: -1;
                }
                &:before{
                    position: absolute;
                    left: 0;
                    bottom: -100px;
                    width: 100%;
                    height: 250px;
                    opacity: .9;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1));
                    content: '';
                    z-index: -1;
                }
            }
            .wpwax-vm-btn-play{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                z-index: 10;
            }
            .wpwax-vm-chatbox-img{   
                min-height: 355px;
                background-size: cover;
            }
        }
        .wpwax-vm-chatbox-footer{
            position: relative;
            z-index: 10;
            border-radius: 0 0 25px 25px;
            padding: 0 30px;
            background-color: var(--color-white);
            .wpwax-vm-chatbox-footer__title{
                font-size: 15px;
                font-weight: 600;
                margin: 14px 0 20px;
                color: var(--color-dark);
            }
            .wpwax-vm-chatbox-footer__text{
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 15px;
                color: var(--color-text);
            }
        }
    }
`;

export default ChatboxForm;