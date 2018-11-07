import React from 'react'
import { Alert, Fade } from 'reactstrap'

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  componentDidUpdate(prevProps) {
    const { messages, removeMessages } = this.props

    if (messages && messages !== prevProps.messages) {
      this.setState({ show: true })
      setTimeout(() => {
        removeMessages()
        this.setState({
          show: false
        })
      }, 3000)
    }
  }

  render() {
    const { messages } = this.props

    if (!messages || !messages.size) {
      return null
    }

    return (
      <div className="toast-messages">
        <Fade in={this.state.show}>
          {messages.map((message, i) => (
            <Alert key={i} color={message.color}>
              {message.message}
            </Alert>
          ))}
        </Fade>
      </div>
    )
  }
}

export default Toast
