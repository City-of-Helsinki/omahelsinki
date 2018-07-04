import React, {Component} from 'react';

import {Profile, Service, Interest, History} from '../Tab'

import {Container, TabContent, TabPane, Nav, NavItem, NavLink, Col} from 'reactstrap'
import {FormattedMessage} from 'react-intl'

import classNames from 'classnames/bind';

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

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            })
        }
    }

    render() {
        const {activeTab} = this.state

        return (
            <div className>
                <Nav tabs>
                    {Object.values(TABS).map((tab, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink
                                    className={{active: activeTab === tab}}
                                    onClick={() => this.toggleTab(tab)}
                                >
                                    <FormattedMessage id={`app.${tab}`} /> 
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                <div>
                    <Container >
                        <Col xs={12} sm={{size: 8, offset:2}}>
                            <TabContent activeTab={this.state.activeTab}>
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

export default MainPage;
