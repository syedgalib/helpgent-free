import Styled from 'styled-components';

const TaglistWrap = Styled.div`
    .wpwax-vm-taglist-author{
        display: flex;
        align-items: center;
        .wpwax-vm-taglist-author__name{
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            margin-left: 12px;
            color: var(--color-dark);
        }
    }
    .wpawax-vm-taglist-search{
        display: flex;
        align-items: center;
        min-height: 40px;
        padding: 0 16px;
        border-radius: 10px;
        background-color: var(--color-bg-general);
        input{
            width: 100%;
            border: 0 none;
            background-color: transparent;
            &:focus{
                outline: none;
                border: 0 none;
                box-shadow: 0 0;
            }
        }
    }
    .wpawax-vm-taglist-inner{
        margin-top: 28px;
        ul{
            li{
                display: flex;
                justify-content: space-between;
                .wpwax-vm-taglist-label{
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--color-dark);
                }
            }
        }
    }

    .wpwax-vm-modal__footer{
        .wpwax-vm-btn{
            font-size: 14px;
            border-radius: 10px;
            padding: 0 21.5px;
            height: 38px;
            .wpwax-vm-btn-icon{
                font-size: 12px;
                line-height: 1.85;
                margin-right: 3px;
            }
        }
    }
`;

const AddTagWrap = Styled.div`
    .wpwax-vm-taglist-author{
        display: flex;
        align-items: center;
        .wpwax-vm-taglist-author__name{
            display: inline-block;
            margin-left: 12px;
            font-size: 18px;
            font-weight: 600;
            color: var(--color-dark);
        }
    }
    .wpwax-vm-addtag-form{
        display: flex;
        align-items: flex-start;
        padding-top: 10px;
        min-height: 140px;
        .wpwax-vm-form-group{
            flex: 1;
            input{
                font-size: 14px;
                font-weight: 500;
                width: 100%;
                border: 0 none;
                padding: 0 20px;
                min-height: 40px;
                color: var(--color-dark);
                border-radius: 10px;
                background-color: var(--color-bg-general);
            }
        }
        .wpwax-vm-form-group,
        .wpwax-vm-btn{
            margin: 5px;
        }
    }
    .wpwax-vm-modal__footer{
        justify-content: flex-end;
    }
`;

const DeleteConfirmWrap = Styled.div`
    &.wpax-vm-delete-conf-modal{
        padding-top: 15px;
        .wpwax-vm-modal__body{
            text-align: center;
            .wpwax-vm-delete-icon{
                .dashicons{
                    font-size: 40px;
                    color: #B1B1B1;
                }
            }
            p{
                font-size: 20px;
                font-weight: 500;
                margin: 40px 0 0;
                color: var(--color-dark);
            }
        }
        .wpwax-vm-modal__footer{
            padding-bottom: 30px;
            background-color: transparent;
            .wpwax-vm-btn{
                width: 100%;
                margin: 5px;
                border-radius: 10px;
                justify-content: center;
                &.wpwax-vm-btn-gray{
                    color: var(--color-dark);
                    background-color: var(--color-bg-gray);
                }
            }
        }
    }
`;

export  { TaglistWrap, AddTagWrap, DeleteConfirmWrap };