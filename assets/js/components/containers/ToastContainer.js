import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  addMessage,
  removeMessage,
  removeMessages
} from '../Message/message-redux'

import Toast from '../Message/Toast'

export default connect(
  state => ({
    messages: state.message.get('messages')
  }),
  dispatch =>
    bindActionCreators(
      {
        addMessage,
        removeMessage,
        removeMessages
      },
      dispatch
    )
)(Toast)
