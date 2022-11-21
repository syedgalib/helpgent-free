import Styled from 'styled-components';

const AddFormStyle = Styled.div`
    display: flex;
    align-items: flex-start;
    color: #4D4D4D;
    margin-top: 30px;
    @media only screen and (max-width: 760px) {
        flex-direction: column;
        align-items: center
    }
    .wpwax-vm-add-form{
        position: relative;
        width: 420px;
        min-height: 660px;
        border-radius: 14px;
        font-family: 'Inter';
        background-color: #fff;
        @media only screen and (max-width: 1199px) {
            width: 380px;
            min-height: 600px;
        }
        @media only screen and (max-width: 1024px) {
            width: 320px;
        }
        @media only screen and (max-width: 760px) {
            width: 420px;
            z-index: 10;
        }
        @media only screen and (max-width: 479px) {
            width: 360px;
        }
        @media only screen and (max-width: 375px) {
            width: 340px;
        }
        @media only screen and (max-width: 350px) {
            width: 300px;
        }
        .wpwax-vm-loading-spin{
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 100;
        }
        &.wpwax-vm-loder-active{
            &:after{
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 14px;
            }
        }
        .wpwax-vm-form-group .wpwax-vm-form__element:not(:last-child){
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .wpwax-vm-add-form__tab{
            .wpwax-vm-notice{
                display: block;
                /* position: absolute;
                left: 0;
                top: 0; */
                /* height: 675px; */
                bottom: -14px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 0px;
                line-height: 1.5;
                margin: 0;
                padding: 20px 30px;
                text-align: center;
                z-index: 101;
                color: var(--color-dark);
                &.wpwax-vm-notice-success{
                    background-color: rgba(32,201,151,.15);
                }
                .wpwax-vm-notice-close{
                    position: absolute;
                    top: 12px;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'right' : 'left')}: 10px;
                    text-decoration: none;
                    margin: 0;
                    line-height: 1;
                    span{
                        font-size: 18px;
                        color: var(--color-danger);
                    }
                }
                a{
                    color: rgba(32,201,151,1);
                    font-weight: 600;
                    margin: 0 4px;
                }
            }
        }
    }
    .wpwax-vm-form-group{
        margin-bottom: 16px;
        flex-direction: column;
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
        @media only screen and (max-width: 1199px) {
            padding: 14px;
        }
        @media only screen and (max-width: 991px) {
            text-align: center;
        }
        @media only screen and (max-width: 960px) {
            text-align: left;
        }
        @media only screen and (max-width: 760px) {
            text-align: center;
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
            @media only screen and (max-width: 1199px) {
                font-size: 13px;
                padding: 0 8px;
            }
            @media only screen and (max-width: 767px) {
                padding: 0 16px;
            }
            &:focus{
                outline: 0 none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-add-form__top--btn-selected{
                font-weight: 700;
                color: #fff;
                transition: background-color .3s ease-in-out;
                background-color: #6551f2;
                &:hover{
                    background-color: #3e2bc5;
                }
            }
        }
        .wpwax-vm-add-form__top--btn[disabled]{
            opacity: .5;
            cursor: not-allowed;
        }
    }
    .wpwax-vm-add-form__content{
        padding: 22px 30px 20px;
        height: 555px;
        overflow-y: scroll;
        @media only screen and (max-width: 1399px) {
            height: 480px;
        }
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

        .wpwax-vm-form-group__input-list {
            margin-top: 14px;
            &.wpwax-vm-addbtn-style{
                .wpwax-vm-form-group__input-single{
                    span,
                    >label{
                        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 45px;
                        min-width: 70px;
                        @media only screen and (max-width: 1199px) {
                            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 10px;
                        }
                    }
                    input{
                        min-width: 208px;
                        text-align: center;
                        @media only screen and (max-width: 1199px) {
                            min-width: 168px;
                        }
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
            span,
            >label{
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 15px;
                min-width: 130px;
                width: 130px;
                color: var(--color-dark);
                @media only screen and (max-width: 1199px) {
                    min-width: 95px;
                    width: 95px;
                    ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 10px;
                }
                &.wpwax-vm-select__indicator-separator{
                    display: none;
                }
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

        .wpwax-vm-notice{
            margin: 0 0 15px;
        }
    }
    .wpwax-vm-add-form__tab{
        .wpwax-vm-add-form__content{
            .wpwax-vm-notice{
                display: flex;
                font-size: 14px;
                line-height: 1.35;
                text-align: left;
                border-radius: 8px;
                padding: 0 15px;
                margin: 0 0 15px;
                bottom: 0;
                min-height: 46px;
                &.wpwax-vm-notice-danger{
                    color: var(--color-danger);
                }
            }
        }
    }
    .wpwax-vm-add-form__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 14px 14px;
        padding: 12px 0;
        transition: background-color .3s ease-in-out;
        background-color: #6551f2;
        &:hover{
            background-color: #3e2bc5;
        }
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
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
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
        /* ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: -70px; */
        z-index: 0;
        @media only screen and (max-width: 1299px) {
            ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 0;
        }
        @media only screen and (max-width: 760px) {
            margin-top: 30px;
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
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 5px;
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
        ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background-color: #ededed;
        z-index: 10;
        .wpwax-vm-media-preview__replace{
			margin: 5px;
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
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 8px;
            }
        }
        .wpwax-vm-media-preview__src{
            height: 100%;
            position: relative;
            z-index: 1;
            &:after{
                position: absolute;
                ${({ theme }) => (theme.direction === 'ltr' ? 'left' : 'right')}: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: .5;
                z-index: 0;
                border-radius: 12px;
                content: "";
                background-color: rgba(0,0,0,1);
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
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

