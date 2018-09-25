import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'
import {fetchAllInterests, fetchAllRegions} from '../../../user/redux'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'
import HelSelect from '../../HelSelect'
// import {mockTopics} from '../../../__MOCKS__'

class Interest extends Component { 

    UNSAFE_componentWillMount() {
        [
            // this.props.getUserInterest(),
            this.props.fetchAllInterests(),
            this.props.fetchAllRegions(),
        ]
    } 
    render() {
        const {interests, allInterest, language, allRegions} = this.props
        let interest
        if(isEmpty(interests)) {
            interest = allInterest.map(interest=>({
                id: interest.code,
                label: interest.label[language],
            }))
        } else {
            interest = allInterest.map(interest=>({
                id: interest.code,
                label: interest.label[language],
            })).filter(val => !interests.includes(val))
        }
        // if(isEmpty(allRegions)){
        //     region = allRegions.map(region=>({
        //         value: region.origin_id,
        //         label: region.name[language] || region.name['fi'],
        //     }))
        // }
        console.log('allregion', allRegions)
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
                                data={interest}
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

const mapStateToProps = (state) => {
    return {
        allInterest: state.userReducer.allInterests,
        interests: state.userReducer.interests,
        language: state.intl.locale,
        allRegions: state.userReducer.allRegions,
    }    
}

export default connect(mapStateToProps, {fetchAllInterests, fetchAllRegions})(Interest)

