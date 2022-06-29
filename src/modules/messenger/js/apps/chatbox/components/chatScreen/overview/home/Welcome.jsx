import { useSelector } from "react-redux";
import Theme_1 from "./themes/Theme_1";
import Theme_2 from "./themes/Theme_2";

function Welcome() {
	const { templateTheme } = useSelector( state => {
        return {
			templateTheme: ( state.chatboxTemplate.template && state.chatboxTemplate.template.options && state.chatboxTemplate.template.options.theme ) ? state.chatboxTemplate.template.options.theme : 'theme-1',
        };
    });

	const themes = {
		'theme-1': <Theme_1/>,
		'theme-2': <Theme_2/>,
	};

	if (Object.keys(themes).includes(templateTheme)) {
		return (themes[templateTheme]);
	}

	return ('');
}

export default Welcome;
