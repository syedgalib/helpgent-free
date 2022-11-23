import { useSelector } from "react-redux";
import Theme_1 from "./components/Theme_1.jsx";
import Theme_2 from "./components/Theme_2.jsx";

function App() {
	const { templateTheme } = useSelector( state => {
        return {
			templateTheme: ( state.chatboxTemplate.template && state.chatboxTemplate.template.options && state.chatboxTemplate.template.options.theme ) ? state.chatboxTemplate.template.options.theme : 'theme-1',
        };
    });

	const themes = {
		'theme-1': <Theme_1/>,
		'theme-2': <Theme_2/>,
	};

	if ( Object.keys(themes).includes(templateTheme) ) {
		return (themes[templateTheme]);
	}

	return ('');
}

export default App;
