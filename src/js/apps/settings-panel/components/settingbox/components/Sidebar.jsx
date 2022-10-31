import React, { useState } from 'react';
import { useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import NavItem from "./NavItem.jsx";
import { SidebarWrap } from '../Style';


const Sidebar = props => {
    const [navId, setNavId] = useState('wpwax-vm-general-settings');
    const { contentState, setContentState, nav } = props;
    return (
        <SidebarWrap>
            <ul className="wpwax-vm-sidebar-nav">
                {
                    nav.map((menuItem, index) => <NavItem item={menuItem} key={index} navId={navId} setNavId={setNavId} contentState={contentState} setContentState={setContentState} />)
                }
            </ul>
        </SidebarWrap>
    );
}

export default Sidebar;