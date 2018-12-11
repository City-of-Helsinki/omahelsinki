import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Col, Container, Row } from 'reactstrap'

import { fetchAllServices } from './redux'

import Loading from '../components/Loading'
import Error from '../components/Error'
import ServiceList from '../components/ServiceList'
import Service from '../components/Service'
import HelIcon from '../components/HelIcon'

class AllServices extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllServices())
  }

  render() {
    const { services, isLoading, isError } = this.props
    if (isLoading) {
      return (
        <section className="section section--services">
          <Container>
            <Row>
              <Col xs={12}>
                <Loading />
              </Col>
            </Row>
          </Container>
        </section>
      )
    } else if (isError) {
      return (
        <section className="section section--services">
          <Container>
            <Row>
              <Col xs={12}>
                <Error />
              </Col>
            </Row>
          </Container>
        </section>
      )
    } else if (!services) {
      return null
    }
    const amountOfServices = services.length
    const servicesForFirstRow = services.splice(0, 3)

    return (
      <div>
        <section class="hero-section">
          <div class="container">
            <Row>
              <Col xs={12} md={4} className="hero-content">
                <h2>
                  <FormattedMessage id="app.services.hero" />
                </h2>
              </Col>
              <Col xs={12} md={8}>
                <div className="featured">
                  <p className="disclaimer">
                    <FormattedMessage id="app.services.featured" />
                  </p>
                  {services.slice(0, 1).map(service => (
                    <Service horizontal key={service.id} service={service} />
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <section className="section section--services">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="services-amount">
                  <FormattedMessage
                    id="app.services.all.amountOfServices"
                    values={{ amount: amountOfServices }}
                  />
                </div>
                <div className="service-list">
                  <ServiceList services={servicesForFirstRow} />
                </div>
                <div className="cta-register">
                  <div className="left-icon d-none d-md-block">
                    <HelIcon iconName="user-o" />
                  </div>
                  <a className="help-link" href="/login">
                    <FormattedMessage id="app.services.all.cta" />
                    <HelIcon iconName="arrow-right" />
                  </a>
                </div>
                <div className="service-list">
                  <ServiceList services={services} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.allServices,
    isLoading: state.services.allServicesLoading,
    isError: state.services.allServicesError
  }
}
export default connect(mapStateToProps)(AllServices)
