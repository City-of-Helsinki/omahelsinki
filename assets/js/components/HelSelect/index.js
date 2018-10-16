import React from 'react';
import Select from 'react-select';
import {injectIntl} from 'react-intl'


class HelSelect extends React.Component {

    render() {
        const {options, intl, ...rest} = this.props
        return (
            <Select
                name="hel-select"
                value={this.props.selectedOption}
                onChange={this.props.handleChange}
                options={options}
                removeSelected={true}
                placeholder= {intl.formatMessage({id: 'app.select.area'})}
                noResultsText={intl.formatMessage({id: 'app.no.area'})}
                {...rest}
            />
        );
    }
}

HelSelect.defaultProps = {
    multi: false,
    options: {},
}

export default injectIntl(HelSelect)
