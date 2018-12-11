import axios from 'axios'

export default config => {
  const client = axios.create(config)

  client.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      if (error.response.status === 401) {
        location.href = '/please-log-in'
      }
      return Promise.reject(error)
    }
  )

  return client
}
