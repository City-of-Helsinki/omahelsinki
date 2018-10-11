import React from 'react'
import {Wizard, Steps, Step} from 'react-albus'
import {connect} from 'react-redux'
import {createNewUser} from '../../user/redux'
import {dataURLtoFile} from '../ImgDropAndCrop/ReusableUtils'
import {Container} from 'reactstrap'

import {
    StepButtons, 
    Welcome,
    ProfileImage, 
    //PersonalInformation, 
    //CreatePassword, 
    //Settings,
    Interest,
} from '../OnboardingSteps'

import HelIcon from '../HelIcon'

class Onboarding extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            interests: [],
            regions: [],
            nickname: '',
            img: null,
        }

        this.wizardFinished = this.wizardFinished.bind(this)
        this.interestsChanged = this.interestsChanged.bind(this)
        this.regionsChanged = this.regionsChanged.bind(this)
    }

    interestsChanged(interests) {
        this.setState({interests})
    }

    regionsChanged(regions) {
        this.setState({regions})
    }
    handleInputNickName = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id
        this.setState( {
            [name]: value,
        })
    }


    unselectImage = (e) => {
        e.preventDefault()
        this.setState({img: null})
    }

    onImageCrop = (img)=>{
        this.setState({img: img})
    }

    wizardFinished() {
        const imageFile = this.state.img && dataURLtoFile(this.state.img, 'image.png')
        const nickname = this.state.nickname
        const concepts_of_interest = this.state.selectedFields.map(item=>{
            let result = [item.vocabulary, item.code].join(':')
            return result
        })
        const divisions_of_interest = this.state.selectedOption.map(item=>item.ocd_id)
        const formData = new FormData()
        {imageFile ? formData.append('image', imageFile) : null }     
        formData.append('nickname', nickname)
        for(let i = 0; i < concepts_of_interest.length; i++){
            formData.append('concepts_of_interest', concepts_of_interest[i])
        }
        for(let j = 0; j < divisions_of_interest.length; j++){
            formData.append('divisions_of_interest', divisions_of_interest[j])
        }
        this.props.createNewUser(formData)      
    }

    render() { 
        // const {firstname, lastname, email, ofAge} = this.state;
        //const personalInformation = {firstname, lastname, email, ofAge};
        //const {password, passwordRepeat} = this.state;
        //const passwordData = {password, passwordRepeat};
        //const {enabledNotifications, enabledMessages, enableNotifications} = this.state;
        //const settings = {enabledNotifications, enabledMessages, enableNotifications};
        return (
            <div className="oma-onboarding-wrapper">
                <Container>
                    <div className="oma-onboarding-container">
                        <div className="oma-onboarding">
                            <div className="user-icon">
                                <HelIcon iconName="user-o"></HelIcon>
                            </div>
                            <Wizard>
                                <div className="oma-onboarding-steps">
                                    <Steps >
                                        <Step id='welcome'>
                                            <Welcome />
                                        </Step>
                                        <Step id='profileImage'>
                                            <ProfileImage
                                                nickname = {this.state.nickname}
                                                img = {this.state.img}
                                                handleInputNickName = {this.handleInputNickName}
                                                unselectImage = {this.unselectImage}
                                                onImageCrop = {this.onImageCrop}
                                            />
                                        </Step>
                                        {/* <Step id='personalInformation'>
                                            <PersonalInformation
                                                data={personalInformation}
                                                onChange={this.handleChange}
                                            />
                                        </Step> */}
                                        {/* <Step id='createPassword'>
                                            <CreatePassword
                                                data={passwordData}
                                                onChange={this.handleChange}
                                            />
                                        </Step> */}
                                        <Step id='interests'>
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

export default connect(null, {createNewUser})(Onboarding);
