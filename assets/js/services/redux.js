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
    userServices: [],
    error: null,
    loading: false,
}
export const servicesReducer = handleActions(new Map([
    [
        getAllServices, (state, action) => {
            return {...state, error: servicesDefaultState.error, loading: true}
        },
    ],
    [
        getAllServicesSuccess, (state, action) => {
            return {...state, error: servicesDefaultState.error, loading: false, allServices: action.payload.results}
        },
    ],
    [
        getAllServicesError, (state, action) => {
            return {...state, error: action.error, loading: false}
        },
    ],
    [
        getUserServices, (state, action) => {
            return {...state, error: servicesDefaultState.error, loading: true}
        },
    ],
    [
        getUserServicesSuccess, (state, action) => {
            return {...state, error: servicesDefaultState.error, loading: false, userServices: action.payload.results}
        },
    ],
    [
        getUserServicesError, (state, action) => {
            return {...state, error: action.error, loading: false}
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
