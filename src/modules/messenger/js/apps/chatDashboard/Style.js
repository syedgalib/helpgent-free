import Styled from 'styled-components';

const ChatDashboardWrap = Styled.div`
    display: flex;
    padding-top: 40px;
    .wpwax-vm-sidebar{
        width: 340px;
    }
    .wpwax-vm-messagebox{
        flex: auto;
        margin: 0 40px 0 30px;
        border-radius: 20px;
        background-color: var(--color-white);
    }
`;

export default ChatDashboardWrap;