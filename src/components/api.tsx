import axios from 'axios'

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

let serverURL = 'http://localhost:8000'
let defaultTimeout = 30000

axios.defaults.baseURL = serverURL
axios.defaults.timeout = defaultTimeout

const api = axios.create()
export default api 