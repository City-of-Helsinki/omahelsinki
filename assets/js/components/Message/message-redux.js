import { List, Map } from 'immutable'

export const ADD_MESSAGE = 'oma-helsinki/message/ADD_MESSAGE'
const REMOVE_MESSAGE = 'oma-helsinki/message/REMOVE_MESSAGE'
const REMOVE_MESSAGES = 'oma-helsinki/message/REMOVE_MESSAGES'

const initialState = Map({
  messages: new List()
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.update('messages', messages => messages.push(action.payload))

    case REMOVE_MESSAGE: {
      return state.deleteIn([
        'messages',
        state.get('messages').findIndex(item => item.id === action.payload)
      ])
    }

    case REMOVE_MESSAGES:
      return state.set('messages', List())

    default:
      return state
  }
}

export function addDangerMessage(message) {
  return addMessage(message, 'danger', false)
}

export function addWarningMessage(message) {
  return addMessage(message, 'warning')
}

export function addInfoMessage(message) {
  return addMessage(message, 'info')
}

export function addSuccessMessage(message) {
  return addMessage(message, 'success')
}

export function addMessage(message, color, autoHide = true) {
  const id = new Date().toISOString()

  return { type: ADD_MESSAGE, payload: { id, message, color, autoHide } }
}

export function removeMessage(id) {
  return { type: REMOVE_MESSAGE, payload: id }
}
export function removeMessages() {
  return { type: REMOVE_MESSAGES }
}
