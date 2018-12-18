import { createActions, handleActions } from 'redux-actions'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import {
  profileApiUrl,
  tunnistamoUrl,
  tunnistamoToken,
  profileToken,
  tunnistamoUser
} from '../settings'

import {
  addWarningMessage,
  addDangerMessage
} from '../components/Message/message-redux'

import createClient from '../util/client'

const userUuid = tunnistamoUser ? tunnistamoUser.uuid : null

const profileRequest = createClient({
  baseURL: profileApiUrl,
  headers: {
    Authorization: `Bearer ${profileToken}`
  }
})

const tunnistamoRequest = createClient({
  baseURL: tunnistamoUrl,
  headers: {
    Authorization: `Bearer ${tunnistamoToken}`
  }
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
  getAllHistoryDataError
} = createActions({
  GET_ALL_INTERESTS: undefined,
  GET_ALL_INTERESTS_SUCCESS: undefined,
  GET_ALL_INTERESTS_ERROR: error => ({ error }),

  GET_INTEREST: undefined,
  GET_INTEREST_SUCCESS: undefined,
  GET_INTEREST_ERROR: error => ({ error }),
  SET_INTEREST: interest => ({ interest }),

  GET_ALL_REGIONS: undefined,
  GET_ALL_REGIONS_SUCCESS: undefined,
  GET_ALL_REGIONS_ERROR: error => ({ error }),
  ADD_REGION: region => ({ region }),

  GET_ALL_HISTORY_DATA: undefined,
  GET_ALL_HISTORY_DATA_SUCCESS: undefined,
  GET_ALL_HISTORY_DATA_ERROR: error => ({ error })
})

export const {
  newUser,
  newUserSuccess,
  newUserError,

  getProfile,
  getProfileSuccess,
  getProfileError,

  updateProfile,
  updateProfileSuccess,
  updateProfileError,
  setUserProfile,

  deleteProfile,
  deleteProfileSuccess,
  deleteProfileError
} = createActions({
  NEW_USER: undefined,
  NEW_USER_SUCCESS: undefined,
  NEW_USER_ERROR: error => ({ error }),

  GET_PROFILE: undefined,
  GET_PROFILE_SUCCESS: undefined,
  GET_PROFILE_ERROR: error => ({ error }),

  UPDATE_PROFILE: payload => ({ payload }),
  UPDATE_PROFILE_SUCCESS: undefined,
  UPDATE_PROFILE_ERROR: error => ({ error }),
  SET_USER_PROFILE: user => ({ user }),

  DELETE_PROFILE: undefined,
  DELETE_PROFILE_SUCCESS: undefined,
  DELETE_PROFILE_ERROR: error => ({ error })
})

const userDefaultState = {
  allInterests: [],
  allInterestsError: null,
  allInterestsLoading: false,

  allRegions: [],
  allRegionsError: null,
  allRegionsLoading: false,

  allHistoryData: [],
  allHistoryDataError: null,
  allHistoryDataLoading: false,

  newUser: [],
  newUserError: null,
  newUserLoading: false,

  deleteProfileLoading: false,
  deleteProfileError: null,

  getProfileError: null,
  saveProfileError: null,
  user: {},
  interests: {},
  userRegion: {},
  tunnistamoUser: tunnistamoUser,
  userLoading: true
}

export const userReducer = handleActions(
  new Map([
    [
      getAllInterests,
      (state, action) => {
        return { ...state, deleteProfileError: null, allInterestsLoading: true }
      }
    ],
    [
      getAllInterestsSuccess,
      (state, action) => {
        return {
          ...state,
          allInterestsError: null,
          allInterestsLoading: false,
          allInterests: action.payload.results
        }
      }
    ],
    [
      getAllInterestsError,
      (state, action) => {
        return {
          ...state,
          allInterestsError: action.error,
          allInterestsLoading: false
        }
      }
    ],

    [
      getAllRegions,
      (state, action) => {
        return { ...state, allRegionsError: null, allRegionsLoading: true }
      }
    ],
    [
      getAllRegionsSuccess,
      (state, action) => {
        return {
          ...state,
          allRegionsError: null,
          allRegionsLoading: false,
          allRegions: action.payload.results
        }
      }
    ],
    [
      getAllRegionsError,
      (state, action) => {
        return {
          ...state,
          allRegionsError: action.error,
          allRegionsLoading: false
        }
      }
    ],
    [
      getAllHistoryData,
      (state, action) => {
        return {
          ...state,
          allHistoryDataError: null,
          allHistoryDataLoading: true
        }
      }
    ],
    [
      getAllHistoryDataSuccess,
      (state, action) => {
        return {
          ...state,
          allHistoryDataError: null,
          allHistoryDataLoading: false,
          allHistoryData: action.payload
        }
      }
    ],
    [
      getAllHistoryDataError,
      (state, action) => {
        return {
          ...state,
          allHistoryDataError: action.error,
          allHistoryDataLoading: false
        }
      }
    ],
    [
      getProfile,
      (state, action) => ({
        ...state,
        getProfileError: userDefaultState.error,
        userLoading: true
      })
    ],
    [
      getProfileSuccess,
      (state, action) => {
        return {
          ...state,
          getProfileError: userDefaultState.error,
          userLoading: false
        }
      }
    ],
    [
      getProfileError,
      (state, action) => ({
        ...state,
        getProfileError: action.payload,
        userLoading: false
      })
    ],
    [
      updateProfile,
      (state, action) => ({
        ...state,
        saveProfileError: null
      })
    ],
    [
      updateProfileSuccess,
      (state, action) => ({
        ...state,
        saveProfileError: userDefaultState.error
      })
    ],
    [
      updateProfileError,
      (state, action) => ({
        ...state,
        saveProfileError: !isEmpty(action.payload.error)
          ? action.payload.error
          : true
      })
    ],
    [
      setUserProfile,
      (state, action) => ({
        ...state,
        user: action.payload.user
      })
    ],
    [getInterest],
    [
      getInterestSuccess,
      (state, action) => ({
        ...state,
        error: userDefaultState.error
      })
    ],
    [
      getInterestError,
      (state, action) => ({
        ...state,
        error: action.error
      })
    ],
    [
      setInterest,
      (state, action) => ({
        ...state,
        interests: action.payload.interest
      })
    ],
    [
      newUser,
      (state, action) => {
        return { ...state, newUserError: null, newUserLoading: true }
      }
    ],
    [
      newUserSuccess,
      (state, action) => {
        return {
          ...state,
          newUserError: null,
          newUserLoading: false,
          user: action.payload
        }
      }
    ],
    [
      newUserError,
      (state, action) => {
        return { ...state, newUserError: action.error, newUserLoading: false }
      }
    ],
    [
      deleteProfile,
      (state, action) => {
        return {
          ...state,
          deleteProfileLoading: true,
          deleteProfileError: null
        }
      }
    ],
    [
      deleteProfileError,
      (state, action) => {
        return {
          ...state,
          deleteProfileLoading: false,
          deleteProfileError: action.error
        }
      }
    ],
    [
      deleteProfileSuccess,
      (state, action) => {
        return {
          ...state,
          deleteProfileLoading: false,
          deleteProfileError: null
        }
      }
    ]
  ]),
  userDefaultState
)

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    dispatch(getProfile())

    try {
      const response = await profileRequest.get(`/profile/${userUuid}/`)
      dispatch(setUserProfile(response.data))
      dispatch(getProfileSuccess())
    } catch (error) {
      dispatch(getProfileError(error))
    }
  }
}

