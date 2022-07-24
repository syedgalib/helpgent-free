import React, { useState } from "react";
import { RecordWrap } from '../Style';
import previewBg from "../../../../../../../../assets/img/chatdashboard/record-bg.png"

const Record = () => {
    return (
        <RecordWrap>
            <div className="wpwax-vm-record-video-bg" style={{ backgroundImage: `url("${previewBg}")` }}></div>
        </RecordWrap>
    )
}

export default Record;