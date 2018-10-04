import React from 'react';
import {Wizard, Steps, Step} from 'react-albus';
import {connect} from 'react-redux'
import {updateUserData} from '../../user/redux'
import {
    StepButtons, 
    Welcome,
    ProfileImage, 
    //PersonalInformation, 
    //CreatePassword, 
    //Settings,
    Interest,
} from '../OnboardingSteps';

import {Container} from 'reactstrap'
import HelIcon from '../HelIcon'

class Onboarding extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // firstname: '',
            // lastname: '',
            // email: '',
            // ofAge: false,
            // password: '',
            // passwordRepeat: '',
            // enableNotifications: '',
            // enabledMessages: [],
            // enabledNotifications: [],
            selectedFields: [],
            selectedOption: '',
            nickname: '',
            img: null,
        };

        //this.handleChange = this.handleChange.bind(this);
        this.wizardFinished = this.wizardFinished.bind(this);
    }
    onSelect = (selected) => {
        const {selectedFields} = this.state

        const index = selectedFields.indexOf(selected);
        if (index < 0) {
            selectedFields.push(selected);
        } else {
            selectedFields.splice(index, 1);
        }
        this.setState({selectedFields: [...selectedFields]});
    }

    // handleChange(data) {
    //     this.setState(data);
    // }
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
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
        const userInterest = {
            interest: this.state.selectedFields,
            region: this.state.selectedOption,
        }
        this.props.updateUserData(userInterest)
        
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
                                                onSelect={this.onSelect}
                                                selectedFields={this.state.selectedFields}
                                                selectedOption={this.state.selectedOption}
                                                handleChange={this.handleChange}
                                            />
                                        </Step>
                                        {/* <Step id='settings'>
                                            <Settings
                                                data={settings}
                                                onChange={this.handleChange}
                                            />
                                        </Step> */}
                                    </Steps>
                                </div>
                                
                                <StepButtons onFinish={this.wizardFinished} />
                            </Wizard>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(null, {updateUserData})(Onboarding);
