import classes from './Avatar.css';

function Avatar() {
	function clickHandler() {

	}

	console.log(classes)

	return (
		<div className="12" onClick={clickHandler}>
			This is avatar
		</div>
	);
}

export default Avatar;
