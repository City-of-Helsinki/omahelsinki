import React from 'react'
import classNames from 'classnames'

const InterestsList = ({ interests, onChange }) => {
  const onItemUncheck = itemId => {
    const selectedValues = interests.filter(x => x.selected && x.id !== itemId)
    onChange(selectedValues)
  }
  const onItemCheck = itemId => {
    const selectedValues = interests.filter(x => x.selected || x.id === itemId)
    onChange(selectedValues)
  }

  return (
    <div className="interests">
      <div className="interests__subject-list">
        {interests.map(interest => {
          return (
            <div
              key={interest.id}
              className={classNames('subject', {
                selected: interest.selected
              })}
              onClick={() =>
                interest.selected
                  ? onItemUncheck(interest.id)
                  : onItemCheck(interest.id)
              }
            >
              {interest.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

InterestsList.defaultProps = {
  interests: []
}

export default InterestsList
