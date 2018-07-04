import React from 'react';
import {Wizard, Steps, Step} from 'react-albus';

import StepButtons from './StepButtons';
import Welcome from './Welcome';
import PersonalInformation from './PersonalInformation';
import CreatePassword from './CreatePassword';
import Settings from './Settings';
import {Interest} from '../components/Tab';

class Onboarding extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            ofAge: false,
            password: '',
            passwordRepeat: '',
            enableNotifications: '',
            enabledMessages: [],
            enabledNotifications: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.wizardFinished = this.wizardFinished.bind(this);
    }

    handleChange(data) {
        this.setState(data);
    }

    wizardFinished() {
        console.log(this.state);
    }

    render() {
        const {firstname, lastname, email, ofAge} = this.state;
        const personalInformation = {firstname, lastname, email, ofAge};
        const {password, passwordRepeat} = this.state;
        const passwordData = {password, passwordRepeat};
        const {enabledNotifications, enabledMessages, enableNotifications} = this.state;
        const settings = {enabledNotifications, enabledMessages, enableNotifications};
        return (
            <div>
                <Wizard>
                    <Steps>
                        <Step id='welcome'>
                            <Welcome />
                        </Step>
                        <Step id='personalInformation'>
                            <PersonalInformation
                                data={personalInformation}
                                onChange={this.handleChange}
                            />
                        </Step>
                        <Step id='createPassword'>
                            <CreatePassword
                                data={passwordData}
                                onChange={this.handleChange}
                            />
                        </Step>
                        <Step id='interests'>
                            <Interest />
                        </Step>
                        <Step id='settings'>
                            <Settings
                                data={settings}
                                onChange={this.handleChange}
                            />
                        </Step>
                    </Steps>
                    <StepButtons onFinish={this.wizardFinished} />
                </Wizard>
            </div>
        );
    }
}

export default Onboarding;
