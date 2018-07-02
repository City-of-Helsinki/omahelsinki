import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'

import {mockTopics, mockDecisions} from '../../../__MOCKS__'

class Interest extends Component {
    render() {
        return (
            <div className="interests-view">
                <Row>
                    <Col xs={12}>
                        <h2><FormattedMessage id="app.interests"/></h2>
                        <p><FormattedMessage id="app.interests.text"/></p>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <h3><FormattedMessage id="app.topics"/></h3>
                        <p><FormattedMessage id="app.topics.text" /></p>
                        <HelCheckbox 
                            data={mockTopics}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <h3><FormattedMessage id="app.areas"/></h3>
                        <p><FormattedMessage id="app.areas.text" /></p>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <h3><FormattedMessage id="app.decision"/></h3>
                        <p><FormattedMessage id="app.decision.text" /></p>
                        <HelCheckbox 
                            data={mockDecisions}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Interest
