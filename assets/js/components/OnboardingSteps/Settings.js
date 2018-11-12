import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Form, FormGroup, Input, Label, Col, Row } from 'reactstrap'

const toBool = str => str === 'true'

const Settings = ({
  intl,
  onChange,
  data: { enableNotifications, enabledNotifications, enabledMessages }
}) => {
  const enableNotificationsHandler = event => {
    const target = event.target
    onChange({ enableNotifications: toBool(target.value) })
  }
  const createHandler = (name, values) => event => {
    const target = event.target
    const set = new Set(values)
    const prop = target.value
    target.checked ? set.add(prop) : set.delete(prop)
    onChange({ [name]: Array.from(set) })
  }
  const messagesHandler = createHandler('enabledMessages', enabledMessages)
  const notificationsHandler = createHandler(
    'enabledNotifications',
    enabledNotifications
  )
  return (
    <div className="oma-settings">
      <h2>{intl.formatMessage({ id: 'onboarding.settings.heading' })}</h2>
      <p>{intl.formatMessage({ id: 'onboarding.settings.text' })}</p>
      <Form>
        <FormGroup check onChange={enableNotificationsHandler}>
          <Row>
            <Col sm={6}>
              <Label check>
                <Input
                  type="radio"
                  value={true}
                  defaultChecked={enableNotifications === true}
                />{' '}
                {intl.formatMessage({
                  id: 'onboarding.label.enableNotifications'
                })}
              </Label>
            </Col>
            <Col sm={6}>
              <Label check>
                <Input
                  type="radio"
                  value={false}
                  defaultChecked={enableNotifications === false}
                />{' '}
                {intl.formatMessage({
                  id: 'onboarding.label.disableNotifications'
                })}
              </Label>
            </Col>
          </Row>
        </FormGroup>
        {enabledNotifications && (
          <div>
            <FormGroup
              onChange={messagesHandler}
              className="oma-settings__messages"
            >
              <h4>
                {intl.formatMessage({ id: 'onboarding.messages.heading' })}
              </h4>
              <p>{intl.formatMessage({ id: 'onboarding.messages.text' })}</p>
              <div className="check-group">
                <Label check>
                  <Input
                    type="checkbox"
                    value="email"
                    defaultChecked={enabledMessages.includes('email')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.email' })}
                </Label>
                <Label check>
                  <Input
                    type="checkbox"
                    value="sms"
                    defaultChecked={enabledMessages.includes('sms')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.sms' })}
                </Label>
                <Label check>
                  <Input
                    type="checkbox"
                    value="app"
                    defaultChecked={enabledMessages.includes('app')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.app' })}
                </Label>
              </div>
            </FormGroup>
            <FormGroup
              onChange={notificationsHandler}
              className="oma-settings__notifications"
            >
              <h4>
                {intl.formatMessage({ id: 'onboarding.notifications.heading' })}
              </h4>
              <p>
                {intl.formatMessage({ id: 'onboarding.notifications.text' })}
              </p>
              <div className="check-group">
                <Label check>
                  <Input
                    type="checkbox"
                    value="event"
                    defaultChecked={enabledNotifications.includes('event')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.notifyEvent' })}
                </Label>
                <Label check>
                  <Input
                    type="checkbox"
                    value="area"
                    defaultChecked={enabledNotifications.includes('area')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.notifyArea' })}
                </Label>
                <Label check>
                  <Input
                    type="checkbox"
                    value="subject"
                    defaultChecked={enabledNotifications.includes('subject')}
                  />{' '}
                  {intl.formatMessage({ id: 'onboarding.label.notifySubject' })}
                </Label>
              </div>
            </FormGroup>
          </div>
        )}
      </Form>
    </div>
  )
}

Settings.propTypes = {
  data: PropTypes.shape({
    enableNotifications: PropTypes.boolean,
    enabledNotifications: PropTypes.array,
    enabledMessages: PropTypes.array
  }),
  onChange: PropTypes.func
}

export default injectIntl(Settings)
