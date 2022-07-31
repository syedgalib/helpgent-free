import { useSelector } from "react-redux";
import { SidebarWrap } from '../Style';

function Sidebar() {

    return (
        <SidebarWrap>
            <ul className="wpwax-vm-sidebar-nav">
                <li className="wpwax-vm-sidebar-nav__item">
                    <a href="#">
                        <div className="wpwax-vm-sidebar-nav__item--icon"></div>
                        <span className="wpwax-vm-sidebar-nav__item--text">Language</span>
                    </a>
                </li>
                <li className="wpwax-vm-sidebar-nav__item">
                    <a href="#">
                        <div className="wpwax-vm-sidebar-nav__item--icon"></div>
                        <span className="wpwax-vm-sidebar-nav__item--text">Email</span>
                    </a>
                </li>
                <li className="wpwax-vm-sidebar-nav__item">
                    <a href="#">
                        <div className="wpwax-vm-sidebar-nav__item--icon"></div>
                        <span className="wpwax-vm-sidebar-nav__item--text">Integrations</span>
                    </a>
                </li>
            </ul>
        </SidebarWrap>
    );
}

export default Sidebar;