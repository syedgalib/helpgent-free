import Styled from 'styled-components';

const AddFormStyle = Styled.div`
    display: flex;
    margin-top: 30px;
    .wpwax-vm-add-form{
        max-width: 420px;
        border-radius: 14px;
        background-color: var(--color-bg-white);
    }
    .wpwax-vm-form-group{
        &:not(:last-child){
            border-bottom: 1px solid var(--color-border-light);
        }
    }
    .wpwax-vm-add-form__top{
        padding: 20px;
        border-radius: 14px 14px 0 0;
        background-color: var(--color-bg-gray);
        .wpwax-vm-add-form__top-btn{
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            min-height: 36px;
            padding: 0 16px;
            text-decoration: none;
            border-radius: 8px;
            color: var(--color-dark);
            &:focus{
                outline: 0 none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-active{
                font-weight: 700;
                color: var(--color-white);
                background-color: var(--color-primary);
            }
        }
    }
    .wpwax-vm-add-form__content{
        padding: 25px 30px;
        .wpwax-vm-chekbox-list,
        .wpwax-vm-radio-list{
            margin-top: 18px;
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
    }
`;

export {
    AddFormStyle,
};