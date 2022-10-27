import React, { useState } from 'react';
import { useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import NavItem from "./NavItem.jsx";
import { SidebarWrap } from '../Style';
import globe from 'Assets/svg/icons/globe.svg';
import envelope from 'Assets/svg/icons/envelope.svg';
import slider from 'Assets/svg/icons/slider.svg';
import link from 'Assets/svg/icons/link.svg';

const settingsDate = [
    {
        label: "General",
        path: "general",
        navId: "wpwax-vm-general-settings",
        icon: <ReactSVG src={slider} />
    },
    {
        label: "Email",
        navId: "wpwax-vm-email-settings",
        icon: <ReactSVG src={envelope} />,
        iconClosed: <span className="dashicons dashicons-arrow-down"></span>,
        iconOpened: <span className="dashicons dashicons-arrow-up"></span>,

        subNav: [
            {
                label: "Email General",
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
    const [navId, setNavId] = useState('wpwax-vm-general-settings');
    const { contentState, setContentState } = props;
    return (
        <SidebarWrap>
            <ul className="wpwax-vm-sidebar-nav">
                {
                    settingsDate.map((menuItem, index) => <NavItem item={menuItem} key={index} navId={navId} setNavId={setNavId} contentState={contentState} setContentState={setContentState} />)
                }
            </ul>
        </SidebarWrap>
    );
}

export default Sidebar;