import React from 'react';
import Select from 'react-select';

class HelSelect extends React.Component {
    state = {
        selectedOption: '',
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
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

export default HelSelect
