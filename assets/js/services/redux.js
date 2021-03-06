import { createActions, handleActions } from 'redux-actions'

import { tunnistamoUrl, tunnistamoToken } from '../settings'
import { ADD_MESSAGE } from '../components/Message/message-redux'

import createClient from '../util/client'

const axiosConfig = {
  baseURL: tunnistamoUrl
}

const axiosInstance = createClient(axiosConfig)

export const {
  getAllServices,
  getAllServicesSuccess,
  getAllServicesError,

  getConsents,
  getConsentsSuccess,
  getConsentsError,

  deleteConsent,
  deleteConsentSuccess,
  deleteConsentError
} = createActions({
  GET_ALL_SERVICES: undefined,
  GET_ALL_SERVICES_SUCCESS: undefined,
  GET_ALL_SERVICES_ERROR: error => ({ error }),

  GET_CONSENTS: undefined,
  GET_CONSENTS_SUCCESS: undefined,
  GET_CONSENTS_ERROR: error => ({ error }),

  DELETE_CONSENT: undefined,
  DELETE_CONSENT_SUCCESS: undefined,
  DELETE_CONSENT_ERROR: error => ({ error })
})

const servicesDefaultState = {
  allServices: [],
  allServicesError: null,
  allServicesLoading: false,
  consents: [],
  consentsError: null,
  consentsLoading: false
}

export const servicesReducer = handleActions(
  new Map([
    [
      getAllServices,
      (state, action) => {
        return { ...state, allServicesError: null, allServicesLoading: true }
      }
    ],
    [
      getAllServicesSuccess,
      (state, action) => {
        return {
          ...state,
          allServicesError: null,
          allServicesLoading: false,
          allServices: action.payload.results
        }
      }
    ],
    [
      getAllServicesError,
      (state, action) => {
        return {
          ...state,
          allServicesError: action.error,
          allServicesLoading: false
        }
      }
    ],
    [
      getConsents,
      (state, action) => {
        return { ...state, consentsError: null, consentsLoading: true }
      }
    ],
    [
      getConsentsSuccess,
      (state, action) => {
        return {
          ...state,
          consents: action.payload.results,
          consentsLoading: false
        }
      }
    ],
    [
      getConsentsError,
      (state, action) => {
        return {
          ...state,
          consentsLoading: false,
          consentsError: action.payload
        }
      }
    ],
    [
      deleteConsentSuccess,
      (state, action) => {
        const consents = state.consents.filter(x => x.id !== action.payload.id)
        return { ...state, consents }
      }
    ]
  ]),
  servicesDefaultState
)

export const fetchAllServices = () => {
  return async dispatch => {
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
  return async dispatch => {
    dispatch(getConsents())
    try {
      const conf = {
        headers: {
          Authorization: `Bearer ${tunnistamoToken}`
        }
      }
      const response = await axiosInstance.get(
        `/v1/user_consent/?include=scope`,
        conf
      )
      dispatch(getConsentsSuccess(response.data))
    } catch (error) {
      dispatch(getConsentsError(error))
    }
  }
}

export const deleteServiceConsent = (consent, localizedServiceName, intl) => {
  return async dispatch => {
    dispatch(deleteConsent(consent))
    try {
      const conf = {
        headers: {
          Authorization: `Bearer ${tunnistamoToken}`
        }
      }
      await axiosInstance.delete(`/v1/user_consent/${consent.id}/`, conf)
      dispatch(deleteConsentSuccess(consent))
      dispatch({
        type: ADD_MESSAGE,
        payload: {
          message: intl.formatMessage(
            {
              id: 'app.profile.service.deleted'
            },
            { name: localizedServiceName }
          ),
          color: 'warning'
        }
      })
    } catch (error) {
      dispatch(deleteConsentError(error))
    }
  }
}
