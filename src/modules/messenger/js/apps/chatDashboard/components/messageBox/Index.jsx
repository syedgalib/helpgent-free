import { useSelector } from "react-redux";
import { MessageBoxWrap } from "./Style";

function MessageBox() {

	// const chatScreen = useSelector((state) => state.chatScreen);

	return (
		<MessageBoxWrap>
			<div className="wpwax-vm-messagebox-header"></div>
			<div className="wpwax-vm-messagebox-body"></div>
			<div className="wpwax-vm-messagebox-footer"></div>
		</MessageBoxWrap>
	);
}

export default MessageBox;