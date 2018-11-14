import React, { Component } from 'react'
import { Collapse, Button } from 'reactstrap'

import HelIcon from './HelIcon'

export default class HelCollapsibleField extends Component {
  static defaultProps = {
    collapsedLabel: '',
    openLabel: ''
  }

  constructor(props) {
    super(props)

    this.state = {
      collapse: false
    }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const {
      title,
      children,
      collapsible,
      collapsedLabel,
      openLabel
    } = this.props
    const isCollapseOpen = collapsible ? this.state.collapse : true

    return (
      <div className="hel-collapsible-field">
        {collapsible ? (
          <Button className="hel-collapsible-field__link" onClick={this.toggle}>
            {this.state.collapse ? (
              <span className="float-right help-label">
                {collapsedLabel} <HelIcon iconName="angle-up" />
              </span>
            ) : (
              <span className="float-right help-label">
                {openLabel} <HelIcon iconName="angle-down" />
              </span>
            )}
            <p>{title}</p>
          </Button>
        ) : (
          <p className="hel-collapsible-field__title">{title}</p>
        )}
        <Collapse
          className="hel-collapsible-field__child"
          isOpen={isCollapseOpen}
        >
          {children}
        </Collapse>
      </div>
    )
  }
}
