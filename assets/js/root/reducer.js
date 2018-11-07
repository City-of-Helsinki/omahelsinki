import { combineReducers } from 'redux'

import { localeReducer } from '../intl/redux'
import { userReducer } from '../user/redux'
import { servicesReducer } from '../services/redux'
import message from '../components/Message/message-redux'

export default combineReducers({
  userReducer: userReducer,
  intl: localeReducer,
  services: servicesReducer,
  message
})
