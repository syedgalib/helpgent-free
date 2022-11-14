import Styled from 'styled-components';

const PageHeaderStyle = Styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    .wpwax-vm-page-header-title{
        font-size: 24px;
        font-weight: 500;
    }
    .wpwax-vm-page-header-btn{
        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 20px;
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
    }
`;

export default PageHeaderStyle;