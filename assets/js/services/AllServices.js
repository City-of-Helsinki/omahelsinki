import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Col, Container, Row } from 'reactstrap'
import isEmpty from 'lodash/isEmpty'

import { fetchAllServices } from './redux'

import { fetchUserData } from '../user/redux'

import Loading from '../components/Loading'
import Error from '../components/Error'
import ServiceList from '../components/ServiceList'
import Service from '../components/Service'
import HelIcon from '../components/HelIcon'

class AllServices extends React.Component {
  componentDidMount() {
    const { intl, tunnistamoUser, user } = this.props

    if (
      !isEmpty(tunnistamoUser) &&
      !isEmpty(tunnistamoUser.uuid) &&
      isEmpty(user)
    ) {
      this.props.dispatch(fetchUserData(intl))
    }

    this.props.dispatch(fetchAllServices(intl))
  }

  render() {
    const { services, isLoading, isError, user } = this.props

    if (isLoading) {
      return (
        <section
          className="section section--services"
          style={{ marginTop: 100 }}
        >
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

    const cloned = services.slice(0)
    const servicesForFirstRow = cloned.splice(0, 3)
    const remainingServices = cloned.splice(0, 1)

    return (
      <div>
        <section className="hero-section">
          <div className="container">
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
                  {remainingServices.map(service => (
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
                <div className="service-list">
                  <ServiceList services={servicesForFirstRow} />
                </div>
                {isEmpty(user) && (
                  <div className="cta-register">
                    <div className="left-icon d-none d-md-block">
                      <HelIcon iconName="user-o" />
                    </div>
                    <a className="help-link" href="/login">
                      <FormattedMessage id="app.services.all.cta" />
                      <HelIcon iconName="arrow-right" />
                    </a>
                  </div>
                )}

                <div className="service-list">
                  <ServiceList services={cloned} />
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
    isError: state.services.allServicesError,
    user: state.userReducer.user,
    tunnistamoUser: state.userReducer.tunnistamoUser
  }
}
export default connect(mapStateToProps)(AllServices)
