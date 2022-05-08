import { useSelector } from "react-redux";
import Form from "Chatbox/components/text/Form";

function Text() {
	const chatStep = useSelector((state) => state.chatStep);

	let result = "";

	switch (chatStep) {
		case 1:
			result = <Form />;
			break;
	}

	return result;
}

export default Text;
