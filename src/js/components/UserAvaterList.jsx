// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import userImg from 'Assets/img/chatdashboard/user.png';
import userIcon from 'Assets/svg/icons/users.svg';
const UserAvaterList = ({ users, maxVisibleUsers }) => {
    const userList = Array.isArray(users) ? users : [];

    if (!userList.length) {
        return '';
    }

    const max_visible_users = maxVisibleUsers ? maxVisibleUsers : 2;

    let title = userList
        .slice(0, max_visible_users)
        .map((user) => user.name)
        .join(', ');

    let subtitle = userList
        .slice(0, max_visible_users)
        .map((user) => user.email)
        .join(', ');

    if (userList.length > max_visible_users) {
        title = title + ' and more';
        subtitle = subtitle + ' and more';
    }

    return (
        <div className='wpwax-vm-media'>
            <div className='wpax-vm-imglist'>
                {userList.slice(0, max_visible_users).map((user, index) => {
                    if (user.avater) {
                        return <img src={user.avater} alt='' key={index} />;
                    } else {
                        return <img src={userImg} alt='' key={index} />;
                    }
                })}
                {userList.length > max_visible_users ? (
                    <div className='wpwax-vm-more-img'>
                        <ReactSVG src={userIcon} />
                    </div>
                ) : null}
            </div>

            <div className='wpwax-vm-media__body'>
                <h5 className='wpwax-vm-media__title'>{title}</h5>

                {subtitle && (
                    <span className='wpwax-vm-media__meta'>
                        <span className='wpwax-vm-media__meta--email'>
                            {subtitle}
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default UserAvaterList;
