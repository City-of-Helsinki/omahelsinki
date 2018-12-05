import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'

const NotFound = props => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="main-wrapper">
            <h2>
              <FormattedMessage id="app.pageNotFound" />
            </h2>

            <p>
              <FormattedMessage id="app.pageNotFoundText" />
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default connect()(injectIntl(NotFound))
