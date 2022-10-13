import Styled from 'styled-components';

const ScreenWrapper = Styled.div`
    position: fixed;
    bottom: 15px;
    right: 25px;
    height: auto;
    width: 420px;
    z-index: 100;
    border-radius: 25px;
    font-family: var(--font-family);
    background-color: var(--color-white);
    box-shadow: 0 3px 30px rgba(0,0,0,.10);
    animation: wpwaxVideoOpen .4s ease-in-out;
    @media only screen and (max-width: 575px){
        width: 380px;
        right: 15px;
    }
    @media only screen and (max-width: 379px){
        width: 345px;
    }
    .wpwax-vm-chatbox-text{
        .wpwax-vm-chatbox-text-form-inner{
            min-height: 580px;
            input{
                font-family: var(--font-family);
            }
            .wpwax-vm-form-group textarea.wpwax-vm-form__element{
                min-height: 300px;
            }
            .wpwax-vm-btn-block{
                width: 100%;
            }
        }
    }
    .wpwax-vm-chatbox-contact{
        min-height: 580px;
        font-family: var(--font-family);
        
        .wpwax-vm-footer{
            button{
                font-family: var(--font-family);
            }
            .wpwax-vm-btn-block{
                width: 100%;
                &:not(:hover):not(:active):not(.has-text-color){
                    color: var(--color-white);
                }
            }
        }
        .wpwax-vm-form-group{
            .wpwax-vm-form__element{
                min-height: 46px;
            }
        }
        .wpwax-vm-footer{
            margin-top: 40px;
        }
    }
    .wpwax-vm-chatbox-container{
        height: 100%;
        position: relative;
        font-size: 18px;
        height: 100%;
        .wpwax-vm-chatbox-wrap{
            height: 100%;
            position: relative;
            z-index: 101;
            min-height: 620px;
            @media only screen and (max-width: 1399px){
                min-height: 580px;
            }
            &:after,
            &:before{
                position: absolute;
                left: 0;
                top: 0px;
                width: 100%;
                height: 336px;
                content: '';
                opacity: .9;
                z-index: 10;
                border-radius: 25px;
                background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
            }
            &:after{
                top: -2px;
            }
            &:before{
                top: auto;
                bottom: 0;
                height: 340px;
                background-image: linear-gradient(to top, rgba(0,0,0,1) , rgba(0,0,0,0));
            }
        }
        .wpwax-vm-chatbox-btnlist{
            .wpwax-vm-chatbox-btn-close{
                svg{
                    width: 10px;
                    height: 10px;
                }
            }
        }
        .wpwax-vm-chatbox-btn-close{
            position: absolute;
            right: -18px;
            top: -18px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            padding: 0;
            border-radius: 50%;
            cursor: pointer;
            z-index: 102;
            border-color: transparent;
            transition: background-color .3s ease-in-out;
            background-color: var(--color-dark);
            color: var(--color-white);
            &:hover{
                background-color: var(--color-danger);
            }
            svg{
                width: 16px;
                height: 16px;
            }
        }
        .wpwax-vm-chatbox-header,
        .wpwax-vm-chatbox-inner,
        .wpwax-vm-chatbox-footer{
            position: relative;
            z-index: 100
        }
        .wpwax-vm-btn-block{
            width: auto;
        }
    }
    .wpwax-vm-record-send-success{
        font-family: var(--font-family);
        border-radius: 25px;
        background-color: var(--color-thank-page-bg);
        h4{
            font-family: var(--font-family);
        }
    }
    .wpwax-vm-record-send-success__content {
        min-height: 300px;
        font-family: var(--font-family);
        font-size: var(--font-size);
        .wpwax-vm-text-color{
            font-size: var(--font-size-thank-desc);
            color: var(--color-thank-desc);
        }
        p{
            margin: 0;
            font-family: var(--font-family);
        }
    }

    .wpwax-vm-record-send-success__bottom{
        a{
            font-family: var(--font-family);
        }
    }
`;

export default ScreenWrapper;