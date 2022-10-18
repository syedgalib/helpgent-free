import { useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import NavItem from "./NavItem.jsx";
import { SidebarWrap } from '../Style';
import globe from 'Assets/svg/icons/globe.svg';
import envelope from 'Assets/svg/icons/envelope.svg';
import link from 'Assets/svg/icons/link.svg';

const SidebarData = [
    {
        label: "Language",
        icon: <ReactSVG src={globe} />,
        iconClosed: <span className="dashicons dashicons-arrow-down"></span>,
        iconOpened: <span className="dashicons dashicons-arrow-up"></span>,

        subNav: [
            {
                label: "Available Integration",
                path: "integration"
            },
            {
                label: "Directorist",
                path: "directorsit"
            },
            {
                label: "WooCommerce",
                path: "wpwax"
            },
            {
                label: "Live Chat Plugins",
                path: "liveChat"
            }
        ]
    },
    {
        label: "Email",
        icon: <ReactSVG src={envelope} />,
        iconClosed: <span className="dashicons dashicons-arrow-down"></span>,
        iconOpened: <span className="dashicons dashicons-arrow-up"></span>,

        subNav: [
            {
                label: "Available Integration",
                path: "integration"
            },
            {
                label: "Directorist",
                path: "directorsit"
            },
            {
                label: "WooCommerce",
                path: "wpwax"
            },
            {
                label: "Live Chat Plugins",
                path: "liveChat"
            }
        ]
    },
    {
        label: "Integration",
        icon: <ReactSVG src={link} />,
        iconClosed: <span className="dashicons dashicons-arrow-down"></span>,
        iconOpened: <span className="dashicons dashicons-arrow-up"></span>,

        subNav: [
            {
                label: "Available Integration",
                path: "integration"
            },
            {
                label: "Directorist",
                path: "directorsit"
            },
            {
                label: "WooCommerce",
                path: "wpwax"
            },
            {
                label: "Live Chat Plugins",
                path: "liveChat"
            }
        ]
    }
]
const Sidebar = () => {

    return (
        <SidebarWrap>
            <ul className="wpwax-vm-sidebar-nav">
                {
                    SidebarData.map((menuItem, index) => <NavItem item={menuItem} key={index} />)
                }
            </ul>
        </SidebarWrap>
    );
}

export default Sidebar;