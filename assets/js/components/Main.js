import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { Profile, Service, Interest, History } from './Tab'
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col
} from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames/bind'
import Greetings from './Greetings'

import { fetchUserData } from '../user/redux'

const TABS = {
  PROFILE: 'profile',
  INTERESTS: 'interests',
  SERVICES: 'services',
  HISTORY: 'history'
}

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: TABS.PROFILE
    }
  }

  componentDidMount() {
    const { user, fetchUserData } = this.props

    if (isEmpty(user)) {
      fetchUserData()
    }
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const { activeTab } = this.state
    const { user, userLoading, tunnistamoUser } = this.props

    if (!userLoading && isEmpty(user)) {
      return <Redirect to="/welcome/" />
    }

    return (
      <div className="oma-main">
        <Greetings tunnistamoUser={tunnistamoUser} />

        <Nav tabs className="oma-tabs">
          {Object.values(TABS).map((tab, index) => {
            return (
              <NavItem key={index}>
                <NavLink
                  className={classNames({ active: activeTab === tab })}
                  onClick={() => this.toggleTab(tab)}
                >
                  <FormattedMessage id={`app.${tab}`} />
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>

        <div className="oma-tab-container">
          <Container>
            <Col xs={12}>
              <TabContent
                activeTab={this.state.activeTab}
                className="oma-tab-content"
              >
                <TabPane tabId={TABS.PROFILE}>
                  <Profile />
                </TabPane>

                <TabPane tabId={TABS.INTERESTS}>
                  <Interest />
                </TabPane>

                <TabPane tabId={TABS.SERVICES}>
                  <Service />
                </TabPane>

                <TabPane tabId={TABS.HISTORY}>
                  <History />
                </TabPane>
              </TabContent>
            </Col>
          </Container>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.userReducer.user,
    tunnistamoUser: state.userReducer.tunnistamoUser,
    userLoading: state.userReducer.userLoading
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchUserData
      },
      dispatch
    )
)(MainPage)
