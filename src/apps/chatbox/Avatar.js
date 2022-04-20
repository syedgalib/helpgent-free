import classes from './Avatar.scss';

function Avatar() {
	function clickHandler() {

	}

	console.log(classes.avatar)

	return (
		<div className={classes.avatar} onClick={clickHandler}>
			This is avatar
		</div>
	);
}

export default Avatar;
