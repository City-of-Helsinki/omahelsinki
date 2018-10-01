import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'
import {fetchAllInterests, getUserInterest} from '../../../user/redux'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'



class Interest extends Component {

    UNSAFE_componentWillMount() {
        [
            this.props.dispatch(getUserInterest()),
            this.props.dispatch(fetchAllInterests()),
        ]
    } 

    render() {
        const {userInterests, allInterests, language} = this.props
        const mappedAllInterests = allInterests.map(interest => ({
            id: interest.code,
            label: interest.label[language],
        }))
        
        let interests
        if(!isEmpty(userInterests)) {            
            const userMappedInterests = userInterests.map(interest => ({
                id: interest.code,
                label: interest.label[language],
            }))
            const unSelectedInterests = mappedAllInterests.filter(item => !userMappedInterests.find(item2 => item.id === item2.id))
            interests = userMappedInterests.concat(unSelectedInterests)
        } else {
            interests = mappedAllInterests
        }
        
        
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
                                data={interests}
                            />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        userInterests: state.userReducer.interests,
        allInterests: state.userReducer.allInterests,
        language: state.intl.locale,
    }
}

export default connect(mapStateToProps)(Interest)
