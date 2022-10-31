import React, { useState } from 'react';
import { SidebarMenuItem } from '../Style.js';

const NavItem = props => {
    const [subNavPath, setsubNavPath] = useState('');
    const { contentState, setContentState, navId, setNavId } = props;

    const handleSubnav = (e,id,path,subNav) => {
        e.preventDefault();
        setNavId(id);
        setsubNavPath(path);
        setContentState({
            ...contentState,
            navParent: path,
            contentKey: path
        });
    };
    const handleSubnavActivation = e => {
        e.preventDefault();
        setsubNavPath(e.target.id);
        setContentState({
            ...contentState,
            contentKey: e.target.id
        });
    };

    return (
        <SidebarMenuItem className={props.item.navId === navId ? "wpwax-vm-sidebar-nav__item wpwax-vm-sidebar-nav__submenu-open" : "wpwax-vm-sidebar-nav__item"}>
            <a href={!props.item.subNav ? props.item.path :'#'} onClick={e=>handleSubnav(e,props.item.navId,props.item.path,props.item.subNav)} id={props.item.navId}>
                <div className="wpwax-vm-sidebar-nav__item--icon">{props.item.icon}</div>
                <span className="wpwax-vm-sidebar-nav__item--text">
                    {props.item.label}
                    {
                        props.item.navId === navId ? props.item.iconOpened : props.item.iconClosed
                    }
                </span>
            </a>
            {
                props.item.navId === navId 
                ? 
                <ul>
                    {
                        props.item.subNav && props.item.subNav.map((subItem, index) => {
                            return (
                                <li key={index}><a className={subItem.path === subNavPath ? "wpwax-vm-active": null} id={subItem.path} href={`#${subItem.path}`} onClick={handleSubnavActivation}>{subItem.label}</a></li>
                            )
                        })
                    }
                </ul> : null
            }
            
        </SidebarMenuItem>
    );
}

export default NavItem;