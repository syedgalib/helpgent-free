import { useDispatch } from "react-redux";
import { reset as resetUser } from "./forms/user/actionCreator";
import { reset as resetMessenger } from "./forms/messenger/actionCreator";
import { reset as resetAttachment } from "./forms/attachment/actionCreator";

function useResetStore() {
    const dispatch = useDispatch();

    return () => {
        dispatch( resetUser() );
        dispatch( resetMessenger() );
        dispatch( resetAttachment() );
    }
}

export { useResetStore };