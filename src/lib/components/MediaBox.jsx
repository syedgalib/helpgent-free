// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
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
        console.log(lastMessage);
        if (lastMessage) {
            if(lastMessage.user.avatar){
                return <img src={lastMessage.user.avatar} alt='' />;
            }else{
                const userString = lastMessage.user.name.slice(0,2);
                return <span>{userString}</span>
            }
            // if (lastMessage.user.roles[0] === 'administrator') {
            //     if (lastMessage.user.avatar) {
            //         return <img src={lastMessage.user.avatar} alt='' />;
            //     } else {
            //         return <ReactSVG src={userMd} />;
            //     }
            // } else {
            //     if (lastMessage.user.avatar) {
            //         return <img src={lastMessage.user.avatar} alt='' />;
            //     } else {
            //         return <ReactSVG src={userMd} />;
            //     }
            // }
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
                    {
                        initialConv ?
                            img[0] === '' ? (
                                <img src={userImg} alt='' />
                            ) : (
                                <img src={img[0]} alt='' />
                            )
                        :
                        img.map((src, index) => {
                            if (index === 0) {
                                if (src !== '') {
                                    return <img src={src} alt='' key={index} />;
                                } else {
                                    return <img src={userImg} alt='' key={index} />;
                                }
                            }
                        })
                    }
                </div>
            ) : null}

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
