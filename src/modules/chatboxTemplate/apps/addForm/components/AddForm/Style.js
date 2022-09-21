import Styled from 'styled-components';

const AddFormStyle = Styled.div`
    display: flex;
    align-items: flex-start;
    color: #4D4D4D;
    margin-top: 30px;
    .wpwax-vm-add-form{
        position: relative;
        width: 420px;
        min-height: 720px;
        border-radius: 14px;
        z-index: 10;
        background-color: #fff;
        @media only screen and (max-width: 1199px) {
            width: 380px;
        }
        @media only screen and (max-width: 1024px) {
            width: 320px;
        }
        @media only screen and (max-width: 760px) {
            width: 420px;
        }
        @media only screen and (max-width: 479px) {
            width: 380px;
        }
        @media only screen and (max-width: 375px) {
            width: 340px;
        }
        .wpwax-vm-loading-spin{
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 100;
        }
        &.wpwax-vm-loder-active{
            &:after{
                border-radius: 14px;
            }
        }
    }
    .wpwax-vm-form-group{
        margin-bottom: 16px;
        &:not(:last-child){
            padding-bottom: 20px;
            border-bottom: 1px solid #ededed;
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
        padding-bottom: 15px;
        border-radius: 14px 14px 0 0;
        background-color: var(--color-white);
        .wpwax-vm-add-form__top{
            margin: 0;
        }
        .wpwax-vm-text-highlighted {
            padding: 25px 30px 15px;
        }
        .wpwax-vm-notice{
            margin: 20px 30px 5px;
        }
    }
    .wpwax-vm-add-form__top{
        padding: 20px;
        border-radius: 14px 14px 0 0;
        background-color: #e2e2e2;
        @media only screen and (max-width: 991px) {
            text-align: center;
        }
        @media only screen and (max-width: 960px) {
            text-align: left;
        }
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
            color: #000;
            &:focus{
                outline: 0 none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-add-form__top--btn-selected{
                font-weight: 700;
                color: #fff;
                background-color: #6551f2;
            }
        }
        .wpwax-vm-add-form__top--btn[disabled]{
            opacity: .5;
            cursor: not-allowed;
        }
    }
    .wpwax-vm-add-form__content{
        padding: 15px 30px 20px;
        height: 555px;
        overflow-y: scroll;
        @media only screen and (max-width: 1024px) {
            padding: 15px 15px 25px;
        }
        &::-webkit-scrollbar{
            width: 8px;
        }
        &::-webkit-scrollbar-track{
            background-color: #fff;
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 5px;
            height: 200px;
            background-color: #e2e2e2;
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
                    color: #030308;
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
            font-size: 14px;
            &:not(:last-child){
                margin-bottom: 20px;
            }
            span{
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                margin-right: 15px;
                min-width: 130px;
                color: #030308;
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
            background-color: #fff;
            box-shadow: 0 5px 10px rgba(0,0,0,.16);
            
            .wpwax-vm-select__option{
                font-size: 14px;
                font-weight: 500;
                padding: 4px 0;
                cursor: pointer;
                color: #000;
                &:not(:last-child){
                    margin-bottom: 8px;
                }
                .wpwax-vm-checkbox label{
                    font-size: 13px;
                    font-weight: 400;
                    color: #4D4D4D;
                }
                .wpwax-vm-checkbox{
                    align-items: center;
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
            border-radius: 6px;
            background-color: #ededed;
            .wpwax-vm-select__indicator-separator{
                display: none;
            }
            .wpwax-vm-select__value-container{
                padding: 2px 8px 2px 12px;
            }
            .wpwax-vm-select__indicator{
                padding: 8px 10px 8px 8px;
            }
        }
        .wpwax-vm-select__single-value{
            font-size: 14px;
            font-weight: 500;
            color: #4D4D4D;
        }
        .css-1pahdxg-control{
            border: 0 none;
            box-shadow: 0 0;
            background-color: #ededed;
            &:hover{
                border: 0 none;
            }
        }
        .css-1okebmr-indicatorSeparator{
            min-width: auto;
            background-color: transparent;
        }
        .wpwax-vm-notice{
            margin: 0 0 15px;
        }
    }
    .wpwax-vm-add-form__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 14px 14px;
        padding: 12px 0;
        background-color: #6551f2;
        a{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 17px;
            font-weight: 600;
            min-height: 24px;
            text-decoration: none;
            color: #ffffff;
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
        @media only screen and (max-width: 1299px) {
            margin-left: 0px;
        }
        @media only screen and (max-width: 760px) {
            display: none;
        }
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
        background-color: #ededed;
        .wpwax-vm-upload-trigger{
            a{
                color: #000000;
            }
        }
        .wpwax-vm-media-btn{
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            text-align: center;
            color: #000000;
            background-color: #ffffff;
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
        &.wpax-vm-has-src{
            border: 0 none;
            min-height: 200px;
        }
    }
    .wpwax-vm-media-preview{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background-color: #ededed;
        z-index: 10;
        .wpwax-vm-media-preview__replace{
            position: absolute;
            left: 50%;
            bottom: 15px;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            min-height: 40px;
            padding: 0 20px;
            color: #000000;
            background-color: #ffffff;
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
            video{
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 12px;
            }
        }
    }
`;

export {
    AddFormStyle,
};

