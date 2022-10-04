import Styled from 'styled-components';

const AvatarWrap = Styled.div`
    position: fixed;
    bottom: 30px;
    right: 25px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,.16);
    background-color: var(--color-white);
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    video{
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export default AvatarWrap;