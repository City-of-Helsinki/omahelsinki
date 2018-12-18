import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import Loading from '../../Loading'
import HelCollapsibleField from '../../HelCollapsibleField'
import ServiceList from '../../ServiceList'
import ServiceConsent from '../../ServiceConsent'

import { fetchAllServices, fetchConsents } from '../../../services/redux'

const getServiceName = (service, locale) => {
  return service.name[locale] || service.name['fi']
}

class ServiceTab extends Component {
  componentDidMount() {
    const { intl } = this.props

    this.props.fetchAllServices(intl)
    this.props.fetchConsents(intl)
  }

  render() {
    const { isLoading, locale, consents, services } = this.props

    if (isLoading) {
      return <Loading />
    }

    const consentIds = consents.map(x => x.service)
    const unusedServices = services.filter(x => !consentIds.includes(x.id))
    const usedServices = consents.map(consent => {
      const service = find(services, ['id', consent.service])
      service.consent = consent
      return service
    })

    return (
      <div className="service-view">
        <section>
          <Row>
            <Col xs={12}>
              <h1>
                <FormattedMessage id="app.services.related" />
              </h1>
              <p className="lead text-muted">
                <FormattedMessage id="app.services.related.text" />
              </p>
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
                    collapsedLabel={
                      <FormattedMessage id="services.collapsed.isClosedLabel" />
                    }
                    openLabel={
                      <FormattedMessage id="services.collapsed.isOpenLabel" />
                    }
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
        {!isEmpty(unusedServices) && (
          <section>
            <h2>
              <FormattedMessage id="app.services.unconnectedHeading" />
            </h2>
            <ServiceList services={unusedServices} />
          </section>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading:
      state.services.allServicesLoading || state.services.consentsLoading,
    consents: state.services.consents,
    services: state.services.allServices,
    locale: state.intl.locale
  }
}

export default connect(
  mapStateToProps,
  { fetchAllServices, fetchConsents }
)(injectIntl(ServiceTab))
