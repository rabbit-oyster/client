import path from 'path'
const BASE_URL = 'http://localhost:8000'
const types = ['전국건강증진센터표준데이터', '정신건강관련전체기관정보']
class REST {
  constructor () {
    this.serverURL = BASE_URL
  }

  getHospitalData (lat, long, type) { // 0 = 건강증진, 1 = 정신건강 노잼
    fetch(BASE_URL + '/api/nearest', { method: 'POST', body: JSON.stringify({ Pos: [lat, long], type: types[type] }) })
  }
}
export default REST

export const baseURL = BASE_URL
