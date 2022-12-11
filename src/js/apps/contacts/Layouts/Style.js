import Styled from 'styled-components';

const ContactStyleWrap = Styled.div`
    background-color: var(--color-white);
    margin-top: 40px;
    &.wpwax-vm-contact-list{
        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 20px;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(105,105,105,.10);
        .wpwax-vm-contact-list__top{
            margin-bottom: 20px;
        }
        .wpwax-vm-contact-list__table{
            position: relative;
            min-height: 200px;
            .wpwax-vm-loading-spin{
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: 101;
            }
        }
        table{
            tr{
                th{
                    font-size: 14px;
                    letter-spacing: 0px;
                    text-transform: capitalize;
                    color: var(--color-dark);
                }
                td{
                    color: #4D4D4D;
                    a{
                        color: #4D4D4D;
                        &.wpwax-vm-phone{
                            text-decoration: none;
                        }
                        &:hover{
                            color: var(--color-primary)
                        }
                    }
                }
                th,
                td{
                    &:first-child{
                        width: 40px;
                    }
                }
            }
        }
        .wpwax-vm-empty{
            p{
                font-size: 16px;
            }
        }
    }

    .wpwax-vm-pagination{
        justify-content: center;
        margin-top: 35px;
    }
`;

export default ContactStyleWrap;