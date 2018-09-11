import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import HelCheckbox from '../HelCheckbox'
import HelSelect from '../HelSelect'

import {regionMocks, mockDecisions} from '../../__MOCKS__'

export default class Interest extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjectData: [],
        }
    }

    componentDidMount(){
        fetch('https://profile-api.test.hel.ninja/profile-test/v1/interest-concept/')
            .then(response=>response.json())
            .then(response=>{
                this.setState({
                    subjectData:response.results,
                })
            })
            .catch(error=>console.log(error))
    }

    render() {
        const {subjectData} = this.state;
        return (
            <div className="oma-interest">
                <h2><FormattedMessage id="app.interests.your" /></h2>

                <div className="oma-interest__subjects">
                    <h4><FormattedMessage id="app.subjects" /></h4>
                    <p><FormattedMessage id="app.subject.interest" /></p>
                    <HelCheckbox 
                        data={subjectData}
                        direction="horizontal"
                        onSelect={this.props.onSelect}
                        selectedFields={this.props.selectedFields}
                    />
                </div>

                <div className="oma-interest__regions">
                    <h4><FormattedMessage id="app.regions" /></h4>
                    <p><FormattedMessage id="app.regions.interest" /></p>
                    <HelSelect 
                        options={regionMocks}
                        multi={true}
                        searchable={true}
                    />
                </div>

                <div className="oma-interest__decision">
                    <h4><FormattedMessage id="app.decision" /></h4>
                    <p><FormattedMessage id="app.decision.interest" /></p>
                    <HelCheckbox 
                        data={mockDecisions}
                        direction="horizontal"
                    />
                </div>
            </div>
        );
    }
}
