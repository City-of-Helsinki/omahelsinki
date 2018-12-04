import { List, Map } from 'immutable'

export const ADD_MESSAGE = 'oma-helsinki/message/ADD_MESSAGE'
const REMOVE_MESSAGES = 'oma-helsinki/message/REMOVE_MESSAGES'

const initialState = Map({
  messages: new List()
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.update('messages', messages => messages.push(action.payload))
    case REMOVE_MESSAGES:
      return state.set('messages', List())

    default:
      return state
  }
}

export function addMessage(message, color) {
  return { type: ADD_MESSAGE, payload: { message, color } }
}

export function removeMessages() {
  return { type: REMOVE_MESSAGES }
}
