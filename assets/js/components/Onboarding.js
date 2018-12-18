import React from 'react'
import { Wizard, Steps, Step } from 'react-albus'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Loading from './Loading'

import { createNewUser, fetchUserData } from '../user/redux'
import { StepButtons, Welcome, ProfileImage, Interest } from './OnboardingSteps'
import HelIcon from './HelIcon'

class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      interests: [],
      regions: [],
      nickname: '',
      img: null
    }

    this.wizardFinished = this.wizardFinished.bind(this)
    this.interestsChanged = this.interestsChanged.bind(this)
    this.regionsChanged = this.regionsChanged.bind(this)
  }

  componentDidMount() {
    const { profileFound, fetchUserData } = this.props

    if (!profileFound) {
      fetchUserData()
    }
  }

  interestsChanged(interests) {
    this.setState({ interests })
  }

  regionsChanged(regions) {
    this.setState({ regions })
  }

  handleInputNickName = e => {
    const value = e.target.value
    this.setState({ nickname: value })
  }

  unselectImage = e => {
    e.preventDefault()
    this.setState({ img: null })
  }

  onImageCrop = img => {
    this.setState({ img: img })
  }

  wizardFinished() {
    const nickname = this.state.nickname
    const concepts_of_interest = this.state.interests
    const divisions_of_interest = this.state.regions
    const formData = new FormData()
    if (this.state.img) {
      formData.append('image', this.state.img, `${Date.now()}.png`)
    }
    formData.append('nickname', nickname)
    for (let i = 0; i < concepts_of_interest.length; i++) {
      formData.append('concepts_of_interest', concepts_of_interest[i])
    }
    for (let j = 0; j < divisions_of_interest.length; j++) {
      formData.append('divisions_of_interest', divisions_of_interest[j])
    }
    this.props.createNewUser(formData)
    window.scrollTo(0, 0)
  }

  render() {
    const { profileFound, userLoading } = this.props
    const { interests, regions, nickname, img } = this.state

    if (userLoading) {
      return (
        <div className="oma-onboarding-wrapper">
          <Container>
            <div className="oma-onboarding-container">
              <Loading />
            </div>
          </Container>
        </div>
      )
    }

    if (profileFound) {
      return <Redirect to="/mydata/" />
    }

    return (
      <div className="oma-onboarding-wrapper">
        <Container>
          <div className="oma-onboarding-container">
            <div className="oma-onboarding">
              <div className="user-icon">
                <HelIcon iconName="user-o" />
              </div>
              <Wizard>
                <div className="oma-onboarding-steps">
                  <Steps>
                    <Step id="welcome">
                      <Welcome />
                    </Step>
                    <Step id="profileImage">
                      <ProfileImage
                        nickname={nickname}
                        img={img}
                        handleInputNickName={this.handleInputNickName}
                        unselectImage={this.unselectImage}
                        onImageCrop={this.onImageCrop}
                      />
                    </Step>
                    <Step id="interests">
                      <Interest
                        selectedInterests={interests}
                        onInterestsChanged={this.interestsChanged}
                        selectedRegions={regions}
                        onRegionsChanged={this.regionsChanged}
                      />
                    </Step>
                  </Steps>
                </div>
                <StepButtons onFinish={this.wizardFinished} />
              </Wizard>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default connect(
  state => ({
    profileFound: !isEmpty(state.userReducer.user),
    userLoading: state.userReducer.userLoading
  }),
  dispatch =>
    bindActionCreators(
      {
        createNewUser,
        fetchUserData
      },
      dispatch
    )
)(Onboarding)
