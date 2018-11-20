import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import ProfilePicture from './ProfilePicture'

const Greetings = ({ intl, tunnistamoUser }) => {
  const name = tunnistamoUser.first_name

  return (
    <div className="greetings-container">
      <ProfilePicture />

      <div className="greetings-text-container">
        <h2 className="greetings-text">
          {intl.formatMessage({ id: 'app.userGreeting' })} {name}
        </h2>
      </div>
    </div>
  )
}

export default connect()(injectIntl(Greetings))
