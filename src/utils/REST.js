import path from 'path'
const BASE_URL = 'http://localhost:8000'
const types = ['전국건강증진센터표준데이터', '정신건강관련전체기관정보']
class REST {
  constructor () {
    this.serverURL = BASE_URL
  }

  async fetchRoomID (score, totalScore, timeout = 30) {
    const res = await fetch(BASE_URL + '/1', { method: 'POST', body: this.formData({ Score: score, TotalScore: totalScore, timeout }), headers: { 'content-type': 'application/x-www-form-urlencoded' } })

    return await res.text()
  }

  async getHospitalData (lat, long, type) { // 0 = 건강증진, 1 = 정신건강 노잼
    const res = await fetch(BASE_URL + '/api/nearest', { method: 'POST', body: JSON.stringify({ Pos: [lat, long], type: types[type] }), headers: { 'content-type': 'application/json' } })

    return await res.json()
  }

  formData (details) {
    const formBody = []
    for (const property in details) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    return formBody.join('&')
  }
}
export default REST

export const baseURL = BASE_URL
