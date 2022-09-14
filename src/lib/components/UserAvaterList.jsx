import { ReactSVG } from 'react-svg';
import userImg from 'Assets/img/chatdashboard/user.png';
import userIcon from 'Assets/svg/icons/users.svg';
const UserAvaterList = ({ users }) => {
    const userList = Array.isArray(users) ? users : [];

    if (!userList.length) {
        return '';
    }

    const maxVisibleUsers = 2;

    let title = userList
        .slice(0, maxVisibleUsers)
        .map((user) => user.name)
        .join(', ');

    if (userList.length > maxVisibleUsers) {
        title = title + ' and more';
    }

    return (
        <div className='wpwax-vm-media'>
            <div className='wpax-vm-imglist'>
                {userList.slice(0, maxVisibleUsers).map((user, index) => {
                    if (user.avater) {
                        return <img src={user.avater} alt='' key={index} />;
                    } else {
                        return <img src={userImg} alt='' key={index} />;
                    }
                })}
                {userList.length > maxVisibleUsers ? (
                    <div className='wpwax-vm-more-img'>
                        <ReactSVG src={userIcon} />
                    </div>
                ) : null}
            </div>

            <div className='wpwax-vm-media__body'>
                <h5 className='wpwax-vm-media__title'>{title}</h5>
            </div>
        </div>
    );
};

export default UserAvaterList;
