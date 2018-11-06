import React from 'react'
import { Alert, Fade } from 'reactstrap'

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  componentDidUpdate(prevProps) {
    const { statusUpdated } = this.props

    if (statusUpdated && statusUpdated !== prevProps.statusUpdated) {
      this.setState({ show: true })

      setTimeout(() => {
        this.setState({
          show: false
        })
      }, 3000)
    }
  }

  render() {
    const { color, message } = this.props

    return (
      <Fade in={this.state.show}>
        <Alert color={color}>{message}</Alert>
      </Fade>
    )
  }
}

export default Toast
