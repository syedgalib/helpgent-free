import userImg from "Assets/img/chatdashboard/user.png";
const MediaBox = ({ img, title, metaList }) => {
    console.log(img)
    return (

        <div className="wpwax-vm-media">
            {
                typeof img === "string" ? <img src={img} alt="" /> : null
            }
            {
                typeof img === "object" ?
                    <div className="wpax-vm-imglist">
                        {
                            img.map((src, index) => {
                                if (src !== '') {
                                    return (
                                        <img src={src} alt="" key={index} />
                                    )
                                } else {
                                    return (
                                        <img src={userImg} alt="" key={index} />
                                    )
                                }
                            })
                        }
                    </div> : null
            }

            <div className="wpwax-vm-media__body">
                <h5 className="wpwax-vm-media__title">{title}</h5>

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

            </div>
        </div>
    );
};

export default MediaBox;