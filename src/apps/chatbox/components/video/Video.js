function Video_Step_1() {

	return (
		<div>
			<div>How would you like to create this step</div>
			<button onClick={recordHandler}>Record Video</button>
			<div>Or</div>
			<button onClick={uploadHandler}>Uplpoad video</button>
			<div>Maximum file size: 300mb</div>
		</div>
	);
}

export default Video_Step_1;
