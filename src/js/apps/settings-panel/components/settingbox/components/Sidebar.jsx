import { useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import NavItem from "./NavItem.jsx";
import { SidebarWrap } from '../Style';
import globe from 'Assets/svg/icons/globe.svg';
import envelope from 'Assets/svg/icons/envelope.svg';
import link from 'Assets/svg/icons/link.svg';

const settingsDate = [
    {
        label: "Email",
        navId: "wpwax-vm-email-settings",
        icon: <ReactSVG src={envelope} />,
        iconClosed: <span className="dashicons dashicons-arrow-down"></span>,
        iconOpened: <span className="dashicons dashicons-arrow-up"></span>,

        subNav: [
            {
                label: "Email general",
                path: "email_general"
            },
            {
                label: "Email Template",
                path: "email_template"
            }
        ]
    }
]
const Sidebar = props => {
    // const { settingContentState, setSettingContentState } = props;
    return (
        <SidebarWrap>
            <ul className="wpwax-vm-sidebar-nav">
                {
                    settingsDate.map((menuItem, index) => <NavItem item={menuItem} key={index} />)
                }
            </ul>
        </SidebarWrap>
    );
}

export default Sidebar;