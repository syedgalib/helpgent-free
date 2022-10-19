import React, { useState } from 'react';
import { SidebarMenuItem } from '../Style.js';

const NavItem = (menuItem) => {
    const [subnav, setSubnav] = useState(false);

    const handleSubnav = () => setSubnav(!subnav);
    
    return (
        <SidebarMenuItem className={subnav ? "wpwax-vm-sidebar-nav__item wpwax-vm-sidebar-nav__submenu-open" : "wpwax-vm-sidebar-nav__item"}>
            <a href="#" onClick={handleSubnav}>
                <div className="wpwax-vm-sidebar-nav__item--icon">{menuItem.item.icon}</div>
                <span className="wpwax-vm-sidebar-nav__item--text">
                    {menuItem.item.label}
                    {
                        menuItem.item.subNav && subnav ?
                            menuItem.item.iconOpened
                            : menuItem.item.subNav
                                ? menuItem.item.iconClosed
                                : null
                    }
                </span>
            </a>
            <ul>
                {
                    subnav && menuItem.item.subNav.map((subItem, index) => {
                        return (
                            <li key={index}><a href={`#${subItem.label}`}>{subItem.label}</a></li>
                        )
                    })
                }
            </ul>

        </SidebarMenuItem>
    )
}

export default NavItem;