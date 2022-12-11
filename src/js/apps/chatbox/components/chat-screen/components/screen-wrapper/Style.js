import Styled from 'styled-components';

const ScreenWrapper = Styled.div`
    position: fixed;
    bottom: 20px;
    ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 20px;
    height: auto;
    width: 400px;
    z-index: 100;
    border-radius: 25px;
    font-family: var(--font-family);
    box-shadow: 0 3px 30px rgba(0,0,0,.10);
    background-color: var(--color-white);
    animation: wpwaxVideoOpen .4s ease-in-out;
    &.helpgent-static-container{
        position: static;
        margin: 0 auto;
        animation: none;
        .wpwax-vm-chatbox-container{
            .wpwax-vm-chatbox-btn-close{
                display: none;
            }
        }
        .wpwax-hg-btn-minimize{
            display: none;
        }
    }
    &.wpwax-vm-chatbox-screen-home{
        width: 430px;
        @media only screen and (max-width: 1399px){
            width: 400px;
        }
        @media only screen and (max-width: 767px){
            width: 350px;
        }
        @media only screen and (max-width: 575px){
            width: 345px;
        }
        @media only screen and (max-width: 379px){
            width: 320px;
        }
    }
    @media only screen and (max-width: 767px){
        width: 350px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 15px;
    }
    @media only screen and (max-width: 575px){
        width: 345px;
    }
    @media only screen and (max-width: 379px){
        width: 320px;
    }
    .wpwax-vm-chatbox-text{
        position: relative;
        padding: 80px 25px 25px;
        background-color: var(--color-white);
        border-radius: 25px;
        @media only screen and (max-width: 767px){
            padding: 70px 25px 25px;
        }
        .wpwax-vm-btn-back{
            position: absolute;
            left: 15px;
            top: 15px;
            @media only screen and (max-width: 767px){
                left: 15px;
                top: 15px;
            }
        }
        .wpwax-vm-chatbox-text-form-inner{
            /* min-height: 580px; */
            height: min(70vh, 520px);
            input{
                font-family: var(--font-family);
                &::placeholder{
                    font-family: var(--font-family);
                }
            }
            .wpwax-vm-form-group{
                align-items: stretch;
                flex: 1;
            }
            .wpwax-vm-form-group textarea.wpwax-vm-form__element{
                font-size: 16px;
                line-height: 1.75;
                font-family: var(--font-family);
                align-items: stretch;
                flex: 1;
                height: 100%;
                padding: 0 5px;
            }
            .wpwax-vm-btn-block{
                width: 100%;
                font-family: var(--font-family);
                text-transform: capitalize;
                &:focus,
                &:hover{
                    outline: none;
                    text-decoration: none;
                }
            }
        }
    }
    .wpwax-vm-chatbox-contact{
        height: min(80vh,570px);
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
            height: min(80vh,620px);
            &:after,
            &:before{
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                top: 0px;
                width: 100%;
                height: 336px;
                content: '';
                opacity: .9;
                z-index: 10;
                border-radius: 20px;
                background-image: linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0));
            }
            &:after{
                border-radius: 20px;
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
            ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: -18px;
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
            @media only screen and (max-width: 767px){
                width: 30px;
                height: 30px;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: -10px;
                top: -10px;
            }
            @media only screen and (max-width: 575px){
                width: 32px;
                height: 32px;
                ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: -12px;
                top: -12px;
            }
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
        height: min(80vh,620px);
        background-color: var(--color-thank-page-bg);
        h4{
            font-family: var(--font-family);
        }
    }
    .wpwax-vm-record-send-success__content {
        font-family: var(--font-family);
        font-size: var(--font-size);
        .wpwax-vm-record-send-success__content-inner{
            max-height: 205px;
            @media only screen and (max-width: 1299px) {
                max-height: 220px;
            }
        }
        .wpwax-vm-text-color{
            font-size: var(--font-size-thank-desc);
            color: var(--color-thank-desc);
        }
        p{
            margin: 0;
            word-break: break-word;
            font-family: var(--font-family);
        }
    }

    .wpwax-vm-record-send-success__bottom{
        padding-top: 0;
        a{
            font-family: var(--font-family);
        }
    }
`;

export default ScreenWrapper;