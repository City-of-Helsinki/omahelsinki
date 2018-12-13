import React from 'react'

import ToastItem from './ToastItem'

const Toast = ({ messages, removeMessage }) => {
  if (!messages || !messages.size) {
    return null
  }

  return (
    <div className="toast-messages">
      {messages.map((message, i) => (
        <ToastItem key={i} message={message} removeMessage={removeMessage} />
      ))}
    </div>
  )
}

export default Toast
