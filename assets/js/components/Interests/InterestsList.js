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
        {interests.map(d => {
          return (
            <div
              key={d.id}
              className={classNames('subject', {
                selected: d.selected
              })}
              onClick={() =>
                d.selected ? onItemUncheck(d.id) : onItemCheck(d.id)
              }
            >
              {d.label}
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
