import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'
import {fetchAllInterests, fetchAllRegions} from '../../../user/redux'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'
import HelSelect from '../../HelSelect'

class Interest extends Component { 

    UNSAFE_componentWillMount() {
        [
            // this.props.getUserInterest(),
            this.props.fetchAllInterests(),
            this.props.fetchAllRegions(),
        ]
    } 
    render() {
        const {interests, allInterest, language, allRegions, userRegion} = this.props
        const formatedallInterest = allInterest.map(interest=>({
            id: interest.code,
            label: interest.label[language],
        }))
        const formatedinterests = interests && interests.map(interest=>({
            id: interest.code,
            label: interest.label[language],
        }))
        let interest, region
        if(isEmpty(interests)) {
            interest = formatedallInterest
        } else {
            interest = allInterest.map(interest=>({
                id: interest.code,
                label: interest.label[language],
            })).filter(val => !formatedinterests.includes(val))
        }
        if(isEmpty(userRegion)){
            region = allRegions.map(region=>({
                value: region.origin_id,
                label: region.name[language] || region.name['fi'],
            }))
        } else{
            region = region = allRegions.map(region=>({
                value: region.origin_id,
                label: region.name[language] || region.name['fi'],
            })).filter(val => !userRegion.includes(val))
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
                                options={region}
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
        interests: state.userReducer.interests.interest,
        language: state.intl.locale,
        allRegions: state.userReducer.allRegions,
        userRegion: state.userReducer.userRegion,
    }    
}

export default connect(mapStateToProps, {fetchAllInterests, fetchAllRegions})(Interest)

