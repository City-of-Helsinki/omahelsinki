import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import HelCheckbox from '../HelCheckbox'

import {mockTopics} from '../../__MOCKS__'

export default class Interest extends Component {
    render() {
        return (
            <div className="oma-interest">
                <h2><FormattedMessage id="app.interests.your" /></h2>

                <div className="oma-interest__subjects">
                    <h4><FormattedMessage id="app.subjects" /></h4>
                    <p><FormattedMessage id="app.subject.interest" /></p>
                    <HelCheckbox 
                        data={mockTopics}
                        direction="horizontal"
                    />
                </div>
            </div>
        );
    }
}
