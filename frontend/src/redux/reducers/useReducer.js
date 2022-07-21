export const reducer = (state, action) => {

    if (action.type === 'USER') {
        return action.payload
    }
    return state;
}

export let initialState = {
    loggedIn: localStorage.getItem('isLoggedin') || false,
}