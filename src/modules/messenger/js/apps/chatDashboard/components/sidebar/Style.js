import Styled from 'styled-components';

const SidebarWrap = Styled.div`
    .wpwax-vm-sidebar-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        .wpwax-vm-sidebar-title{
            margin: 0;
        }
        .wpwax-vm-sidebar-refresher{
            line-height: 1;
        }
    }
    .wpwax-vm-sidebar-search{
        .wpwax-vm-form__element{
            border-radius: 10px;
            background-color: #DDDDDD;
        }
    }
`;

export default SidebarWrap;