import csrfFetch from "./csrf";

const RETRIEVE_USER = 'users/retrieveUser';

const retrieveUser = (user) => ({
    type: RETRIEVE_USER,
    payload: user
});

export const updateUser = (user, currentUser) => async(dispatch) => {
    const { username, email, password, id, profilePhoto } = user;
    const response = await csrfFetch(`/api/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token"),
        },
        body: (user)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(retrieveUser(data));
    };

    return response;
}

const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case RETRIEVE_USER:{
            return {...state, user: action.payload}
        }
        default: 
            return state;
    }
}

export default usersReducer;