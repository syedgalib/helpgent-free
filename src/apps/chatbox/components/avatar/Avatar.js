import classes from "./Avatar.scss";
import img from "./img.png";

function Avatar() {
	function clickHandler() {
		alert(3);
	}

	return (
		<div className={classes.avatar} onClick={clickHandler}>
			<img src={img} alt="Avatar" />
		</div>
	);
}

export default Avatar;
