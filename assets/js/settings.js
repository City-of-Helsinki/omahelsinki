import lodashGet from 'lodash/get'

export const profileApiUrl = window['PROFILE_API_URL']
export const tunnistamoUrl = window['TUNNISTAMO_BASE_URL']
export const profileToken = lodashGet(
  window,
  `API_TOKENS['https://api.hel.fi/auth/profiles']`
)
export const tunnistamoToken = lodashGet(window, 'TUNNISTAMO_ACCESS_TOKEN')
export const tunnistamoUser = lodashGet(window, 'TUNNISTAMO_USER')
