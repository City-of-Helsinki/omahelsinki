import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'
import {getUserInterest} from '../../../user/redux'
import {isEmpty} from 'lodash'

import {connect} from 'react-redux'

import {mockDecisions, mockTopics} from '../../../__MOCKS__'

class Interest extends Component {
    constructor(props){
        super(props);
        this.state = {
            interestTopics: [],
        }
    }

    UNSAFE_componentWillMount() {
        this.props.dispatch(getUserInterest())
    } 
    componentDidMount(){
        fetch('https://profile-api.test.hel.ninja/profile-test/v1/interest-concept/')
            .then(response=>response.json())
            .then(response=>{
                this.setState({
                    interestTopics:response.results,
                })
            })
            .catch(error=>console.log(error))
    }

    render() {
        const interestTopics = this.state.interestTopics.filter(interestTopic => interestTopic.label.en !== this.props.interests.label)
        console.log('interestTopics',this.state.interestTopics)
        console.log('interests',this.props.interests)
        const filteredInterests = interestTopics.map((interestTopic, i)=>(
            <li key={i}>{interestTopic.label.en}</li>
        ))
        return (
            <div className="interests-view">
                <section>
                    <Row>
                        <Col xs={12}>
                            <h1><FormattedMessage id="app.interests"/></h1>
                            <p className="lead"><FormattedMessage id="app.interests.text"/></p>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.topics"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.topics.text" /></p>
                            <HelCheckbox 
                                data={this.props.interests}
                            />
                            <div>{filteredInterests}</div>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.areas"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.areas.text" /></p>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.decision"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.decision.text" /></p>
                            <HelCheckbox 
                                data={mockDecisions}
                            />
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

const mapStateToProps = ({intl, userReducer}) => {
    let interests
    const language = intl.locale
    if(userReducer && !isEmpty(userReducer.interests)) {
        interests = userReducer.interests.map(interest => ({
            id: interest.code,
            label: interest.label[language],
        }))
    } else {
        interests = mockTopics
    }

    return {
        language,
        interests,
    }
}

export default connect(mapStateToProps)(Interest)

