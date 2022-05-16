import Styled from 'styled-components';

const GeneralSettingWrap = Styled.div`
    
`;
const FormSettings = Styled.div`
    
`;
const ThankSettingWrap = Styled.div`
    
`;
const PreviewWrap = Styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 420px;
    min-height: 620px;
    border-radius: 25px;
    padding: 30px;
    z-index: 10;
    color: var(--color-white);
    background-color: var(--color-dark);
    .wpwax-vm-preview-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .wpwax-vm-preview-header{
        .wpwax-vm-preview-title{
            font-size: 24px;
            font-weight: 600;
            line-height: 1.25;
            color: #ffffff;
            margin-bottom: 15px;
            max-width: 320px;
        }
        .wpwax-vm-preview-subtitle{
            font-size: 15px;
            font-weight: 500;
            opacity: .8;
        }
    }
    .wpwax-vm-preview-inner{
        display: flex;
        justify-content: center;
        align-items: center;
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
        .wpwax-vm-preview-footer__title{
            font-size: 18px;
            font-weight: 600;
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
                box-sizing: border-box;
                flex: 0 0 48%;
                margin: 1%;
            }
        }
        .wpwax-vm-preview-footer__text{
            font-size: 13px;
            font-weight: 500;
            opacity: .8;
            margin-top: 15px;
            text-align: center;
        }
    }
`;

export {
    GeneralSettingWrap,
    FormSettings,
    ThankSettingWrap,
    PreviewWrap,
};