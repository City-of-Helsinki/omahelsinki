import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux'
import {addRegion} from '../../user/redux'

class HelSelect extends React.Component {
    state = {
        selectedOption: '',
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption}, ()=>{
            this.props.addRegion(this.state.selectedOption)
        });
    }

    render() {
        const {selectedOption} = this.state
        const {options, ...rest} = this.props
        return (
            <Select
                name="hel-select"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                removeSelected={true}
                {...rest}
            />
        );
    }
}

HelSelect.defaultProps = {
    multi: false,
    options: {},
}

export default connect(null, {addRegion})(HelSelect)
