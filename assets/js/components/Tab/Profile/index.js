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
            nickname: '',
            img: null,
        }
    }

    componentDidMount() {
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

        const {nickname, img} = this.state
        const data = {
            nickname,
            image: img,
        }

        this.props.dispatch(updateUserData(data))
        
    }

    unselectImage = (e) => {
        e.preventDefault()
        this.setState({img: null})
    }

    render() {
        const {intl, tunnistamoUser} = this.props
        const hasImage = Boolean(this.state.img)
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
                            <Col xs={12}>
                                <strong>{intl.formatMessage({id: 'profile.firstName'})}</strong> <span>{tunnistamoUser.first_name}</span>
                            </Col>
                            <Col xs={12}>
                                <strong>{intl.formatMessage({id: 'profile.lastName'})}</strong> <span>{tunnistamoUser.last_name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <strong>{intl.formatMessage({id: 'profile.email'})}</strong> <span>{tunnistamoUser.email}</span>
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
                                    {
                                        hasImage ? (
                                            <div>
                                                <div className="profile-picture__picture" >
                                                    {this.state.img && <img src={this.state.img} alt="profile" />}
                                                </div>
                                                <Button color="danger" onClick={this.unselectImage}><FormattedMessage id="app.profile.picture.delete"/></Button>
                                            </div>
                                        ) : (
                                            <div className="profile-image-upload">
                                                <div className="profile-image-upload__picture">
                                                    {<ImgDropAndCrop getCroppedImage={(img) => this.setState({img: img})} />}
                                                </div>
                                                <div className="profile-image-upload__help">
                                                    <small className="text-muted"><FormattedMessage id="app.profile.picture.limit" /></small>
                                                </div>
                                            </div>
                                        )
                                    }
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

const mapStateToProps = state => ({
    user: state.userReducer.user,
    tunnistamoUser: state.userReducer.tunnistamoUser,
})

export default connect(mapStateToProps)(injectIntl(Profile))
