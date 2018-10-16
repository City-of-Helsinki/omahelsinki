import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';

import HelCollapsibleField from '../../HelCollapsibleField'
import ServiceList from '../../ServiceList'
import ServiceConsent from '../../ServiceConsent'

import {fetchServicesAuth} from '../../../services/redux'

const getServiceName = (service, locale) => {
    return service.name[locale] || service.name['fi']
}

class ServiceTab extends Component {

    componentDidMount() {
        this.props.fetchServicesAuth()
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
                                        <ServiceConsent service={service}/>
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
    const usedServices = state.services.servicesAuth.filter(x => x.consent_given)
    const unusedServices = state.services.servicesAuth.filter(x => !x.consent_given)
    return {
        usedServices,
        unusedServices,
        locale: state.intl.locale,
    }
}

export default connect(mapStateToProps, {fetchServicesAuth})(ServiceTab)
