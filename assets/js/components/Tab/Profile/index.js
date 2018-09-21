import React, {Component} from 'react';
import {Col, Row, Form, Button} from 'reactstrap'
import {FormattedMessage, injectIntl} from 'react-intl'
import HelTextInput from '../../HelTextInput'
import {connect} from 'react-redux'

import {fetchUserData, updateUserData} from '../../../user/redux'
import ImgDropAndCrop from '../../ImgDropAndCrop'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
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

    submitBasicInfo = (e) => {
        e.preventDefault()

        const {firstName, lastName, email, password} = this.state

        this.props.dispatch(updateUserData({
            firstName,
            lastName,
            email,
            password,
        }))
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
                    <Form className="form-basic-information" onSubmit={this.submitBasicInfo}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <HelTextInput 
                                    id="firstName"
                                    type="text"
                                    required={true}
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    label={intl.formatMessage({id: 'app.input.firstname'})}
                                    placeHolder={intl.formatMessage({id: 'app.input.firstname'})}
                                />
                            </Col>

                            <Col xs={12} sm={6}>
                                <HelTextInput 
                                    id="lastName"
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                    required={true}
                                    label={intl.formatMessage({id: 'app.input.lastname'})}
                                    placeHolder={intl.formatMessage({id: 'app.input.lastname'})}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <HelTextInput 
                                    id="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    required={true}
                                    label={intl.formatMessage({id: 'app.input.email'})}
                                    placeHolder={intl.formatMessage({id: 'app.input.email'})}
                                    helpText={intl.formatMessage({id:'app.input.email.helpBlock.notShare'})}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <HelTextInput 
                                    id="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    required={true}
                                    label={intl.formatMessage({id: 'app.input.password'})}
                                />
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
                                        <ImgDropAndCrop getCroppedImage={(img) => console.log('croppped', img)} />
                                    </div>
                                    <div className="profile-image-upload__help">
                                        <small className="text-muted"><FormattedMessage id="app.profile.picture.limit" /></small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <HelTextInput 
                                    id="nickname"
                                    value={this.state.nickname}
                                    type="text"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    label={intl.formatMessage({id: 'app.profile.nickname'})}
                                    helpText={intl.formatMessage({id:'app.profile.nickname.text'})}
                                />
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
