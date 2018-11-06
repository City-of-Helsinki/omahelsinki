import { createActions, handleActions } from 'redux-actions'
import { List } from 'immutable'

export const { addMessage, removeMessage } = createActions({})

const defaultState = {
  messages: List()
}

export const messageReducer = handleActions()
