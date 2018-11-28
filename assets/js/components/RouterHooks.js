import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLanguage } from '../intl/redux'

class RouterHooks extends React.Component {
  componentWillReceiveProps(nextProps) {}
  componentWillMount() {
    console.log('Will mount')

    console.log('loc: ' + JSON.stringify(this.props.match.params.locale))

    changeLanguage('en')
  }
  render() {
    return null
  }
}

export default connect(
  state => ({}),
  dispatch =>
    bindActionCreators(
      {
        changeLanguage
      },
      dispatch
    )
)(RouterHooks)
