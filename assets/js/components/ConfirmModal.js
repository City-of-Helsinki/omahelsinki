import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

const ConfirmModal = ({ intl, title, message, show, onSuccess, onCancel }) => (
  <div>
    <Button color="danger">Close</Button>
    <Modal isOpen={show}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button
          onClick={onSuccess}
          color="primary"
          style={{ padding: '0.7rem', flex: 1 }}
        >
          {intl.formatMessage({ id: 'app.ok' })}
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
