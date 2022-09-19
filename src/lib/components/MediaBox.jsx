import { ReactSVG } from 'react-svg';
import userImg from 'Assets/img/chatdashboard/user.png';
import userIcon from 'Assets/svg/icons/users.svg';
import userMd from 'Assets/svg/icons/user-tie.svg';
const MediaBox = ({
    chatingMedia,
    img,
    lastMessage,
    initialConv,
    title,
    metaList,
}) => {
    const replyerImg = () => {
        if (lastMessage) {
            // console.log(chatingMedia, lastMessage.user.roles[0], img[0] === '');
            if (lastMessage.user.roles[0] === 'administrator') {
                if (lastMessage.user.avatar) {
                    return <img src={lastMessage.user.avatar} alt='' />;
                } else {
                    return <ReactSVG src={userMd} />;
                }
            } else {
                if (lastMessage.user.avatar) {
                    return <img src={lastMessage.user.avatar} alt='' />;
                } else {
                    return <ReactSVG src={userMd} />;
                }
            }
        }
    };

    return (
        <div className='wpwax-vm-media'>
            {chatingMedia ? (
                typeof img === 'object' ? (
                    <div className='wpax-vm-imglist'>
                        {initialConv ? (
                            img[0] === '' ? (
                                <img src={userImg} alt='' />
                            ) : (
                                <img src={img[0]} alt='' />
                            )
                        ) : (
                            <div className='wpwax-vm-img-include-replyer'>
                                {img[0] === '' ? (
                                    <img src={userImg} alt='' />
                                ) : (
                                    <img src={img[0]} alt='' />
                                )}
                                <span className='wpwax-vm-replyer'>
                                    {replyerImg()}
                                </span>
                            </div>
                        )}
                    </div>
                ) : null
            ) : typeof img === 'object' ? (
                <div className='wpax-vm-imglist'>
                    {img.map((src, index) => {
                        if (index === 0) {
                            if (src !== '') {
                                return <img src={src} alt='' key={index} />;
                            } else {
                                return <img src={userImg} alt='' key={index} />;
                            }
                        }
                    })}
                </div>
            ) : null}
            {/* {
                if(chatingMedia){
                    typeof img === "string" ? <img src={img} alt="" /> : null
                }else{
                }
            }
            {

            }
            {
                typeof img === "object" ?
                    <div className="wpax-vm-imglist">
                        {
                            img.map((src, index) => {
                                if(index === 0){
                                    if (src !== '') {
                                        return (
                                            <img src={src} alt="" key={index} />
                                        )
                                    } else {
                                        return (
                                            <img src={userImg} alt="" key={index} />
                                        )
                                    }
                                }

                            })
                        }
                        {
                            multiImg ? <div className="wpwax-vm-more-img"><ReactSVG src={userIcon}/></div>: null
                        }
                    </div> : null
            } */}

            <div className='wpwax-vm-media__body'>
                <h5 className='wpwax-vm-media__title'>{title}</h5>

                {metaList.map((item, i) => {
                    return (
                        <span className='wpwax-vm-media__meta' key={i}>
                            {item.type === 'date' ? (
                                <span className='wpwax-vm-media__meta--date'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                            {item.type === 'email' ? (
                                <span className='wpwax-vm-media__meta--email'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                            {item.type === 'name' ? (
                                <span className='wpwax-vm-media__meta--name'>
                                    {item.text}
                                </span>
                            ) : (
                                ''
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default MediaBox;
