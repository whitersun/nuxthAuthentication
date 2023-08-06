import { storeToRefs } from "pinia";
import { useUser } from "../store/user";

export const stateStore = () => {
    const store = useUser();

    const { 
        currentUser: user,
        switchToForm: stateSwitch
    } = storeToRefs(store);

    return {
        store,
        user,
        stateSwitch
    }
}