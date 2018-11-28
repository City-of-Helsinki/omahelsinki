import React from 'react'

import { connect } from 'react-redux'

import { Container, Col } from 'reactstrap'
import Menu from '../../containers/MyPage/MenuContainer'
import Greetings from '../../Greetings'

function MyPageLayout(props) {
  const { children, location, tunnistamoUser } = props
  return (
    <div className="oma-main">
      <Greetings tunnistamoUser={tunnistamoUser} />

      <Menu location={location} />

      <div className="oma-tab-container">
        <Container>
          <Col xs={12}>
            <div className="oma-tab-content">{children}</div>
          </Col>
        </Container>
      </div>
    </div>
  )
}

export default connect(state => ({
  user: state.userReducer.user,
  tunnistamoUser: state.userReducer.tunnistamoUser
}))(MyPageLayout)
