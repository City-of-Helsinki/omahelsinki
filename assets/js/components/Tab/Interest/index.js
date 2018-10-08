import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import {connect} from 'react-redux'

import HelCheckbox from '../../HelCheckbox'
import {fetchAllInterests, updateUserData} from '../../../user/redux'


class Interest extends Component {

    componentDidMount() {
        this.props.fetchAllInterests()
    }

    interestChange = (selectedValues) => {
        const ids = selectedValues.map(item => item.id)
        this.props.updateUserData({concepts_of_interest: ids})
    }

    render() {
        const {userInterests, allInterests, language} = this.props
        const interests = allInterests.map(interest => {
            const id = `${interest.vocabulary}:${interest.code}`
            return {
                id,
                label: interest.label[language],
                selected: userInterests.includes(id),
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
                            <HelCheckbox 
                                data={interests}
                                onChange={this.interestChange}
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
    return {
        userInterests: state.userReducer.user.concepts_of_interest,
        allInterests: state.userReducer.allInterests,
        language: state.intl.locale,
    }
}

export default connect(mapStateToProps, {fetchAllInterests, updateUserData})(Interest)
