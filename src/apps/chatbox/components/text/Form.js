import { useRef } from "react";

function Form() {
	const textRef = useRef();

	function submitHandler(e) {
		e.preventDefault();
		const text = textRef.current.value;
		console.log(text);
	}
	return (
		<form onSubmit={submitHandler}>
			<textarea
				required
				maxLength="1000"
				row="5"
				placeholder="Type your text..."
				ref={textRef}
			></textarea>
			<button>Send</button>
		</form>
	);
}

export default Form;
