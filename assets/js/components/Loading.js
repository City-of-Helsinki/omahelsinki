import React from 'react'

import HelIcon from './HelIcon'

const Loading = ({ className = 'hel-icon-spin' }) => {
  return (
    <div>
      <HelIcon iconName="sync" className={className} />
    </div>
  )
}

export default Loading
