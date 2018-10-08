import React from 'react'
import {Wizard, Steps, Step} from 'react-albus'
import {connect} from 'react-redux'
import {Container} from 'reactstrap'

import {updateUserData} from '../../user/redux'
import {
    StepButtons, 
    Welcome, 
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

    wizardFinished() {
        const userInterest = {
            interest: this.state.selectedFields,
            region: this.state.selectedOption,
        }
        this.props.updateUserData(userInterest)
    }

    render() {
        const {interests, regions} = this.state
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

export default connect(null, {updateUserData})(Onboarding)
