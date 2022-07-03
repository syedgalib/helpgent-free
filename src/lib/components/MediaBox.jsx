const MediaBox = ({ img, title, metaList }) => {
    return (
        <div className="wpwax-vm-media">
            <img src={img} alt="" />
            <div className="wpwax-vm-media__body">
                <h5 className="wpwax-vm-media__title">{title}</h5>
                <div className="wpwax-vm-media__meta">
                    {
                        Object.keys(metaList).map((item, i) => {
                            item.type === "date" ? <span className="wpwax-vm-media__meta--date">{item.date}</span> : ''
                            item.type === "email" ? <span className="wpwax-vm-media__meta--date">{item.email}</span> : ''
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaBox;