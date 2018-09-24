import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'
import {getUserInterest, fetchAllInterests, fetchAllRegions} from '../../../user/redux'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'
import HelSelect from '../../HelSelect'
import {mockTopics} from '../../../__MOCKS__'

class Interest extends Component { 

    UNSAFE_componentWillMount() {
        [
            this.props.getUserInterest(),
            this.props.fetchAllInterests(),
            this.props.fetchAllRegions(),
        ]
    } 
    render() {
        
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
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.areas"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.areas.text" /></p>
                            <HelSelect 
                                options={null}
                                multi={true}
                                searchable={true}
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

export default connect(mapStateToProps, {getUserInterest, fetchAllInterests, fetchAllRegions})(Interest)

