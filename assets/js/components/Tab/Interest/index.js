import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl'
import {Row, Col} from 'reactstrap'
import HelCheckbox from '../../HelCheckbox'

import {mockTopics, mockDecisions} from '../../../__MOCKS__'

class Interest extends Component {
    render() {
        return (
            <div className="interests-view">
                <section>
                    <Row>
                        <Col xs={12}>
                            <h1><FormattedMessage id="app.interests"/></h1>
                            <p className="lead"><FormattedMessage id="app.interests.text"/></p>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.topics"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.topics.text" /></p>
                            <HelCheckbox 
                                data={mockTopics}
                            />
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.areas"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.areas.text" /></p>
                        </Col>
                    </Row>
                </section>

                <section>
                    <Row>
                        <Col xs={12}>
                            <h3><FormattedMessage id="app.decision"/></h3>
                            <p className="lead text-muted"><FormattedMessage id="app.decision.text" /></p>
                            <HelCheckbox 
                                data={mockDecisions}
                            />
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

export default Interest
