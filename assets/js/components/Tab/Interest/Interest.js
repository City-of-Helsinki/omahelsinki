import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Row, Col, Button, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { List } from 'immutable'

import Loading from '../../Loading'
import InterestsList from '../../InterestsList'
import HelSelect from '../../HelSelect'
import {
  fetchAllInterests,
  updateUserData,
  fetchAllRegions
} from '../../../user/redux'
import RegionMap from './RegionMap'
import {
  getNeighborhoodSubdistricts,
  neighborhoodsWithOcdId,
  regionsWithOcdId
} from '../../../services/RegionService'

import { addMessage } from '../../Message/message-redux'

class Interest extends Component {
  componentDidMount() {
    this.props.fetchAllInterests()
    this.props.fetchAllRegions()
  }

  interestChange = selectedValues => {
    const ids = selectedValues.map(item => item.id)
    this.props.updateUserData({ concepts_of_interest: ids })
  }

  regionsChange = selectedValues => {
    const ids = selectedValues.map(item => item.value)
    this.props.updateUserData({ divisions_of_interest: ids })
  }

  handleMapClick = selectedRegion => {
    const { userRegions } = this.props

    const index = userRegions.indexOf(selectedRegion.ocd_id)
    let ids = []

    if (index === -1) {
      ids = userRegions.concat(selectedRegion.ocd_id)
    } else {
      ids = List(userRegions)
        .splice(index, 1)
        .toArray()
    }

    this.props.updateUserData({ divisions_of_interest: ids })
  }

  render() {
    const {
      userInterests,
      allInterests,
      isInterestsLoading,
      userRegions,
      allRegions,
      neighborhoods,
      subDistricts,
      isRegionsLoading,
      language,
      allInterestsError,
      allRegionsError,
      saveProfileError,
      intl
    } = this.props

    const interests = isInterestsLoading
      ? []
      : allInterests.map(interest => {
          const id = `${interest.vocabulary}:${interest.code}`
          return {
            id,
            label: interest.label[language] || interest.label['fi'],
            selected: userInterests && userInterests.includes(id)
          }
        })

    const neighborhoodsWithSubdistricts = getNeighborhoodSubdistricts(
      neighborhoods,
      subDistricts,
      language
    )
    const regionsByOcdId = regionsWithOcdId(allRegions)
    const neighbourhoodsByOcdId = neighborhoodsWithOcdId(regionsByOcdId)

    const selectedRegions =
      !userRegions || isRegionsLoading
        ? []
        : userRegions
            .map(ur => neighbourhoodsByOcdId[ur] || false)
            .filter(Boolean)
            .map(region => ({
              label: region.name[language] || region.name['fi'],
              value: region.ocd_id
            }))

    return (
      <div className="interests-view">
        <section>
          <Row>
            <Col xs={12}>
              <h1>
                <FormattedMessage id="app.interests" />
              </h1>
              <p className="lead">
                <FormattedMessage id="app.interests.text" />
              </p>
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <Col xs={12}>
              <h3>
                <FormattedMessage id="app.topics" />
              </h3>
              <p className="lead text-muted">
                <FormattedMessage id="app.topics.text" />
              </p>
              {isInterestsLoading ? (
                <Loading />
              ) : (
                <InterestsList
                  interests={interests}
                  onChange={this.interestChange}
                />
              )}
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <Col xs={12}>
              <h3>
                <FormattedMessage id="app.areas" />
              </h3>
              <p className="lead text-muted">
                <FormattedMessage id="app.areas.text" />
              </p>
              {isRegionsLoading ? (
                <Loading />
              ) : (
                <HelSelect
                  formatOptionLabel={({
                    color,
                    label,
                    neighborHoodName,
                    subDistricts
                  }) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          background: color,
                          height: 4,
                          width: 4,
                          marginRight: 4
                        }}
                      />
                      <strong>
                        {neighborHoodName}
                        &nbsp;
                      </strong>
                      {subDistricts && (
                        <span className="sub-districts">({subDistricts})</span>
                      )}
                    </div>
                  )}
                  options={neighborhoodsWithSubdistricts}
                  value={selectedRegions}
                  handleChange={this.regionsChange}
                />
              )}

              {allRegionsError && (
                <Alert className="mt-2" color="danger">
                  <span>
                    {intl.formatMessage({ id: 'app.regions.error.onLoad' })}
                  </span>
                </Alert>
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {!isRegionsLoading && (
                <RegionMap
                  userRegions={userRegions}
                  regionsByOcdId={regionsByOcdId}
                  neighbourhoodsByOcdId={neighbourhoodsByOcdId}
                  handleMapClick={this.handleMapClick}
                  language={language}
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button
                className="mt-2"
                color="success"
                onClick={() =>
                  this.props.addMessage(
                    intl.formatMessage({ id: 'app.saved' }),
                    'success'
                  )
                }
              >
                <FormattedMessage id="app.button.saveChanges" />
              </Button>

              {allInterestsError && (
                <Alert className="mt-2" color="danger">
                  <span>
                    {intl.formatMessage({ id: 'app.interests.error.onLoad' })}
                  </span>
                </Alert>
              )}

              {saveProfileError && (
                <Alert className="mt-2" color="danger">
                  <span>
                    {intl.formatMessage({ id: 'app.profile.error.onSave' })}
                  </span>
                </Alert>
              )}
            </Col>
          </Row>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isRegionsLoading: state.userReducer.allRegionsLoading,
    isInterestsLoading: state.userReducer.allInterestsLoading,
    userRegions: state.userReducer.user.divisions_of_interest,
    userInterests: state.userReducer.user.concepts_of_interest,
    allRegions: state.userReducer.allRegions,
    subDistricts: state.userReducer.allRegions.filter(
      r => r.type === 'sub_district'
    ),
    neighborhoods: state.userReducer.allRegions.filter(
      r => r.type === 'neighborhood'
    ),
    allInterests: state.userReducer.allInterests,
    language: state.intl.locale,
    allInterestsError: state.userReducer.allInterestsError,
    allRegionsError: state.userReducer.allRegionsError,
    saveProfileError: state.userReducer.saveProfileError
  }
}

export default connect(
  mapStateToProps,
  { fetchAllInterests, fetchAllRegions, updateUserData, addMessage }
)(injectIntl(Interest))
