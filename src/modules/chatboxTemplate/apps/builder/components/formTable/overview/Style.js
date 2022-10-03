import Styled from 'styled-components';

const TemplateBox = Styled.div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--color-white);
    .wpwax-vm-table-wrap{
        position: relative;
        min-height: 200px;
        .wpwax-vm-loading-spin{
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 101;
        }
        .wpwax-vm-modal{
            .wpwax-vm-modal__body{
                text-align: center;
                p{
                    font-weight: 600;
                    font-size: 18px;
                    color: var(--color-dark);
                }
            }
        }
    }
    .wpwax-vm-table{
        tr{
            th{
                &.wpwax-vm-head-name{
                    width: 80%;
                }
            }
        }
        .wpwax-vm-table-action{
            margin: -8px;
        }
        .wpwax-vm-btn{
            font-size: 14px;
            padding: 0 14px;
            margin: 8px;
            text-decoration: none;
            .dashicons{
                width: 15px;
                height: 15px;
                margin-right: 8px;
                position: relative;
                top: -4px;
            }
        }
    }
    .wpwax-vm-titlebox{
        display: flex;
        align-items: center;
        .wpwax-vm-titlebox-inner{
            display: flex;
            align-items: center;
            min-width: 240px;
        }
        .wpwax-vm-titlebox__name{
            display: none;
            font-weight: 500;
            min-width: 240px;
            color: var(--color-dark);
            &.wpwax-vm-show{
                display: block;
            }
            span{
                display: block;
            }
            .wpwax-vm-titlebox__id{
                font-size: 13px;
                font-weight: 400;
                display: block;
                margin-top: 4px;
                color: var(--color-gray);
            }
        }
    }
    .wpwax-vm-titlebox__editor{
        display: none;
        &.wpwax-vm-show{
            display: flex;
        }
        input{
            border: 0 none;
            background-color: transparent;
            border-bottom: 1px solid var(--color-border-light);
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
        
    }
    .wpwax-vm-titlebox__editor-action{
        margin-left: 10px;
        a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 5px 10px #adb4d260;
            margin: 2px;
            transition: 0.3s ease;
            text-decoration: none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-titlebox__editor--cancel{
                background-color: var(--color-danger);
                border: 1px solid var(--color-danger);
                display: none;
                &:hover{
                    color: var(--color-danger);
                    border-color: var(--color-danger);
                    background-color: var(--color-white);
                    .dashicons:before{
                        color: var(--color-danger);
                    }
                }
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--yes{
                background-color: var(--color-success);
                border: 1px solid var(--color-success);
                display: none;
                &:hover{
                    color: var(--color-success);
                    border-color: var(--color-success);
                    background-color: var(--color-white);
                    .dashicons:before{
                        color: var(--color-success);
                    }
                }
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--edit{
                font-size: 15px;
                display: none;
                margin-left: 15px;
                &:before{
                    color: #2C99FF;
                }
                &.wpwax-vm-show{
                    display: inline-flex;
                }
            }
            .dashicons{
                line-height: 1;
                position: relative;
                top: -2px;
                &:before{
                    font-size: 15px;
                    color: var(--color-white);
                }
            }
        }
    }
`;

export default TemplateBox;