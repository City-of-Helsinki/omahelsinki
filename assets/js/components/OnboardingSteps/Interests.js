import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';
import HelCheckbox from '../HelCheckbox'
import HelSelect from '../HelSelect'
import axios from 'axios'
// import {regionMocks} from '../../__MOCKS__'

class Interest extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjectData: [],
            regionData: [],
        }
    }

    async componentDidMount(){
        const interest = await axios.get('https://profile-api.test.hel.ninja/profile-test/v1/interest-concept/');
        const region = await axios.get('https://profile-api.test.hel.ninja/profile-test/v1/geo-division/?limit=200');
        this.setState({
            subjectData:interest.data.results,
            regionData: region.data.results,
        })
    }

    render() {
        const {subjectData} = this.state;
        const region = this.state.regionData.map(data=>{ 
            return {label: data.name[this.props.locale] || data.name['fi'], value: data.origin_id}
        })

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
                        options={region}
                        multi={true}
                        searchable={true}
                    />
                </div>

            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        locale: state.intl.locale,
    }
}

export default connect(mapStateToProps)(Interest)
