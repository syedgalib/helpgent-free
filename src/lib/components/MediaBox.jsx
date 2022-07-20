const MediaBox = ({ img, title, metaList }) => {
    return (
        <div className="wpwax-vm-media">
            <img src={img} alt="" />
            <div className="wpwax-vm-media__body">
                <h5 className="wpwax-vm-media__title">{title}</h5>
                {/* <div className="wpwax-vm-media__meta"> */}
                {
                    metaList.map((item, i) => {
                        return (
                            <span className="wpwax-vm-media__meta" key={i}>
                                {
                                    item.type === "date" ? <span className="wpwax-vm-media__meta--date">{item.text}</span> : ''
                                }
                                {
                                    item.type === "email" ? <span className="wpwax-vm-media__meta--email">{item.text}</span> : ''
                                }
                                {
                                    item.type === "name" ? <span className="wpwax-vm-media__meta--name">{item.text}</span> : ''
                                }
                            </span>

                        )

                    })
                }
                {/* </div> */}
            </div>
        </div>
    );
};

export default MediaBox;