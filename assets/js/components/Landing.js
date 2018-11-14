import React, { Component } from 'react'
import { Col, Row, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import isEmpty from 'lodash/isEmpty'

import { fetchAllServices } from '../services/redux'
import HelIcon from './HelIcon'
import Service from './Service'

const buttonWithIconStyle = {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

class Landing extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllServices())
  }

  render() {
    const { services } = this.props

    return (
      <div className="container">
        <Row>
          <Col xs={12} md={4}>
            <h1>
              <FormattedMessage id="app.landing.header" />
            </h1>
            <Link to="/services">
              <Button color="info" style={buttonWithIconStyle}>
                See all services <HelIcon iconName="arrow-right" />
              </Button>
            </Link>
          </Col>
          {isEmpty(services) ? (
            <HelIcon iconName="sync" className={'hel-icon-spin'} />
          ) : (
            <Col xs={12} md={8}>
              <Row>
                {services.slice(0, 2).map(service => (
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
export default connect(mapStateToProps)(Landing)
