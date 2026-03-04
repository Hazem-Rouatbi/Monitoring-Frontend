import axios from './axios'
import Swal from 'sweetalert2'

import * as localstorage from './LocalStorage'
export async function getallkioskpagination (page, size, enable, status) {
  console.log('getallkioskpagination')
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (status && status !== 'all') {
      filtre += '&status=' + status
    }
    if (enable && enable !== 'all') {
      filtre += '&enable=' + enable
    }
    let res = await axios
      .get(`/kiosk/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        return undefined
      })
    console.log(res)
    return res
  }
}
export async function getallkiosk () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios.get(`/kiosk/findall`).catch(err => {
      return undefined
    })
    return res
  }
}

export async function addkiosk (state) {
  var status = 'works'
  var enable = state.enable == true ? 1 : 0
  var kiosk =
    '{      "label": "' +
    state.label +
    '",      "address": "' +
    state.address +
    '",      "token":"' +
    state.token +
    '" ,      "position": [' +
    state.positionx +
    ',' +
    state.positiony +
    '],      "enable": "' +
    enable +
    '",      "status": "' +
    status +
    '",      "username": "' +
    state.username +
    '",      "password": "' +
    state.password +
    '",      "userid":  "' +
    state.userid +
    '"  }'
  const instance = axios.create({
    timeout: 100000,
    headers: { Authorization: 'Bearer ' + localstorage.loadAccess() }
  })
  let res = await instance.post(`/kiosk/add/`, JSON.parse(kiosk)).catch(err => {
    return undefined
  })
  return res
}

export async function getlistidnameadr () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios.get(`/kiosk/getlistkiosknameid`).catch(err => {
      return undefined
    })
    return res
  }
}
export async function getallkiosksmall (enable, status) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (enable && enable !== 'all') {
      filtre += '?enable=' + enable
    }

    if (status && status !== 'all') {
      if (filtre == '') {
        filtre += '?'
      } else {
        filtre += '&'
      }
      filtre += 'status=' + status
    }

    let res = await axios.get(`/kiosk/findallsmall` + filtre).catch(err => {
      return []
    })
    console.log()
    return res.data.data.rows
  }
  return []
}
export async function changerpower (enable, id) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var body = '{     "enable": "' + enable + '"  }'
    let res = await axios
      .patch(`/kiosk/changerpower/` + id, JSON.parse(body))
      .catch(err => {
        return undefined
      })
    return res
  }
  return undefined
}
export async function getkiosk (id) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {

    let res = await axios.get(`/kiosk/get/` + id).catch(err => {
      return undefined
    })
    console.log(res.data)
    return res.data.data
  }
  return undefined
}
//{{url}}/api/kiosk/getbyresp
export async function getinfkskbyrsp () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    console.log(`/kiosk/getbyresp`)
    let res = await axios.get(`/kiosk/getbyresp`).catch(err => {
      return undefined
    })
    console.log()
    if (res.data.code == 0) {
      return res.data.data
    } else {
      return undefined
    }
  }
  return undefined
}
