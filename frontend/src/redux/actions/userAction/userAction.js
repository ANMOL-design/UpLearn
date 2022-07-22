import { encryption } from "./userEncryption";
// Making Login And Logout action For User
export const LoginUser = (isLoggedIn, Role) => async(dispatch) => {

    const userRole = encryption(Role);

    const login = {
        isLoggedIn: isLoggedIn,
        userRole: userRole
    }
    console.log(login)
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("Work", userRole);

    dispatch({ type: "SET_USER_DETAILS", payload: login });
}

export const LogoutUser = () => async(dispatch) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT_USER" });
}