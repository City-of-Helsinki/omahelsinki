import {createActions, handleActions} from 'redux-actions'
import axios from 'axios'
import find from 'lodash/find'
import {profileApiUrl, tunnistamoUrl, tunnistamoToken, profileToken, tunnistamoUser} from '../settings'

const userUuid = tunnistamoUser.uuid


const profileRequest = axios.create({
    baseURL: profileApiUrl,
    headers: {
        'Authorization': `Bearer ${profileToken}`,
    },
})

const tunnistamoRequest = axios.create({
    baseURL: tunnistamoUrl,
    headers: {
        'Authorization': `Bearer ${tunnistamoToken}`,
    },
})

export const {
    getAllInterests,
    getAllInterestsSuccess,
    getAllInterestsError,

    getInterest,
    getInterestSuccess,
    getInterestError,
    setInterest,

    getAllRegions,
    getAllRegionsSuccess,
    getAllRegionsError,
    addRegion,

    getAllHistoryData,
    getAllHistoryDataSuccess,
    getAllHistoryDataError,
} = createActions({
    GET_ALL_INTERESTS: undefined,
    GET_ALL_INTERESTS_SUCCESS: undefined,
    GET_ALL_INTERESTS_ERROR: (error) => ({error}),

    GET_INTEREST: undefined,
    GET_INTEREST_SUCCESS: undefined,
    GET_INTEREST_ERROR: error => ({error}),
    SET_INTEREST: interest => ({interest}),

    GET_ALL_REGIONS: undefined,
    GET_ALL_REGIONS_SUCCESS: undefined,
    GET_ALL_REGIONS_ERROR: (error) => ({error}),
    ADD_REGION: region => ({region}),

    GET_ALL_HISTORY_DATA: undefined,
    GET_ALL_HISTORY_DATA_SUCCESS: undefined,
    GET_ALL_HISTORY_DATA_ERROR: (error) => ({error}),
})

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
    allInterests: [],
    allInterestsError: null,
    allInterestsLoading:false,
    allRegions: [],
    allRegionsError: null,
    allRegionsLoading:false,
    allHistoryData: [],
    allHistoryDataError: null,
    allHistoryDataLoading:false,
    user: {},
    error: null,
    interests: {},
    userRegion: {},
    tunnistamoUser: tunnistamoUser,
}
export const userReducer = handleActions(
    new Map([
        [
            getAllInterests, (state, action) => {
                return {...state, allInterestsError: null, allInterestsLoading: true}
            },
        ],
        [
            getAllInterestsSuccess, (state, action) => {
                return {...state, allInterestsError: null, allInterestsLoading: false, allInterests: action.payload.results}
            },
        ],
        [
            getAllInterestsError, (state, action) => {
                return {...state, allInterestsError: action.error, allInterestsLoading: false}
            },
        ],

        [
            getAllRegions, (state, action) => {
                return {...state, allRegionsError: null, allRegionsLoading: true}
            },
        ],
        [
            getAllRegionsSuccess, (state, action) => {
                return {...state, allRegionsError: null, allRegionsLoading: false, allRegions: action.payload.results}
            },
        ],
        [
            getAllRegionsError, (state, action) => {
                return {...state, allRegionsError: action.error, allRegionsLoading: false}
            },
        ],
        [
            getAllHistoryData, (state, action) => {
                return {...state, allHistoryDataError: null, allHistoryDataLoading: true}
            },
        ],
        [
            getAllHistoryDataSuccess, (state, action) => {
                return {...state, allHistoryDataError: null, allHistoryDataLoading: false, allHistoryData: action.payload}
            },
        ],
        [
            getAllHistoryDataError, (state, action) => {
                return {...state, allHistoryDataError: action.error, allHistoryDataLoading: false}
            },
        ],
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
        [
            getInterest,
        ],
        [
            getInterestSuccess, (state, action) => ({
                ...state,
                error: userDefaultState.error,
            }),
        ],
        [
            getInterestError, (state, action) => ({
                ...state,
                error: action.error,
            }),
        ],
        [
            setInterest, (state, action) => ({
                ...state,
                interests: action.payload.interest,  
            }),
        ],
        
    ]),
    userDefaultState
);

export const fetchUserData = () => {
    return async (dispatch) => {
        dispatch(getProfile())

        try {
            const response = await profileRequest.get(`/profile/${userUuid}/`)
            dispatch(getProfileSuccess())
            dispatch(setUserProfile(response.data))
        } catch (error) {
            dispatch(getProfileError(error))
        }

    }
}

export const updateUserData = (payload) => {
    return async (dispatch) => {
        dispatch(updateProfile())

        try {
            const response = await profileRequest.patch(`/profile/${userUuid}/`, payload)
            dispatch(updateProfileSuccess())
            dispatch(setUserProfile(response.data))
        } catch (error) {
            dispatch(updateProfileError(error))
        }
    }
}

export const fetchAllInterests = () => {
    return async (dispatch) => {
        dispatch(getAllInterests())
        try {
            const response = await profileRequest.get(`/interest-concept/`)
            dispatch(getAllInterestsSuccess(response.data))
        } catch (error) {
            dispatch(getAllInterestsError(error))
        }
    }
}

export const getUserInterest = (payload) => {
    return async (dispatch) => {
        dispatch(getInterest())

        try {
            const response = await profileRequest.get(`/interest-concept/`)
            dispatch(getInterestSuccess())
            dispatch(setInterest(response.data.results))
        } catch (error) {
            dispatch(getInterestError(error))
        }
    }
}

export const fetchAllRegions = () => {
    return async (dispatch) => {
        dispatch(getAllRegions())
        try {
            const response = await profileRequest.get(`/geo-division/?limit=200/`)
            dispatch(getAllRegionsSuccess(response.data))
        } catch (error) {
            dispatch(getAllRegionsError(error))
        }
    }
}

export const fetchAllHistoryData = () => {    
    return async (dispatch) => {
        dispatch(getAllHistoryData())
        try {
            const [r1, r2] = await Promise.all([
                tunnistamoRequest.get(`/v1/user_login_entry/`),
                tunnistamoRequest.get(`/v1/service/`),
            ])
            const entries = r1.data.results
            const services = r2.data.results
            const data = entries.map(historyEntry => {
                const service = find(services, {id: historyEntry.service})
                return {...historyEntry, service}
            })
            dispatch(getAllHistoryDataSuccess(data))
        } catch (error) {
            dispatch(getAllHistoryDataError(error))
        }
    }
}
