import Styled from 'styled-components';

const RecordWrap = Styled.div`
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 30px;
    right: 30px;
    width: 100%;
    width: calc( 100% - 60px );
    height: calc( 100% - 50px );
    border-radius: 30px;
    z-index: 1000001;
    .wpwax-vm-record-video-bg{
        width: 100%;
        height: 100%;
        background-size: cover;
    }
`;

const UploadWrap = Styled.div`
    
`;

export  {RecordWrap, UploadWrap};