import { keyBy, mapValues } from 'lodash'

export function getNeighborhoodSubdistricts(
  neighborhoods,
  subDistricts,
  language
) {
  return neighborhoods.map(nbr => {
    const name = nbr.name[language] || nbr.name['fi']
    const sbr = subDistricts
      .filter(r => {
        return r.origin_id.slice(0, 2) === nbr.origin_id
      })
      .map(sbr => sbr.name[language] || sbr.name['fi'])

    const label = sbr.length > 0 ? `${name} (${sbr.join(', ')})` : name

    return {
      label: label,
      value: nbr.ocd_id
    }
  })
}

export function regionsWithOcdId(allRegions) {
  return keyBy(allRegions, region => region.ocd_id)
}

export function neighborhoodsWithOcdId(regionsByOcdId) {
  return mapValues(regionsByOcdId, region => {
    const id = region.origin_id.slice(0, 2)
    return Object.values(regionsByOcdId).find(r => r.origin_id === id)
  })
}
