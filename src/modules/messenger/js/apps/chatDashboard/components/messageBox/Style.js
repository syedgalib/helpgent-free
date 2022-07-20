import Styled from 'styled-components';

const MessageBoxWrap = Styled.div`
    border-radius: 20px;
    background-color: var(--color-white);
    .wpwax-vm-messagebox-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-bg-general);
    }
    .wpwax-vm-messagebox-header__left{
        padding-left: 30px;
    }
    .wpwax-vm-messagebox-header__right{
        padding-right: 30px;
        .wpwax-vm-messagebox-header__actionlist{
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
        }
        .wpwax-vm-searchbox{
            display: none;
            &.wpwax-vm-show{
                display: block;
            }
            input{
                border: 0 none;
                border-radius: 0px;
                &:focus{
                    outline: none;
                    box-shadow: 0 0;
                }
            }
        }
        .wpwax-vm-search-toggle{
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
    }
    .wpwax-vm-messagebox-header__action-item{
        display: flex;
        align-items: center;
        padding: 0 15px;
        line-height: 1;
        .wpwax-vm-messagebox-header__action--link{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #4D4D4D;
            text-decoration: none;
            &:hover{
                svg path,
                span{
                    color: var(--color-primary);
                    fill: var(--color-primary);
                }
            }
            svg path,
            span{
                transition: .3s;
            }
            .wpwax-vm-messagebox-header__action--text{
                font-weight: 500;
                display: inline-block;
                margin-left: 8px;
            }
        }
    }

    .wpwax-vm-messagebox-body{
        height: 720px;
        overflow-y: auto;
        padding-top: 25px;
    }
    .wpwax-vm-messagebox-footer{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0;
        border-top: 1px solid var(--color-border-light);
        .wpwax-vm-btn{
            border-radius: 10px;
            &:hover{
                color: var(--color-white);
                background-color: var(--color-primary);
                svg path,
                svg circle{
                    fill: var(--color-white);
                }
            }
            &.wpwax-vm-btn-lg{
                height: 48px;
                padding: 0 32.5px;
            }
        }
        .wpwax-vm-messagebox-footer__text{
            display: inline-block;
            font-size: 15px;
            font-weight: 500;
            margin-right: 10px;
            color: #4D4D4D;
        }
        .wpwax-vm-messagebox-footer__actionlist{
            .wpwax-vm-btn{
                margin: 0 10px;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                &:hover{
                    .wpwax-vm-btn-icon{
                        svg circle,
                        svg path{
                            fill: var(--color-white);
                        }
                    } 
                }
                .wpwax-vm-btn-icon,
                .wpwax-vm-btn-text{
                    display: inline-block;
                    line-height: 1;
                }
                .wpwax-vm-btn-text{
                    margin-left: 10px;
                }
                .wpwax-vm-btn-icon{
                    svg circle,
                    svg path{
                        fill: var(--color-dark);
                    }
                }
            }
        }
    }
`;

export {MessageBoxWrap};