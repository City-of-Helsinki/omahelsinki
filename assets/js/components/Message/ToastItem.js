import React from 'react'
import { Alert, Fade } from 'reactstrap'

class ToastItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  componentDidMount() {
    const { message, removeMessage } = this.props
    if (message && message.autoHide === true && !this.state.show) {
      this.setState({ show: true })
      this.isClosed = true

      setTimeout(() => {
        this.setState({
          show: false
        })
        removeMessage(message.id)
      }, 3000)
    }
  }

  renderFadingAlert(message) {
    return <Fade in={this.state.show}>{this.renderAlert(message)}</Fade>
  }

  renderAlert(message) {
    return (
      <Alert color={message.color}>
        {message.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Alert>
    )
  }

  render() {
    const { message } = this.props

    return message.autoHide
      ? this.renderFadingAlert(message)
      : this.renderAlert(message)
  }
}

export default ToastItem
