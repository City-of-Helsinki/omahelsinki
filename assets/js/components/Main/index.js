import React, {Component} from 'react';

import {Profile, Service, Interest, History} from '../Tab'

import {Container, TabContent, TabPane, Nav, NavItem, NavLink, Col} from 'reactstrap'
import {FormattedMessage, injectIntl} from 'react-intl'
import HelIcon from '../HelIcon'

import classNames from 'classnames/bind';

import {connect} from 'react-redux'
import {fetchUserData} from '../../user/redux'

const TABS = {
    PROFILE: 'profile',
    INTERESTS: 'interests',
    SERVICES: 'services',
    HISTORY: 'history',
    // SETTINGS: 'settings',
}

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: TABS.PROFILE,
        }
    }

    componentDidMount() {
        this.props.fetchUserData()
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            })
        }
    }

    render() {
        const {activeTab} = this.state
        const {intl, tunnistamoUser, user} = this.props
        const hasImage = Boolean(user.image)

        return (
            <div className="oma-main">
                <div className="greetings-container">
                    {
                        hasImage ? (
                            <div className="greetings-user-image" >
                                <img src={user.image} alt="profile" />
                            </div>
                        ) : (
                            <div className="greetings-icon-container">
                                <HelIcon iconName="user-o"></HelIcon>
                            </div>
                        )
                    }

                    <div className="greetings-text-container">
                        <h2 className="greetings-text"><span>{intl.formatMessage({id: 'app.hello'})} {tunnistamoUser.first_name}</span></h2>
                    </div>
                </div>
                <Nav tabs className="oma-tabs">
                    {Object.values(TABS).map((tab, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink
                                    className={classNames({active: activeTab === tab})}
                                    onClick={() => this.toggleTab(tab)}
                                >
                                    <FormattedMessage id={`app.${tab}`} /> 
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                
                <div className="oma-tab-container">
                    <Container >
                        <Col xs={12}>
                            <TabContent activeTab={this.state.activeTab} className="oma-tab-content">
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
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    tunnistamoUser: state.userReducer.tunnistamoUser,
})

export default connect(mapStateToProps, {fetchUserData})(injectIntl(MainPage))
