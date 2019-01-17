import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { FormattedMessage } from 'react-intl'

import { Nav, NavItem } from 'reactstrap'

const TABS = {
  PROFILE: { key: 'profile', path: 'app.routes.profile' },
  INTERESTS: { key: 'interests', path: 'app.routes.interests' },
  SERVICES: { key: 'services', path: 'app.routes.services' },
  HISTORY: { key: 'history', path: 'app.routes.history' }
}

const isActiveMenuItem = (path, location) => {
  if (!isEmpty(path) && location.pathname.indexOf(path) !== -1) {
    return true
  }

  if (
    location.pathname.endsWith('/my-data/') &&
    path.endsWith('/my-data/profile')
  ) {
    return true
  }

  return false
}

const renderActiveMenuItemIndicator = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 390"
      style={{ width: 48 }}
    >
      <defs>
        <style>{`.a{fill:#fff;}`}</style>
      </defs>
      <title>koro-marker 1</title>
      <path
        className="a"
        d="M0,391c48.46,0,89.94-28.71,108-72.19,1-2.79,83.6-242.89,83.6-242.89S217.87,1.47,300.92,1.47c49.73,0,92.12,30.23,109.17,74.45.81,1.82,84.12,246,84.12,246S523,391,600,391H0Z"
      />
    </svg>
  )
}

const Menu = ({ intl, location, user, tunnistamoUser }) => {
  return (
    <div>
      <Nav className="oma-tabs">
        {Object.values(TABS).map((tab, index) => {
          const isActive = isActiveMenuItem(
            intl.formatMessage({ id: tab.path }),
            location
          )

          return (
            <NavItem key={index}>
              <Link
                className={cx('nav-link', { active: isActive })}
                to={intl.formatMessage({ id: tab.path })}
              >
                <FormattedMessage id={`app.${tab.key}`} />

                {isActive && renderActiveMenuItemIndicator()}
              </Link>
            </NavItem>
          )
        })}
      </Nav>
    </div>
  )
}

export default Menu
