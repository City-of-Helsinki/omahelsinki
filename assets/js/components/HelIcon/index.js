import React from 'react'

import 'hel-icons/dist/symbol/svg/hel-icons.svg'

const HelIcon = ({ className = 'hel-icon', iconName }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`#hel-icons_${iconName}`} />
    </svg>
  )
}

export default HelIcon
