import React from 'react'

import ToastContainer from '../containers/ToastContainer'

export default function MainLayout({ children }) {
  return (
    <div>
      {children}

      <ToastContainer />
    </div>
  )
}
