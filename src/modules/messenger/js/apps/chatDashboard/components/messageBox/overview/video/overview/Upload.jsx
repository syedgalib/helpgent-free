import React, { useState } from "react";
import { UploadWrap } from '../Style';

const Upload = () => {
    const [state, setState] = useState({
        step: ""
    });

    function handleVideo(step) {
        setState({
            ...state,
            step: step
        });
    }

    return (
        <UploadWrap>
        </UploadWrap>
    )
}

export default Upload;