import { useDispatch } from "react-redux";
import { reset as resetUser } from "./forms/user/actionCreator";
import { reset as resetMessenger } from "./forms/messenger/actionCreator";

function useResetStore() {
    const dispatch = useDispatch();

    return () => {
        dispatch( resetUser() );
        dispatch( resetMessenger() );
    }
}

export { useResetStore };