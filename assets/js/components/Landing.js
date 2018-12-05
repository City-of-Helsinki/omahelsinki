import React, { Component } from 'react'
import { Col, Row, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import isEmpty from 'lodash/isEmpty'

import { fetchAllServices } from '../services/redux'
import HelIcon from './HelIcon'
import Service from './Service'

const buttonWithIconStyle = {
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

class Landing extends Component {
  componentDidMount() {
    this.props.fetchAllServices()
  }

  render() {
    const { services } = this.props
    const visibleServiceCount = 2

    return (
      <div className="container">
        <Row>
          <Col xs={12} md={4}>
            <h1>
              <FormattedMessage id="app.landing.header" />
            </h1>
            {services.length > visibleServiceCount && (
              <a href="/services">
                <Button color="info" style={buttonWithIconStyle}>
                  <FormattedMessage id="app.landing.seeAllServices" />{' '}
                  <HelIcon iconName="arrow-right" />
                </Button>
              </a>
            )}
          </Col>
          {isEmpty(services) ? (
            <HelIcon iconName="sync" className={'hel-icon-spin'} />
          ) : (
            <Col xs={12} md={8}>
              <Row>
                {services.slice(0, visibleServiceCount).map(service => (
                  <Col
                    key={service.id}
                    xs={12}
                    md={6}
                    className="service-wrapper"
                  >
                    <Service service={service} />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12}>
            <div className="cta-register">
              <div className="left-icon d-none d-md-block">
                <HelIcon iconName="quote-right" />
              </div>
              <a className="help-link" href="/help">
                <FormattedMessage id="app.landing.help" />
                <HelIcon iconName="arrow-right" />
              </a>
            </div>
          </Col>
        </Row>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllServices
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
