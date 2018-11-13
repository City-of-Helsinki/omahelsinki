import React, { Component } from 'react'
import { Alert, Col, Row, Form, Button } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import HelTextInput from '../../HelTextInput'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import {
  fetchUserData,
  updateUserData,
  deleteUserProfile
} from '../../../user/redux'

import { addMessage } from '../../Message/message-redux'

import ImgDropAndCrop from '../../ImgDropAndCrop/ImgDropAndCrop'
import DownloadOwnData from '../../DownloadOwnData'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  setNickname = debounce(nickname => {
    this.props.updateUserData({ nickname })
  }, 750)

  selectImage(imgBlob) {
    const formData = new FormData()
    formData.set('image', imgBlob, `${Date.now()}.png`)
    this.props.updateUserData(formData)
  }

  unselectImage() {
    this.props.updateUserData({ image: null })
  }

  deleteProfile = () => {
    const msg = this.props.intl.formatMessage({
      id: 'app.profile.delete.confirm'
    })
    if (confirm(msg)) {
      this.props.deleteUserProfile()
    }
  }

  render() {
    const {
      getProfileError,
      deleteProfileError,
      saveProfileError,
      intl,
      tunnistamoUser,
      user
    } = this.props

    const hasImage = Boolean(user.image)

    return (
      <div className="profile-view">
        <section className="profile__section">
          <Row>
            <Col xs={12}>
              {getProfileError && (
                <Alert className="mt-2" color="danger">
                  <span>
                    {intl.formatMessage({ id: 'app.profile.error.onLoad' })}
                  </span>
                </Alert>
              )}
            </Col>
          </Row>
        </section>
        <section className="profile__section">
          <Row className="section">
            <Col xs={12}>
              <h2>
                <FormattedMessage id="app.personalInfo" />
              </h2>
              <p className="lead text-muted">
                <FormattedMessage id="app.not.public" />
              </p>
            </Col>
          </Row>
          <Form className="form-basic-information">
            <Row>
              <Col xs={12} md={6}>
                <strong>
                  {intl.formatMessage({ id: 'profile.firstName' })}
                </strong>{' '}
                <p>{tunnistamoUser.first_name}</p>
              </Col>
              <Col xs={12} md={6}>
                <strong>
                  {intl.formatMessage({ id: 'profile.lastName' })}
                </strong>{' '}
                <p>{tunnistamoUser.last_name}</p>
              </Col>
              <Col xs={12} md={6}>
                <strong>{intl.formatMessage({ id: 'profile.email' })}</strong>{' '}
                <p>{tunnistamoUser.email}</p>
              </Col>
            </Row>
          </Form>
        </section>
        <section className="profile__section">
          <Row>
            <Col xs={12}>
              <h2>
                <FormattedMessage id="app.profileInformation" />
              </h2>
              <p className="lead text-muted">
                <FormattedMessage id="app.profileInformation.text" />
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <div className="profile-picture">
                <h5>
                  <FormattedMessage id="app.profile.picture" />
                </h5>
                {hasImage ? (
                  <div>
                    <div className="profile-picture__picture">
                      <img src={user.image} alt="profile" />
                    </div>
                    <Button color="danger" onClick={() => this.unselectImage()}>
                      <FormattedMessage id="app.profile.picture.delete" />
                    </Button>
                  </div>
                ) : (
                  <div className="profile-image-upload">
                    <div className="profile-image-upload__picture">
                      <ImgDropAndCrop
                        getCroppedImage={img => this.selectImage(img)}
                      />
                    </div>
                    <div className="profile-image-upload__help">
                      <small className="text-muted">
                        <FormattedMessage id="app.profile.picture.limit" />
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </section>
        <section className="profile__section">
          <Row>
            <Col xs={12} md={4}>
              <HelTextInput
                id="nickname"
                defaultValue={user.nickname}
                type="text"
                required={true}
                onChange={e => this.setNickname(e.target.value)}
                label={intl.formatMessage({ id: 'app.profile.nickname' })}
                helpText={intl.formatMessage({
                  id: 'app.profile.nickname.text'
                })}
              />
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <Col xs={12} md={4}>
              <Button
                className="profile__button"
                color="success"
                onClick={() =>
                  this.props.addMessage(
                    intl.formatMessage({ id: 'app.saved' }),
                    'success'
                  )
                }
              >
                <FormattedMessage id="app.button.saveChanges" />
              </Button>

              {saveProfileError && (
                <Alert className="mt-2" color="danger">
                  <span>
                    {intl.formatMessage({ id: 'app.profile.error.onSave' })}
                  </span>
                </Alert>
              )}
            </Col>
            <Col xs={12} md={4}>
              <DownloadOwnData />
            </Col>
            <Col xs={12} md={4}>
              <Button
                className="profile__button"
                color="danger"
                onClick={() => this.deleteProfile()}
              >
                <FormattedMessage id="app.profile.delete" />
              </Button>
            </Col>
            {deleteProfileError && (
              <Alert className="mt-2" color="danger">
                <span>
                  {intl.formatMessage({ id: 'app.profile.error.onDelete' })}
                </span>
              </Alert>
            )}
          </Row>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  tunnistamoUser: state.userReducer.tunnistamoUser,
  deleteProfileError: state.userReducer.deleteProfileError,
  getProfileError: state.userReducer.getProfileError,
  saveProfileError: state.userReducer.saveProfileError
})
export default connect(
  mapStateToProps,
  { fetchUserData, updateUserData, deleteUserProfile, addMessage }
)(injectIntl(Profile))
