import { useState } from 'react';
import avater from 'Assets/img/chatdashboard/user-placeholder.png';

export default Image = ({src, alt = ''}) => {
	const [isError, setIsError] = useState(false);
	let imageSrc = src || avater;
	
	isError ? imageSrc = avater : null;

	function onError() {
		setIsError(true);
	}

	return <img src={imageSrc} alt={alt} onError={onError}/>
}
