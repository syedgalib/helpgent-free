import { useSelector, useDispatch } from "react-redux";
import SettingBox from './components/settingbox/Index.jsx';
import SettingPanelWrap from "./Style";

function App() {

	/* initialize Form Data */
	const { modalOverlay } = useSelector(state => {
		return {
			modalOverlay: state.tags.modalOverlay,
		};
	});

	return (
		<SettingPanelWrap>
			<div className="wpwax-vm-settings-top">
				<h2 className="wpwax-vm-settings-top__title">Settings</h2>

				<div className="wpwax-vm-settings-top__links">
					<a href="#">
						<div className="wpwax-vm-settings-top__link-icon"></div>
						<span className="wpwax-vm-settings-top__link-text">Documentation</span>
					</a>
					<a href="#">
						<div className="wpwax-vm-settings-top__link-icon"></div>
						<span className="wpwax-vm-settings-top__link-text">Support</span>
					</a>
				</div>
			</div>
			<SettingBox />
		</SettingPanelWrap>
	);
}

export default App;
