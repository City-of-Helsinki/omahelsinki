import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import {connect} from 'react-redux'

import Loading from '../../Loading'
import HelCheckbox from '../../HelCheckbox'
import HelSelect from '../../HelSelect'
import {fetchAllInterests, updateUserData, fetchAllRegions} from '../../../user/redux'


class Interest extends Component {

    componentDidMount() {
        this.props.fetchAllInterests()
        this.props.fetchAllRegions()
    }

    interestChange = (selectedValues) => {
        const ids = selectedValues.map(item => item.id)
        this.props.updateUserData({concepts_of_interest: ids})
    }

    regionsChange = (selectedValues) => {
        const ids = selectedValues.map(item => item.value)
        this.props.updateUserData({divisions_of_interest: ids})
    }

    render() {
        const {
            userInterests,
            allInterests,
            isInterestsLoading,
            userRegions,
            allRegions,
            isRegionsLoading,
            language,
        } = this.props

        const interests = isInterestsLoading
            ? []
            : allInterests.map(interest => {
                const id = `${interest.vocabulary}:${interest.code}`
                return {
                    id,
                    label: interest.label[language] || interest.label['fi'],
                    selected: userInterests.includes(id),
                }
            })

        const regions = isRegionsLoading
            ? []
            : allRegions.map(region => {
                return {
                    label: region.name[language] || region.name['fi'],
                    value: region.ocd_id,
                }
            })

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
                            { isInterestsLoading
                                ? <Loading/>
                                : <HelCheckbox data={interests} onChange={this.interestChange} />
                            }
                        </Col>
                    </Row>
                </section>
                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.areas"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.areas.text" /></p>
                            { isRegionsLoading
                                ? <Loading/>
                                : (
                                    <HelSelect 
                                        options={regions}
                                        multi={true}
                                        searchable={true}
                                        selectedOption={userRegions}
                                        handleChange={this.regionsChange}
                                    />
                                )
                            }
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isRegionsLoading: state.userReducer.allRegionsLoading,
        isInterestsLoading: state.userReducer.allInterestsLoading,
        userRegions: state.userReducer.user.divisions_of_interest,
        userInterests: state.userReducer.user.concepts_of_interest,
        allRegions: state.userReducer.allRegions,
        allInterests: state.userReducer.allInterests,
        language: state.intl.locale,
    }
}

export default connect(mapStateToProps, {fetchAllInterests, fetchAllRegions, updateUserData})(Interest)
