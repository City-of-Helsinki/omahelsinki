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

    getConsents,
    getConsentsSuccess,
    getConsentsError,

    deleteConsent,
    deleteConsentSuccess,
    deleteConsentError,
} = createActions({
    GET_ALL_SERVICES: undefined,
    GET_ALL_SERVICES_SUCCESS: undefined,
    GET_ALL_SERVICES_ERROR: (error) => ({error}),

    GET_CONSENTS: undefined,
    GET_CONSENTS_SUCCESS: undefined,
    GET_CONSENTS_ERROR: (error) => ({error}),

    DELETE_CONSENT: undefined,
    DELETE_CONSENT_SUCCESS: undefined,
    DELETE_CONSENT_ERROR: (error) => ({error}),
})

const servicesDefaultState = {
    allServices: [],
    allServicesError: null,
    allServicesLoading: false,
    consents: [],
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
        getConsentsSuccess, (state, action) => {
            return {...state, consents: action.payload.results}
        },
    ],
    [
        deleteConsentSuccess, (state, action) => {
            const consents = state.consents.filter(x => x.id !== action.payload.id)
            return {...state, consents}
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

export const fetchConsents = () => {
    return async (dispatch) => {
        dispatch(getConsents())
        try {
            const conf = {
                headers: {
                    'Authorization': `Bearer ${tunnistamoToken}`,
                },
            }
            const response = await axiosInstance.get(`/v1/user_consent/`, conf)
            dispatch(getConsentsSuccess(response.data))
        } catch (error) {
            dispatch(getConsentsError(error))
        }
    }
}

export const deleteServiceConsent = (consent) => {
    return async (dispatch) => {
        dispatch(deleteConsent(consent))
        try {
            const conf = {
                headers: {
                    'Authorization': `Bearer ${tunnistamoToken}`,
                },
            }
            await axiosInstance.delete(`/v1/user_consent/${consent.id}/`, conf)
            dispatch(deleteConsentSuccess(consent))
        } catch (error) {
            dispatch(deleteConsentError(error))
        }
    }
}
