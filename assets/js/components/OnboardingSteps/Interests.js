import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import {
  getNeighborhoodSubdistricts,
  neighborhoodsWithOcdId,
  regionsWithOcdId
} from '../../services/RegionService'
import { fetchAllInterests, fetchAllRegions } from '../../user/redux'
import HelSelect from '../HelSelect'
import InterestsList from '../InterestsList'
import RegionMap from '../../components/Tab/Interest/RegionMap'

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

  handleMapClick = selectedRegion => {
    const { selectedRegions } = this.props
    const ids = selectedRegions.concat(selectedRegion.ocd_id)
    this.props.onRegionsChanged(ids)
  }

  render() {
    const {
      language,
      allInterests,
      selectedInterests,
      allRegions,
      neighborhoods,
      subDistricts,
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

    const neighborhoodsWithSubdistricts = getNeighborhoodSubdistricts(
      neighborhoods,
      subDistricts,
      language
    )
    const regionsByOcdId = regionsWithOcdId(allRegions)
    const neighbourhoodsByOcdId = neighborhoodsWithOcdId(regionsByOcdId)

    const userRegions = selectedRegions
      .map(ur => neighbourhoodsByOcdId[ur] || false)
      .filter(Boolean)
      .map(region => ({
        label: region.name[language] || region.name['fi'],
        value: region.ocd_id
      }))

    const selectedRegionOcdIds = userRegions.map(ur => ur.value)

    return (
      <section
        className="oma-interest"
        style={{ maxWidth: '830px', overflow: 'hidden' }}
      >
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
            options={neighborhoodsWithSubdistricts}
            value={userRegions}
            handleChange={this.regionsChangedHandler}
            placeholder={intl.formatMessage({ id: 'app.select.area' })}
            noResultsText={intl.formatMessage({ id: 'app.no.area' })}
          />
        </div>
        <RegionMap
          style={{ maxWidth: '500px' }}
          userRegions={selectedRegionOcdIds}
          regionsByOcdId={regionsByOcdId}
          neighbourhoodsByOcdId={neighbourhoodsByOcdId}
          handleMapClick={this.handleMapClick}
          language={language}
        />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.intl.locale,
    allInterests: state.userReducer.allInterests,
    allRegions: state.userReducer.allRegions,
    subDistricts: state.userReducer.allRegions.filter(
      r => r.type === 'sub_district'
    ),
    neighborhoods: state.userReducer.allRegions.filter(
      r => r.type === 'neighborhood'
    )
  }
}

export default connect(
  mapStateToProps,
  { fetchAllInterests, fetchAllRegions }
)(injectIntl(Interest))
