import Styled from 'styled-components';

const AvatarWrap = Styled.div`
    position: fixed;
    bottom: 30px;
    right: 25px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0,0,0,.16);
    cursor: pointer;
    background-color: var(--color-white);
    overflow: hidden;
    img {
        width: 118px;
        height: 118px;
        padding: 6px;
        border-radius: 50%;
    }   
`;

export default AvatarWrap;