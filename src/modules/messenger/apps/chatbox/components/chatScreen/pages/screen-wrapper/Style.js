import Styled from 'styled-components';

const ScreenWrapper = Styled.div`
    position: fixed;
    bottom: 15px;
    right: 25px;
    height: auto;
    width: 420px;
    z-index: 100;
    border-radius: 25px;
    background-color: var(--color-white);
    box-shadow: 0 3px 30px rgba(0,0,0,.10);
    animation: wpwaxVideoOpen .4s ease-in-out;
    .wpwax-vm-chatbox-text{
        .wpwax-vm-chatbox-text-form-inner{
            min-height: 580px;
            .wpwax-vm-form-group textarea.wpwax-vm-form__element{
                min-height: 400px;
            }
        }
    }
    .wpwax-vm-chatbox-contact{
        min-height: 580px;
    }
    .wpwax-vm-chatbox-container{
        height: 100%;
        position: relative;
        height: 100%;
        .wpwax-vm-chatbox-wrap{
            height: 100%;
            position: relative;
            z-index: 101;
            min-height: 620px;
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
        .wpwax-vm-chatbox-btn-close{
            position: absolute;
            right: -18px;
            top: -18px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 102;
            background-color: var(--color-dark);
            color: var(--color-white);
        }
        .wpwax-vm-chatbox-header,
        .wpwax-vm-chatbox-inner,
        .wpwax-vm-chatbox-footer{
            position: relative;
            z-index: 100
        }
    }
    .wpwax-vm-record-send-success__content {
        min-height: 300px;
    }
`;

export default ScreenWrapper;