<<<<<<< HEAD
import { ReactSVG } from 'react-svg';
import userImg from 'Assets/img/chatdashboard/user.png';
import userIcon from 'Assets/svg/icons/users.svg';
const MediaBox = ({ img, multiImg, title, metaList }) => {
    return (
        <div className='wpwax-vm-media'>
            {typeof img === 'string' ? <img src={img} alt='' /> : null}
            {typeof img === 'object' ? (
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
                    {multiImg ? (
                        <div className='wpwax-vm-more-img'>
                            <ReactSVG src={userIcon} />
                        </div>
                    ) : null}
                </div>
            ) : null}
=======
import { ReactSVG } from "react-svg";
import userImg from "Assets/img/chatdashboard/user.png";
import userIcon from "Assets/svg/icons/users.svg";
const MediaBox = ({ chatingMedia, img, lastMessage, multiImg, title, metaList }) => {
    return (
        
        <div className="wpwax-vm-media">
            {
                chatingMedia ?
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
                :
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
            }
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
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350

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
