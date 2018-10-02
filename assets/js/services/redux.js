import {createActions, handleActions} from 'redux-actions'
import axios from 'axios'

import {tunnistamoUrl} from '../settings'

const axiosConfig = {
    baseURL: tunnistamoUrl,
}
const axiosInstance = axios.create(axiosConfig)


export const {
    getAllServices,
    getAllServicesSuccess,
    getAllServicesError,
    getUserServices,
    getUserServicesSuccess,
    getUserServicesError,
} = createActions({
    GET_ALL_SERVICES: undefined,
    GET_ALL_SERVICES_SUCCESS: undefined,
    GET_ALL_SERVICES_ERROR: (error) => ({error}),
    GET_USER_SERVICES: undefined,
    GET_USER_SERVICES_SUCCESS: undefined,
    GET_USER_SERVICES_ERROR: (error) => ({error}),
})

const servicesDefaultState = {
    allServices: [],
    allServicesError: null,
    allServicesLoading: false,
    userServices: [],
    userServicesError: null,
    userServicesLoading: false,
}
export const servicesReducer = handleActions(new Map([
    [
        getAllServices, (state, action) => {
            return {...state, allServicesError: null, allServicesLoading: true}
        },
    ],
    [
        getAllServicesSuccess, (state, action) => {
            return {...state, allServicesError: null, allServicesLoading: false, allServices: action.payload.results}
        },
    ],
    [
        getAllServicesError, (state, action) => {
            return {...state, allServicesError: action.error, allServicesLoading: false}
        },
    ],
    [
        getUserServices, (state, action) => {
            return {...state, userServicesError: null, userServicesLoading: true}
        },
    ],
    [
        getUserServicesSuccess, (state, action) => {
            return {...state, userServicesError: null, userServicesLoading: false, userServices: action.payload.results}
        },
    ],
    [
        getUserServicesError, (state, action) => {
            return {...state, userServicesError: action.error, userServicesLoading: false}
        },
    ],
]), servicesDefaultState);


export const fetchAllServices = () => {
    return async (dispatch) => {
        dispatch(getAllServices())
        try {
            const response = await axiosInstance.get(`/v1/service/`)
            dispatch(getAllServicesSuccess(response.data))
        } catch (error) {
            dispatch(getAllServicesError(error))
        }
    }
}

export const fetchUserServices = () => {
    return async (dispatch) => {
        dispatch(getUserServices())
        try {
            const response = await axiosInstance.get(`/v1/`)
            dispatch(getUserServicesSuccess(response.data))
        } catch (error) {
            dispatch(getUserServices(error))
        }
    }
}
