import React, { Component } from 'react'
import { Col, Row, Form, Button } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import HelTextInput from '../HelTextInput'
import ImgDropAndCrop from '../ImgDropAndCrop/ImgDropAndCrop'
import { Alert } from 'reactstrap'

class ProfileImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalidImage: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.img && prevProps.img !== this.props.img) {
      URL.revokeObjectURL(prevProps.img)
    }
  }

  markInvalidImage(foo) {
    this.setState({
      invalidImage: true
    })
  }

  render() {
    const { intl } = this.props
    const hasImage = Boolean(this.props.img)
    return (
      <div className="profile-view">
        <section className="profile__section">
          <Row className="section">
            <Col xs={12}>
              <h1>
                <FormattedMessage id="app.profile" />
              </h1>
              <p className="lead">
                <FormattedMessage id="app.profile.addImageAndNickName" />
              </p>
            </Col>
          </Row>
        </section>
        <section className="profile__section">
          <Form
            className="form-profile-information"
            onSubmit={this.submitProfileInfo}
          >
            <Row className="profile__section">
              <Col xs={12} sm={6}>
                <div className="profile-picture">
                  <h5>
                    <FormattedMessage id="app.profile.picture" />
                  </h5>
                  {hasImage ? (
                    <div>
                      <div className="profile-picture__picture">
                        {!this.state.invalidImage && (
                          <img
                            src={URL.createObjectURL(this.props.img)}
                            alt="profile"
                            onError={() => this.markInvalidImage()}
                          />
                        )}
                        {this.state.invalidImage && (
                          <Alert color="danger">
                            <FormattedMessage id="app.profile.picture.error.invalidImage" />
                          </Alert>
                        )}
                        <p>dff</p>
                      </div>
                      <Button color="danger" onClick={this.props.unselectImage}>
                        <FormattedMessage id="app.profile.picture.delete" />
                      </Button>
                    </div>
                  ) : (
                    <div className="profile-image-upload">
                      <div className="profile-image-upload__picture">
                        <ImgDropAndCrop
                          getCroppedImage={this.props.onImageCrop}
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
            <Row>
              <Col xs={12}>
                <HelTextInput
                  id="nickname"
                  value={this.props.nickname}
                  type="text"
                  required={true}
                  onChange={this.props.handleInputNickName}
                  label={intl.formatMessage({ id: 'app.profile.nickname' })}
                  helpText={intl.formatMessage({
                    id: 'app.profile.nickname.text'
                  })}
                />
              </Col>
            </Row>
          </Form>
        </section>
      </div>
    )
  }
}

export default injectIntl(ProfileImage)
