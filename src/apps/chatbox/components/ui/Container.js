import classes from "Chatbox/assets/Container.scss";

function Container(props) {
	return <div className={classes.container}>{props.children}</div>;
}

export default Container;