//creating new user onboarding
export const createNewUser = payload => {
  return async dispatch => {
    try {
      const response = await profileRequest.post(`/profile/`, payload)
      dispatch(newUserSuccess(response.data))
    } catch (error) {
      dispatch(newUserError(error))
    }
  }
}

export const removeProfileImage = (payload, intl) => {
  return dispatch => {
    dispatch(updateUserData(payload)).then(
      result => {
        dispatch(
          addWarningMessage(
            intl.formatMessage({ id: 'app.profile.picture.deleted' })
          )
        )
      },
      error =>
        dispatch(
          addDangerMessage(
            intl.formatMessage({
              id: 'app.profile.picture.error.onDelete'
            })
          )
        )
    )
  }
}

export const updateUserData = payload => {
  return async dispatch => {
    dispatch(updateProfile())

    try {
      const response = await profileRequest.patch(
        `/profile/${userUuid}/`,
        payload
      )

      dispatch(updateProfileSuccess())
      dispatch(setUserProfile(response.data))
      return Promise.resolve(true)
    } catch (error) {
      dispatch(updateProfileError(error))
      return Promise.reject(new Error('Could not remove profile image'))
    }
  }
}

export const fetchAllInterests = () => {
  return async dispatch => {
    dispatch(getAllInterests())
    try {
      const response = await profileRequest.get(`/interest-concept/`)
      dispatch(getAllInterestsSuccess(response.data))
    } catch (error) {
      dispatch(getAllInterestsError(error))
    }
  }
}

export const getUserInterest = payload => {
  return async dispatch => {
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
  return async dispatch => {
    dispatch(getAllRegions())
    try {
      const response = await profileRequest.get(`/geo-division/?limit=200`)
      dispatch(getAllRegionsSuccess(response.data))
    } catch (error) {
      dispatch(getAllRegionsError(error))
    }
  }
}

export const fetchAllHistoryData = () => {
  return async dispatch => {
    dispatch(getAllHistoryData())
    try {
      const [r1, r2] = await Promise.all([
        tunnistamoRequest.get(`/v1/user_login_entry/`),
        tunnistamoRequest.get(`/v1/service/`)
      ])
      const entries = r1.data.results
      const services = r2.data.results
      const data = entries.map(historyEntry => {
        const service = find(services, { id: historyEntry.service })
        return { ...historyEntry, service }
      })
      dispatch(getAllHistoryDataSuccess(data))
    } catch (error) {
      dispatch(getAllHistoryDataError(error))
    }
  }
}

export const deleteUserProfile = intl => {
  return async dispatch => {
    dispatch(deleteProfile())
    try {
      await profileRequest.delete(`/profile/${userUuid}/`)
      dispatch(deleteProfileSuccess())

      dispatch(
        addWarningMessage(intl.formatMessage({ id: 'app.profile.deleted' }))
      )

      setTimeout(() => {
        window.location.href = '/logout'
      }, 2000)
    } catch (error) {
      dispatch(deleteProfileError(error))
    }
  }
}
