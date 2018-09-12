import React, {Component} from 'react';
import {Col, Row, Form, Button} from 'reactstrap'
import {FormattedMessage, injectIntl} from 'react-intl'
import HelTextInput from '../../HelTextInput'
import {connect} from 'react-redux'

import {fetchUserData, updateUserData} from '../../../user/redux'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            nickname: '',
        }
    }
    UNSAFE_componentWillMount() {
        this.props.dispatch(fetchUserData())
    } 

    handleInputChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id
        this.setState( {
            [name]: value,
        })
    }


    submitProfileInfo = (e) => {
        e.preventDefault()

        const {nickname} = this.state

        this.props.dispatch(updateUserData({
            nickname,
        }))
    }

    render() {
        const {intl} = this.props
        return (
            <div className="profile-view">
                <section>
                    <Row>
                        <Col xs={12}>
                            <h1><FormattedMessage id="app.profile" /></h1>
                            <p className="lead"><FormattedMessage id="app.profile.edit" /></p>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row className="section">
                        <Col xs={12}>
                            <h2><FormattedMessage id="app.basicInfo" /></h2>
                            <p className="lead text-muted"><FormattedMessage id="app.not.public" /></p>
                        </Col>
                    </Row>
                    <Form className="form-basic-information">
                        <Row>
                            <Col xs={12} sm={6}>
                                {this.state.firstName}
                            </Col>
                            
                            <Col xs={12} sm={6}>
                                {this.state.lastName}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                {this.state.email}
                            </Col>
                        </Row>
                    </Form>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h2><FormattedMessage id="app.profileInformation" /></h2>
                            <p className="lead text-muted"><FormattedMessage id="app.profileInformation.text" /></p>
                        </Col>
                    </Row>
                    <Form className="form-profile-information" onSubmit={this.submitProfileInfo}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <div className="profile-picture">
                                    <h5><FormattedMessage id="app.profile.picture" /></h5>
                                    <div className="profile-picture__picture">
                                        {/* reserve for later */}
                                    </div>
                                    <Button color="danger"><FormattedMessage id="app.profile.picture.delete"/></Button>
                                </div>
                            </Col>

                            <Col xs={12} sm={6}>
                                <div className="profile-image-upload">
                                    <p><FormattedMessage id="app.profile.picture.select.new" /></p>
                                    <div className="profile-image-upload__picture">
                                        <input type="file" />
                                    </div>
                                    <div className="profile-image-upload__help">
                                        <small className="text-muted"><FormattedMessage id="app.profile.picture.limit" /></small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                {<HelTextInput 
                                    id="nickname"
                                    value={this.state.nickname}
                                    type="text"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    label={intl.formatMessage({id: 'app.profile.nickname'})}
                                    helpText={intl.formatMessage({id:'app.profile.nickname.text'})}
                                />}
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            color="primary"
                        >
                            <FormattedMessage id="app.button.saveChanges" />
                        </Button>
                    </Form>
                </section>
            </div>
        );
    }
}

export default connect()(injectIntl(Profile))
