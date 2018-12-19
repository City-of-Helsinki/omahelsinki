import React, { Component } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import indexOf from 'lodash/indexOf'

import HELSINKI_HOODS from './helsinki-hoods-topo.json'
import HELSINKI_SEA from './helsinki-sea-topo.json'

class RegionMap extends Component {
  state = {
    zoom: 450
  }

  handleClick(geography) {
    const { neighbourhoodsByOcdId, handleMapClick } = this.props
    const id = geography.properties.tunnus
    const region = Object.values(neighbourhoodsByOcdId).find(
      r => r.origin_id === id
    )
    handleMapClick(region)
  }

  render() {
    const { userRegions, neighbourhoodsByOcdId, language } = this.props

    if (!userRegions || !neighbourhoodsByOcdId) {
      return null
    }

    const selectedRegions = userRegions
      .map(ur => neighbourhoodsByOcdId[ur] || false)
      .filter(Boolean)

    const selectedRegionNames = selectedRegions.map(
      sr =>
        language === 'sv' ? sr.name.sv.toUpperCase() : sr.name.fi.toUpperCase()
    )

    return (
      <div className="map-wrapper">
        <ComposableMap projection="mercator">
          <ZoomableGroup
            zoom={this.state.zoom}
            center={[25.04, 60.21]}
            disablePanning={true}
          >
            <Geographies geography={HELSINKI_HOODS} disableOptimization={true}>
              {(geographies, projection) =>
                geographies.map((geography, i) => {
                  const name =
                    language === 'sv'
                      ? geography.properties.nimi_se.toUpperCase()
                      : geography.properties.nimi.toUpperCase()
                  const isSelected = indexOf(selectedRegionNames, name) > -1

                  return (
                    <Geography
                      key={i}
                      data-tip={name}
                      geography={geography}
                      projection={projection}
                      onClick={g => this.handleClick(g)}
                      style={{
                        default: {
                          fill: isSelected ? '#0500B7' : '#CBD0CD',
                          stroke: 'white',
                          strokeWidth: 0.0015,
                          outline: 'none'
                        },
                        hover: {
                          fill: '#0500B7',
                          stroke: '#ffffff',
                          strokeWidth: 0.0015,
                          outline: 'none'
                        },
                        pressed: {
                          fill: '#0500B7',
                          stroke: '#ffffff',
                          strokeWidth: 0.0015,
                          outline: 'none'
                        }
                      }}
                    />
                  )
                })
              }
            </Geographies>
            <Geographies geography={HELSINKI_SEA}>
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    tabable={false}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#9fc9eb',
                        strokeWidth: 0,
                        outline: 'none'
                      },
                      hover: {
                        fill: '#9fc9eb',
                        strokeWidth: 0,
                        outline: 'none'
                      },
                      pressed: {
                        fill: '#9fc9eb',
                        strokeWidth: 0,
                        outline: 'none'
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
      </div>
    )
  }
}

export default RegionMap
