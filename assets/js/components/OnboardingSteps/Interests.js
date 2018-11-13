import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { fetchAllInterests, fetchAllRegions } from '../../user/redux'
import HelSelect from '../HelSelect'

import InterestsList from './Interests'

class Interest extends Component {
  componentDidMount() {
    this.props.fetchAllInterests()
    this.props.fetchAllRegions()
  }

  interestChangeHandler = selectedValues => {
    const ids = selectedValues.map(item => item.id)
    this.props.onInterestsChanged(ids)
  }

  regionsChangedHandler = selectedValues => {
    const ids = selectedValues.map(item => item.value)
    this.props.onRegionsChanged(ids)
  }

  render() {
    const {
      language,
      allInterests,
      selectedInterests,
      allRegions,
      selectedRegions,
      intl
    } = this.props

    const interests = allInterests.map(item => {
      const id = `${item.vocabulary}:${item.code}`
      return {
        id,
        label: item.label[language],
        selected: selectedInterests.includes(id)
      }
    })

    const region = allRegions.map(data => {
      return {
        label: data.name[language] || data.name['fi'],
        value: data.ocd_id
      }
    })

    return (
      <div className="oma-interest">
        <h2>
          <FormattedMessage id="app.interests.your" />
        </h2>
        <div className="oma-interest__subjects">
          <h4>
            <FormattedMessage id="app.subjects" />
          </h4>
          <p>
            <FormattedMessage id="app.subject.interest" />
          </p>
          <InterestsList
            interests={interests}
            onChange={this.interestChangeHandler}
          />
        </div>
        <div className="oma-interest__regions">
          <h4>
            <FormattedMessage id="app.regions" />
          </h4>
          <p>
            <FormattedMessage id="app.regions.interest" />
          </p>
          <HelSelect
            options={region}
            multi={true}
            searchable={true}
            selectedOption={selectedRegions}
            handleChange={this.regionsChangedHandler}
            placeholder={intl.formatMessage({ id: 'app.select.area' })}
            noResultsText={intl.formatMessage({ id: 'app.no.area' })}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.intl.locale,
    allInterests: state.userReducer.allInterests,
    allRegions: state.userReducer.allRegions
  }
}

export default connect(
  mapStateToProps,
  { fetchAllInterests, fetchAllRegions }
)(injectIntl(Interest))
