import {createActions, handleActions} from 'redux-actions'
import axios from 'axios'

import {tunnistamoUrl, tunnistamoToken} from '../settings'

const axiosConfig = {
    baseURL: tunnistamoUrl,
}
const axiosInstance = axios.create(axiosConfig)


export const {
    getAllServices,
    getAllServicesSuccess,
    getAllServicesError,

    getServicesAuth,
    getServicesAuthSuccess,
    getServicesAuthError,

    deleteServiceConsent,
    deleteServiceConsentSuccess,
    deleteServiceConsentError,
} = createActions({
    GET_ALL_SERVICES: undefined,
    GET_ALL_SERVICES_SUCCESS: undefined,
    GET_ALL_SERVICES_ERROR: (error) => ({error}),

    GET_SERVICES_AUTH: undefined,
    GET_SERVICES_AUTH_SUCCESS: undefined,
    GET_SERVICES_AUTH_ERROR: (error) => ({error}),

    DELETE_SERVICE_CONSENT: undefined,
    DELETE_SERVICE_CONSENT_SUCCESS: undefined,
    DELETE_SERVICE_CONSENT_ERROR: (error) => ({error}),
})

const servicesDefaultState = {
    allServices: [],
    allServicesError: null,
    allServicesLoading: false,
    servicesAuth: [],
    servicesAuthError: null,
    servicesAuthLoading: false,
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
        getServicesAuth, (state, action) => {
            return {...state, servicesAuthError: null, servicesAuthLoading: true}
        },
    ],
    [
        getServicesAuthSuccess, (state, action) => {
            return {...state, servicesAuthError: null, servicesAuthLoading: false, servicesAuth: action.payload.results}
        },
    ],
    [
        getServicesAuthError, (state, action) => {
            return {...state, servicesAuthError: action.error, servicesAuthLoading: false}
        },
    ],
    [
        deleteServiceConsentSuccess, (state, action) => {
            const deletedService = action.payload
            const services = state.servicesAuth.map(x => {
                if (x.id === deletedService.id) {
                    x.consent_given = false
                }
                return x
            })
            return {...state, servicesAuth: services, servicesAuthLoading: false}
        },
    ],
]), servicesDefaultState)


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

export const fetchServicesAuth = () => {
    return async (dispatch) => {
        dispatch(getServicesAuth())
        try {
            const conf = {
                headers: {
                    'Authorization': `Bearer ${tunnistamoToken}`,
                },
            }
            const response = await axiosInstance.get(`/v1/service/`, conf)
            dispatch(getServicesAuthSuccess(response.data))
        } catch (error) {
            dispatch(getServicesAuth(error))
        }
    }
}

export const deleteConsent = (service) => {
    return async (dispatch) => {
        dispatch(deleteServiceConsent(service))
        try {
            const conf = {
                headers: {
                    'Authorization': `Bearer ${tunnistamoToken}`,
                },
            }
            await axiosInstance.delete(`/v1/user_consent/${service.id}/`, conf)
            dispatch(deleteServiceConsentSuccess(service))
        } catch (error) {
            dispatch(deleteServiceConsentError(error))
        }
    }
}
