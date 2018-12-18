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

  renderActiveMenuItemIndicator() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 390"
        style={{ width: 48 }}
      >
        <defs>
          <style>{`.a{fill:#fff;}`}</style>
        </defs>
        <title>koro-marker 1</title>
        <path
          className="a"
          d="M0,391c48.46,0,89.94-28.71,108-72.19,1-2.79,83.6-242.89,83.6-242.89S217.87,1.47,300.92,1.47c49.73,0,92.12,30.23,109.17,74.45.81,1.82,84.12,246,84.12,246S523,391,600,391H0Z"
        />
      </svg>
    )
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

                  {activeTab === tab && this.renderActiveMenuItemIndicator()}
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
