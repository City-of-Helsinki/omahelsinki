import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Form, FormGroup, Input, Label, Col, Row } from 'reactstrap'
import HelTextInput from '../HelTextInput'

const PersonalInformation = ({
  intl,
  data: { firstname, lastname, email, ofAge },
  onChange
}) => {
  const onChangeHandler = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const data = { [target.name]: value }
    onChange(data)
  }
  return (
    <div className="onboarding-personal-information">
      <div className="title">
        <h3>
          {intl.formatMessage({ id: 'onboarding.personalInformation.heading' })}
        </h3>
        <small>
          <strong>
            {intl.formatMessage({ id: 'onboarding.hint.required' })}
          </strong>
        </small>
      </div>
      <Form onChange={onChangeHandler}>
        <Row>
          <Col xs={6}>
            <HelTextInput
              label={intl.formatMessage({ id: 'onboarding.label.firstname' })}
              id="firstName"
              name="firstName"
              defaultValue={firstname}
            />
          </Col>
          <Col xs={6}>
            <HelTextInput
              label={intl.formatMessage({ id: 'onboarding.label.lastname' })}
              id="lastname"
              name="lastname"
              defaultValue={lastname}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <HelTextInput
              label={intl.formatMessage({ id: 'onboarding.label.email' })}
              id="email"
              name="email"
              type="email"
              defaultValue={email}
            />
          </Col>
          <Col xs={6}>
            <FormGroup check>
              <Label for="ofAge" check>
                <Input
                  id="ofAge"
                  name="ofAge"
                  type="checkbox"
                  defaultValue={ofAge}
                />{' '}
                {intl.formatMessage({ id: 'onboarding.label.ofAge' })}
              </Label>
            </FormGroup>
            <small>{intl.formatMessage({ id: 'onboarding.hint.ofAge' })}</small>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

PersonalInformation.propTypes = {
  data: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    ofAge: PropTypes.bool
  }),
  onChange: PropTypes.func
}

export default injectIntl(PersonalInformation)
