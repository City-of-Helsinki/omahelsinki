import React from 'react';
import {Wizard, Steps, Step} from 'react-albus';

import {
    StepButtons, 
    Welcome, 
    Settings,
    Interest,
} from '../OnboardingSteps';

import {Container} from 'reactstrap'
import HelIcon from '../HelIcon'

class Onboarding extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            enableNotifications: '',
            enabledMessages: [],
            enabledNotifications: [],
            selectedFields: [],
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(data) {
        this.setState(data);
    }

    wizardFinished() {    
        const newUserData = {
            enabledMessages : this.state.enabledMessages,
            enableNotifications : this.state.enableNotifications,
            enabledNotifications : this.state.enabledNotifications,
            selectedFields : this.state.selectedFields,
        }
        this.props.updateUserData(newUserData)
    }

    render() {
        const {enabledNotifications, enabledMessages, enableNotifications} = this.state;
        const settings = {enabledNotifications, enabledMessages, enableNotifications};
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
                                        <Step id='interests'>
                                            <Interest 
                                                onSelect={this.onSelect}
                                                selectedFields={this.state.selectedFields} />
                                        </Step>
                                        <Step id='settings'>
                                            <Settings
                                                data={settings}
                                                onChange={this.handleChange}
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
        );
    }
}

export default Onboarding;
