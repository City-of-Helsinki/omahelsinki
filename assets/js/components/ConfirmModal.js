import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

const ConfirmModal = ({
  intl,
  title,
  message,
  show,
  onConfirmation,
  onCancel,
  confirmationButtonTitle
}) => (
  <div>
    <Modal isOpen={show}>
      <div className="modal-header">
        <h5 className="Modal-title">{title}</h5>
        <a className="close" onClick={onCancel}>
          <span aria-hidden={true}>x</span>
        </a>
      </div>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button
          onClick={onConfirmation}
          color="primary"
          style={{ padding: '0.7rem', flex: 1 }}
        >
          {confirmationButtonTitle
            ? confirmationButtonTitle
            : intl.formatMessage({ id: 'app.ok' })}
        </Button>{' '}
        <Button
          onClick={onCancel}
          color="secondary"
          style={{ padding: '0.7rem', flex: 1 }}
        >
          {intl.formatMessage({ id: 'app.cancel' })}
        </Button>
      </ModalFooter>
    </Modal>
  </div>
)

export default connect()(injectIntl(ConfirmModal))
