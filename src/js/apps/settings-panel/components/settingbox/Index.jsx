import ReactSVG from 'react-inlinesvg';
import Sidebar from "./components/Sidebar.jsx";
import SettingContent from "./components/SettingContent.jsx";
import File from 'Assets/svg/icons/file.svg';
import QuestonCircle from 'Assets/svg/icons/question-circle.svg';
import { SetingBoxWrap } from './Style';

const SettingBox = () => {
    return (
        <SetingBoxWrap>
            <div className="wpwax-vm-settings-top">
                <h2 className="wpwax-vm-settings-top__title">Settings</h2>

                <div className="wpwax-vm-settings-top__links">
                    <a href="#">
                        <span className="wpwax-vm-settings-top__link-icon"><ReactSVG src={File} /></span>
                        <span className="wpwax-vm-settings-top__link-text">Documentation</span>
                    </a>
                    <a href="#">
                        <span className="wpwax-vm-settings-top__link-icon"><ReactSVG src={QuestonCircle} /></span>
                        <span className="wpwax-vm-settings-top__link-text">Support</span>
                    </a>
                </div>
            </div>
            <div className="wpwax-vm-seetings-box">
                <div className="wpwax-vm-seetings-box__header">
                    <div className="wpwax-vm-seetings-box__breadcrumb">
                        <ul>
                            <li><a href="#">Settings <span className="dashicons dashicons-arrow-right-alt2"></span></a></li>
                            <li><a href="#">General <span className="dashicons dashicons-arrow-right-alt2"></span></a></li>
                            <li><a href="#" className="wpwax-vm-active">General Settings</a></li>
                        </ul>
                    </div>
                    <div className="wpwax-vm-seetings-box__actions">
                        <div className="wpwax-vm-seetings-box-search">
                            <input type="text" name="wpwax-vm-settings-search" id="wpwax-vm-settings-search" placeholder="Search settings here..." />
                        </div>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Save Changes</a>
                    </div>
                </div>
                <div className="wpwax-vm-seetings-box__body">
                    <Sidebar />
                    <SettingContent />
                </div>
                <div className="wpwax-vm-seetings-box__footer">
                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Save Changes</a>
                </div>
            </div>
        </SetingBoxWrap>
    );
}

export default SettingBox;