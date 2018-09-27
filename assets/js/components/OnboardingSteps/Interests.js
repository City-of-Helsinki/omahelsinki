import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';
import {fetchAllInterests, fetchAllRegions} from '../../user/redux'
import HelCheckbox from '../HelCheckbox'
import HelSelect from '../HelSelect'

class Interest extends Component {
  

    UNSAFE_componentWillMount(){
        [this.props.fetchAllInterests(),
            this.props.fetchAllRegions()]
    }


    render() {
        const region = this.props.regions.map(data=>{ 
            return {label: data.name[this.props.language] || data.name['fi'], value: data.origin_id}
        })

        return (
            <div className="oma-interest">
                <h2><FormattedMessage id="app.interests.your" /></h2>

                <div className="oma-interest__subjects">
                    <h4><FormattedMessage id="app.subjects" /></h4>
                    <p><FormattedMessage id="app.subject.interest" /></p>
                    <HelCheckbox 
                        data={this.props.interests}
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
        language: state.intl.locale,
        interests: state.userReducer.allInterests,
        regions: state.userReducer.allRegions,
    }
}

export default connect(mapStateToProps, {fetchAllInterests, fetchAllRegions})(Interest)
