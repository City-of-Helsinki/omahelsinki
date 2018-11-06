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

    return (
      <Fade in={this.state.show}>
        {messages &&
          messages.map((message, i) => (
            <Alert key={i} color={message.color}>
              {message.message}
            </Alert>
          ))}
      </Fade>
    )
  }
}

export default Toast
