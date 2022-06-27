import { useSelector } from "react-redux";
import Form from "./Form";

function Text() {
	const chatStep = useSelector((state) => state.chatStep);

	let result = <Form />;

	switch (chatStep) {
		case 1:
			result = <Form />;
			break;
	}

	return result;
}

export default Text;
