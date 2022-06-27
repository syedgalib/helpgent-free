import Theme_1 from "./themes/Theme_1";
import Theme_2 from "./themes/Theme_2";

function Welcome() {
	const chatBoxStyle = "theme-1";

	const themes = {
		'theme-1': <Theme_1></Theme_1>,
		'theme-2': <Theme_2></Theme_2>,
	};

	if (Object.keys(themes).includes(chatBoxStyle)) {
		return (themes[chatBoxStyle]);
	}

	return ('');
}

export default Welcome;
