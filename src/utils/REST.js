import path from 'path'
const BASE_URL = 'http://localhost:8000'
class REST {
  constructor () {
    this.serverURL = BASE_URL
  }

  getToken () {
    return fetch(this.serverURL + '/1')
  }
}
export default REST

export const baseURL = BASE_URL
