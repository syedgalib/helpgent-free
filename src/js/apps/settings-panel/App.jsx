import SettingBox from './components/settingbox/Index.jsx';
import EmailGeneral from './components/settingbox/components/components/EmailGeneral.jsx';
import EmailTemplate from './components/settingbox/components/components/EmailTemplate.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<EmailGeneral />} />
					<Route element={<EmailTemplate />} />
				</Routes>
			</BrowserRouter>
			<SettingBox />
		</>
	);
}

export default App;
