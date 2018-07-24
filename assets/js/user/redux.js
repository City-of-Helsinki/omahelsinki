import {createActions, handleActions} from 'redux-actions';
import axios from 'axios'


export const {
    getProfile, getProfileSuccess, getProfileError,
    updateProfile, updateProfileSuccess, updateProfileError,
    setUserProfile,
} = createActions({
    GET_PROFILE: undefined,
    GET_PROFILE_SUCCESS: undefined,
    GET_PROFILE_ERROR: error => ({error}),
    UPDATE_PROFILE: payload => ({payload}),
    UPDATE_PROFILE_SUCCESS: undefined,
    UPDATE_PROFILE_ERROR: error => ({error}),
    SET_USER_PROFILE: user => ({user}),
})

const userDefaultState = {
    user: {},
    error: null,
}
export const userReducer = handleActions(
    new Map([
        [
            getProfile, (state, action) => ({
                ...state,
                error: userDefaultState.error,
            }),
        ],
        [
            getProfileSuccess, (state, action) => ({
                ...state,
                error: userDefaultState.error,
            }),
        ],
        [
            getProfileError, (state, action) => ({
                ...state,
                error: action.payload,
            }),
        ],
        [
            updateProfile,
        ],
        [
            updateProfileSuccess, (state, action) => ({
                ...state,
                error: userDefaultState.error,
            }),
        ],
        [
            updateProfileError, (state, action) => ({
                ...state,
                error: action.payload.error,
            }),
        ],
        [
            setUserProfile, (state, action) => ({
                ...state,
                user: action.payload.user,
            }),
        ],
    ]),
    userDefaultState
);

export const fetchUserData = () => {
    return async (dispatch) => {
        dispatch(getProfile())

        try {
            const response = await axios.get('https://profile-api.test.hel.ninja/profile-test/v1/profile/')
            dispatch(getProfileSuccess())
            dispatch(setUserProfile(response))
        } catch (error) {
            dispatch(getProfileError(error))
        }

    }
}
