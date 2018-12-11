import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import ConfirmModal from './ConfirmModal'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

const NotLoggedIn = props => {
  const { intl } = props
  return (
    <Container>
      <Row>
        <Col>
          <div className="oma-tab-content">
            <ConfirmModal
              show={true}
              onConfirmation={() =>
                (location.href = '/login?next=/mydata/profile')
              }
              confirmationButtonTitle={intl.formatMessage({ id: 'app.logIn' })}
              onCancel={() => (location.href = '/')}
              message={intl.formatMessage({ id: 'app.pleaseLogIn' })}
              title={intl.formatMessage({ id: 'app.notLoggedIn' })}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default connect()(injectIntl(NotLoggedIn))
