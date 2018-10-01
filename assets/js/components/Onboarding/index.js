import React from 'react';
import {Wizard, Steps, Step} from 'react-albus';

import {
    StepButtons, 
    Welcome, 
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
        };

        //this.handleChange = this.handleChange.bind(this);
        this.wizardFinished = this.wizardFinished.bind(this);
    }

    handleChange(data) {
        this.setState(data);
    }

    wizardFinished() {
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
                                            <Interest />
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

export default Onboarding;
