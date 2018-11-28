import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import Menu from '../../MyPage/Menu'

class MenuContainer extends React.Component {
  render() {
    const { intl, user, tunnistamoUser, location } = this.props

    return (
      <Menu
        location={location}
        intl={intl}
        user={user}
        tunnistamoUser={tunnistamoUser}
      />
    )
  }
}

export default connect(state => ({
  user: state.userReducer.user,
  tunnistamoUser: state.userReducer.tunnistamoUser
}))(injectIntl(MenuContainer))
