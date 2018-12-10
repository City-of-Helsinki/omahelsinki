import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import max from 'lodash/max'
import moment from 'moment'

import { deleteServiceConsent } from '../services/redux'
import ConfirmModal from './ConfirmModal'

const getLastUsed = (service, history) => {
  const timestamps = history
    .filter(x => x.service.id === service.id)
    .map(x => moment(x.timestamp).toDate())
  return max(timestamps)
}

class ServiceConsent extends React.Component {
  constructor(props) {
    super(props)
    this.deleteConsent = this.deleteConsent.bind(this)

    this.state = {
      showConfirmationModal: false
    }
  }

  openConfirmationModal() {
    this.setState({ showConfirmationModal: true })
  }

  closeConfirmationModal() {
    this.setState({ showConfirmationModal: false })
  }

  deleteConsent() {
    const { intl, locale, service, deleteServiceConsent } = this.props

    this.closeConfirmationModal()

    deleteServiceConsent(
      service.consent,
      service.name[locale] || service.name['fi'],
      intl
    )
  }

  render() {
    const { intl, service, locale, history } = this.props
    const consent = service.consent
    const description = service.description[locale] || service.description['fi']
    const lastUsedDate = getLastUsed(service, history)
    const serviceName = service.name[locale] || service.name['fi']

    return (
      <div className="service-consent">
        <ConfirmModal
          show={this.state.showConfirmationModal}
          onConfirmation={() => this.deleteConsent()}
          onCancel={() => this.closeConfirmationModal()}
          message={intl.formatMessage(
            { id: 'service.consent.delete.confirm' },
            { service: serviceName }
          )}
          title={intl.formatMessage(
            { id: 'service.consent.delete.confirmTitle' },
            { service: serviceName }
          )}
        />
        <div className="decription">
          <p>{description}</p>
        </div>
        <div className="scopes">
          <strong>
            <FormattedMessage id="service.consent.scopes" />
          </strong>
          <ul>
            {consent.scopes.map((scope, index) => {
              return <li key={index}>{scope}</li>
            })}
          </ul>
        </div>
        <div className="last-used">
          <strong>
            <FormattedMessage id="service.lastUsed" />
          </strong>
          <br />
          <span>
            {lastUsedDate
              ? moment(lastUsedDate)
                  .locale(locale)
                  .format('lll')
              : '–'}
          </span>
        </div>
        <div className="actions">
          <Button
            color="danger"
            className="text-center"
            onClick={() => this.openConfirmationModal()}
          >
            <FormattedMessage id="service.consent.button.delete" />
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    history: state.userReducer.allHistoryData,
    locale: state.intl.locale
  }
}

export default connect(
  mapStateToProps,
  { deleteServiceConsent }
)(injectIntl(ServiceConsent))
