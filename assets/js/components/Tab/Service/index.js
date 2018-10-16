import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'
import find from 'lodash/find'

import HelCollapsibleField from '../../HelCollapsibleField'
import ServiceList from '../../ServiceList'
import ServiceConsent from '../../ServiceConsent'

import {fetchAllServices, fetchConsents} from '../../../services/redux'

const getServiceName = (service, locale) => {
    return service.name[locale] || service.name['fi']
}

class ServiceTab extends Component {

    componentDidMount() {
        this.props.fetchAllServices()
        this.props.fetchConsents()
    }

    render() {
        const {usedServices, unusedServices, locale} = this.props
        return (
            <div className="service-view">
                <section>
                    <Row>
                        <Col xs={12}>
                            <h1><FormattedMessage id="app.services.related"/></h1>
                            <p className="lead text-muted"><FormattedMessage id="app.services.related.text"/></p>
                        </Col>
                    </Row>
                </section>
                <section>
                    <Row>
                        <Col xs={12}>
                            {usedServices.map((service, index) => {
                                return (
                                    <HelCollapsibleField
                                        title={getServiceName(service, locale)}
                                        collapsedLabel={<FormattedMessage id="services.collapsed.isClosedLabel"/>}
                                        openLabel={<FormattedMessage id="services.collapsed.isOpenLabel"/>}
                                        collapsible
                                        key={index}
                                    >
                                        <ServiceConsent service={service} />
                                    </HelCollapsibleField>
                                )
                            })}
                        </Col>
                    </Row>
                </section>
                <section>
                    <ServiceList services={unusedServices} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const consents = state.services.consents
    const consentIds = consents.map(x => x.service)
    const unusedServices = state.services.allServices.filter(x => !consentIds.includes(x.id))

    const usedServices = consents.map(consent => {
        const service = find(state.services.allServices, ['id', consent.service])
        service.consent = consent
        return service
    });

    return {
        usedServices,
        unusedServices,
        consents,
        locale: state.intl.locale,
    }
}

export default connect(mapStateToProps, {fetchAllServices, fetchConsents})(ServiceTab)
