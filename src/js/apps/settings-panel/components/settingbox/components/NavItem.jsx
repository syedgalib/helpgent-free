import React, { useState } from 'react';
import { SidebarMenuItem } from '../Style.js';

const NavItem = props => {
    const [navId, setNavId] = useState('wpwax-vm-email-settings');
    const [subNavPath, setsubNavPath] = useState('email_general');

    const handleSubnav = e => {
        e.preventDefault()
        setNavId(e.target.id)
    };
    const handleSubnavActivation = e => {
        e.preventDefault();
        setsubNavPath(e.target.id);
    };
    
    return (
        <SidebarMenuItem className={props.item.navId === navId ? "wpwax-vm-sidebar-nav__item wpwax-vm-sidebar-nav__submenu-open" : "wpwax-vm-sidebar-nav__item"}>
            <a href="#" onClick={e=>handleSubnav(e)} id="wpwax-vm-email-settings">
                <div className="wpwax-vm-sidebar-nav__item--icon">{props.item.icon}</div>
                <span className="wpwax-vm-sidebar-nav__item--text">
                    {props.item.label}
                    {
                        props.item.id === navId ? props.item.iconOpened : props.item.iconClosed
                    }
                </span>
            </a>
            <ul>
                {
                    props.item.subNav.map((subItem, index) => {
                        return (
                            <li key={index}><a className={subItem.path === subNavPath ? "wpwax-vm-active": null} id={subItem.path} href={`#${subItem.path}`} onClick={handleSubnavActivation}>{subItem.label}</a></li>
                        )
                    })
                }
            </ul>
        </SidebarMenuItem>
    )
}

export default NavItem;