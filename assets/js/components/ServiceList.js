import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Service from './Service'

const ServiceList = ({ services }) => {
  return (
    <Container>
      <Row>
        {services.map((service, index) => {
          return (
            <Col key={index} xs={12} md={6} lg={4} className="service-wrapper">
              <Service service={service} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ServiceList
