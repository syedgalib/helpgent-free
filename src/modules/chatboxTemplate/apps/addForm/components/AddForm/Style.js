import Styled from 'styled-components';

const AddFormStyle = Styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
    .wpwax-vm-add-form{
        position: relative;
        width: 420px;
        border-radius: 14px;
        z-index: 10;
        background-color: var(--color-bg-white);
    }
    .wpwax-vm-form-group{
        margin-bottom: 16px;
        &:not(:last-child){
            padding-bottom: 20px;
            border-bottom: 1px solid var(--color-border-light);
        }
        .wpwax-vm-form-group__label{
            .wpwax-vm-btn-collapsable{
                text-decoration: none;
                color: #4D4D4D;
                &:focus{
                    outline: none;
                    box-shadow: 0 0;
                }
                &.wpwax-vm-open{
                    .dashicons-arrow-down-alt2 {
                        &:before{
                            content: '\f343';
                        }
                    }
                }
            }
        }
    }
    .wpwax-vm-add-form__tab{
        .wpwax-vm-add-form__top{
            margin: 0;
        }
        .wpwax-vm-text-highlighted {
            padding: 25px 30px 0;
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
            &.wpwax-vm-add-form__top--btn-selected{
                font-weight: 700;
                color: var(--color-white);
                background-color: var(--color-primary);
            }
        }
    }
    .wpwax-vm-add-form__content{
        padding: 15px 30px 25px;
        height: 580px;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            width: 8px;
        }
        &::-webkit-scrollbar-track{
            background-color: var(--color-white);
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 5px;
            height: 200px;
            background-color: var(--color-bg-gray);
        }
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
            margin-top: 14px;
            &.wpwax-vm-addbtn-style{
                .wpwax-vm-form-group__input-single{
                    span{
                        margin-right: 45px;
                        min-width: 70px;
                    }
                    input{
                        text-align: center;
                    }
                }
            }
            
            &.wpwax-vm-hide{
                display: none;
            }
            &.wpwax-vm-show{
                display: block;
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
            .wpwax-vm-form__input-radius{
                input{
                    max-width: 70px;
                    text-align: center;
                }
            }
        }

        .wpwax-vm-select__control{
            cursor: pointer;
        }
        
        .wpwax-vm-select__menu{
            border-radius: 10px;
            border: 0 none;
            border-radius: 10px;
            padding: 8px 15px;
            margin: 0;
            background-color: var(--color-white);
            box-shadow: 0 5px 10px rgba(0,0,0,.16);
            /* .css-1n7v3ny-option,
            .css-9gakcf-option{
                border-radius: 8px;
                background-color: var(--color-bg-gray);
                .wpwax-vm-checkbox label{
                    font-size: 13px;
                    font-weight: 400;
                    color: #4D4D4D;
                }
            } */
            .wpwax-vm-select__option{
                font-size: 14px;
                font-weight: 500;
                padding: 4px 0;
                cursor: pointer;
                color: var(--color-dark);
                &:not(:last-child){
                    margin-bottom: 8px;
                }
                .wpwax-vm-checkbox label{
                    font-size: 13px;
                    font-weight: 400;
                    color: #4D4D4D;
                }
                .wpwax-vm-checkbox{
                    label{
                        width: 100%;
                        padding: 10px 12px 7px;
                    }
                }
                &.wpwax-vm-select__option--is-focused,
                &.wpwax-vm-select__option--is-selected{
                    background-color: transparent;
                }
            }
        }
        .css-b62m3t-container{
            width: 100%;
            .wpwax-vm-select__input-container{
                input{
                    color: #898989;
                    &:focus{
                        box-shadow: 0 0;
                    }
                }
            }
        }
        .wpwax-vm-select__control{
            border: 0 none;
            background-color: var(--color-bg-general);
            .wpwax-vm-select__indicator-separator{
                display: none;
            }
        }
        .css-1pahdxg-control{
            border: 0 none;
            box-shadow: 0 0;
            background-color: var(--color-bg-general);
            &:hover{
                border: 0 none;
            }
        }
        .css-1okebmr-indicatorSeparator{
            min-width: auto;
            background-color: transparent;
        }
        .wpwax-vm-notice{
            margin-bottom: 15px;
        }
    }
    .wpwax-vm-add-form__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 14px 14px;
        padding: 12px 0;
        background-color: var(--color-primary);
        a{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 17px;
            font-weight: 600;
            min-height: 24px;
            text-decoration: none;
            color: var(--color-white);
            &:focus{
                outline: none;
                box-shadow: 0 0;
                border: 0 none;
            }
            svg{
                margin-left: 10px;
            }
        }
        button{
            font-size: 17px;
            font-weight: 600;
            border: 0 none;
            color: #fff;
            padding: 0;
            min-height: 24px;
            width: 100%;
            cursor: pointer;
            background: transparent;
        }
    }
    .wpwax-vm-preview{
        flex: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 80px;
        margin-left: -70px;
        z-index: 0;
        .wpwax-vm-preview-label{
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            margin-bottom: 22px;
            color: #7C7C7C;
            svg{
                position: relative;
                top: 3px;
                margin-right: 5px;
            }
        }
    }
    .wpwax-vm-uploader{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 210px;
        border-radius: 12px;
        border: 1px dashed #BEBEBE;
        background-color: var(--color-bg-general);
        .wpwax-vm-upload-trigger{
            a{
                color: var(--color-dark);
            }
        }
        .wpwax-vm-media-btn{
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
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
        a{
            text-decoration: none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
    }
    .wpwax-vm-media-preview{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background-color: var(--color-bg-general);
        z-index: 10;
        .wpwax-vm-media-preview__replace{
            position: absolute;
            left: 50%;
            bottom: 15px;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            min-height: 40px;
            padding: 0 20px;
            color: var(--color-dark);
            background-color: var(--color-white);
            .wpwax-vm-media-preview__replace--icon{
                position: relative;
                top: 2px;
                margin-right: 8px;
            }
        }
        .wpwax-vm-media-preview__src{
            height: 100%;
            img{
                width: 100%;
                height: 100%;
                border-radius: 12px;
            }
        }
    }
`;

export {
    AddFormStyle,
};

