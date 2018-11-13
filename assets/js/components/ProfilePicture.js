import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserData } from '../user/redux'
import HelIcon from './HelIcon'

class ProfilePicture extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
    const { user } = this.props
    const hasImage = Boolean(user.image)

    return hasImage ? (
      <div className="greetings-user-image">
        <img src={user.image} alt="profile" />
      </div>
    ) : (
      <div className="greetings-icon-container">
        <HelIcon iconName="user-o" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
})

export default connect(
  mapStateToProps,
  { fetchUserData }
)(ProfilePicture)
