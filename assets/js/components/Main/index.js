import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { Profile, Service, Interest, History } from '../Tab'
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
import Greetings from '../Greetings'
import { addMessage } from '../Message/message-redux'

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

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const { activeTab } = this.state
    const { user } = this.props

    if (isEmpty(user)) {
      return <Redirect to="/welcome/" />
    }

    return (
      <div className="oma-main">
        <Greetings />

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

const mapStateToProps = state => ({
  user: state.userReducer.user,
  tunnistamoUser: state.userReducer.tunnistamoUser
})
export default connect(
  mapStateToProps,
  {
    addMessage
  }
)(MainPage)
