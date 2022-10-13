import { useState } from 'react';
import avater from 'Assets/img/chatdashboard/user-placeholder.png';

export default Image = ({src, alt = '', placeholder = avater}) => {
	const [source, setSource] = useState(src || placeholder);

	function onError() {
		setSource(placeholder);
	}

	return <img src={source} alt={alt} onError={onError}/>
}
