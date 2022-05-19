import Styled from 'styled-components';

const AddFormStyle = Styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    .wpwax-vm-add-form{
        width: 420px;
        border-radius: 14px;
        background-color: var(--color-bg-white);
    }
    .wpwax-vm-form-group{
        &:not(:last-child){
            border-bottom: 1px solid var(--color-border-light);
        }
    }
    .wpwax-vm-add-form__tab{
        .wpwax-vm-add-form__top{
            margin: 0;
        }
    }
    .wpwax-vm-add-form__top{
        padding: 20px;
        border-radius: 14px 14px 0 0;
        background-color: var(--color-bg-gray);
        .wpwax-vm-add-form__top--btn{
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            min-height: 36px;
            padding: 0 16px;
            text-decoration: none;
            border-radius: 8px;
            cursor: pointer;
            color: var(--color-dark);
            &:focus{
                outline: 0 none;
                box-shadow: 0 0;
            }
            &.react-tabs__tab--selected{
                font-weight: 700;
                color: var(--color-white);
                background-color: var(--color-primary);
            }
        }
    }
    .wpwax-vm-add-form__content{
        padding: 25px 30px;
        .wpwax-vm-switch-list,
        .wpwax-vm-chekbox-list,
        .wpwax-vm-radio-list{
            margin-top: 18px;
            .wpwax-vm-switch-single,
            .wpwax-vm-chekbox-single,
            .wpwax-vm-radio-single{
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:not(:last-child){
                    margin-bottom: 20px;
                }
                span{
                    font-size: 14px;
                    font-weight: 500;
                    position: relative;
                    top: -2px;
                    line-height: 1;
                    color: var(--color-dark);
                }
            }
        }
        .wpwax-vm-form-group__input-list {
            &.wpwax-vm-addbtn-style{
                .wpwax-vm-form-group__input-single{
                    span{
                        margin-right: 45px;
                    }
                }
            }
        }
        .wpwax-vm-form-group__input-single{
            display: flex;
            justify-content: space-between;
            &:not(:last-child){
                margin-bottom: 20px;
            }
            span{
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                margin-right: 15px;
                min-width: 130px;
                color: var(--color-dark);
            }
            .wpwax-vm-form__element{
                flex: 1;
            }
            .css-1okebmr-indicatorSeparator{
                background-color: transparent;
            }
        }
        .wpwax-vm-form__color-plate{
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            flex: 1;
            height: 40px;
            border-radius: 6px;
            background-color: var(--color-bg-gray);
            .wpwax-vm-form__color-text{
                padding-left: 15px;
                margin: 0;
            }
            input[type="color"]{
                flex: none;
                appearance: none;
                padding: 0;
                width: 26px;
                min-height: 26px;
                margin-right: 15px;
                border-radius: 50%;
                opacity: 0;
                cursor: pointer;
                &::-webkit-color-swatch-wrapper{
                    padding: 0;
                }
                &::-webkit-color-swatch{
                    border: none
                }
            }
            .wpwax-vm-form__color-ball{
                position: absolute;
                right: 12px;
                top: 6px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
            }
            .block-picker{
                position: absolute !important;
                left: 5px;
                top: 50px;
                z-index: 10;
            }
        }
    }
    .wpwax-vm-add-form__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 14px 14px;
        padding: 16px 0;
        background-color: var(--color-primary);
        .wpwax-vm-form-save{
            display: flex;
            justify-content: center;
            width: 100%;
            font-size: 17px;
            font-weight: 600;
            text-decoration: none;
            color: var(--color-white);
        }
    }
    .wpwax-vm-preview{
        flex: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 160px;
        .wpwax-vm-preview-label{
            font-size: 14px;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 22px;
            color: #7C7C7C;
        }
    }
    .wpwax-vm-uploader{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 210px;
        border-radius: 12px;
        border: 1px dashed #BEBEBE;
        background-color: var(--color-bg-general);
        .wpwax-vm-upload-trigger{
            input[type=file]{
                display: none;
            }
        }
        .wpwax-vm-media-btn{
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            min-width: 155px;
            text-align: center;
            color: var(--color-dark);
            background-color: var(--color-white);
        }
        .wpwax-vm-seperation{
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #898989;
            margin: 7px 0;
        }
    }
`;

export {
    AddFormStyle,
};