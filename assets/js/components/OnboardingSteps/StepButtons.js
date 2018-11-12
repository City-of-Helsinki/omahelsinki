import React from 'react'
import { compose } from 'redux'
import { withWizard } from 'react-albus'
import { injectIntl } from 'react-intl'
import { Button } from 'reactstrap'
import classNames from 'classnames'
import HelIcon from '../HelIcon/HelIcon'

const StepButtons = ({ wizard, intl, onFinish }) => {
  const { steps, step, next, previous } = wizard

  const indexOfStep = steps.indexOf(step)
  const isFirst = indexOfStep === 0
  const isLast = steps.length - 1 === indexOfStep

  const nextClickHandler = isLast ? onFinish : next
  const nextTextId = isLast
    ? 'onboarding.navigation.finish'
    : 'onboarding.navigation.next'

  return (
    <div className={classNames('step-btn', { 'btn-center': isFirst })}>
      {!isFirst && (
        <Button color="link" onClick={previous}>
          <HelIcon iconName="arrow-left" />
          {intl.formatMessage({ id: 'onboarding.navigation.previous' })}
        </Button>
      )}
      <Button color="primary" onClick={nextClickHandler}>
        {intl.formatMessage({ id: nextTextId })}
        <HelIcon iconName="arrow-right" />
      </Button>
    </div>
  )
}

export default compose(
  withWizard,
  injectIntl
)(StepButtons)
