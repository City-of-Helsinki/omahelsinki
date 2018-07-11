import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'

export default class Interest extends Component {
    render() {
        return (
            <div className="oma-interest">
                <h3><FormattedMessage id="app.interest.your" /></h3>
            </div>
        );
    }
}
