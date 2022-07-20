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
        ul{
            li{
                display: flex;
                justify-content: space-between;
            }
        }
    }
`;

export  { TaglistWrap };