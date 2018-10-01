import React from 'react';
import Select from 'react-select';

class HelSelect extends React.Component {

    render() {
        const {options, ...rest} = this.props
        return (
            <Select
                name="hel-select"
                value={this.props.selectedOption}
                onChange={this.props.handleChange}
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
