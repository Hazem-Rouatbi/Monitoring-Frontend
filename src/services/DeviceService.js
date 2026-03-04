import Swal from 'sweetalert2'

import axios from './axios'
import * as localstorage from './LocalStorage'
//{{url}}/api/device/get?page=0&size=1
export async function getalldevicepagination (page, size, status, kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (status && status !== 'all') {
      filtre += '&status=' + status
    }
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }

    let res = await axios
      .get(`/device/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
//{{url}}/api/device/findall
export async function findalldevice () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios.get(`/device/findall`).catch(err => {
      return undefined
    })
    return res
  }
}

export async function adddevice (state) {
  var device =
    '{      "reference": "' +
    state.reference +
    '",      "status": "works",      "name":"' +
    state.name +
    '",      "dtype":"' +
    state.dtype +
    '" ,      "kioskid": "' +
    state.kioskid +
    '" }'

  console.log(device)
  const instance = axios.create({
    timeout: 100000,
    headers: { Authorization: 'Bearer ' + localstorage.loadAccess() }
  })
  let res = await instance
    .post(`/device/add/`, JSON.parse(device))
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return undefined
    })
  return res
}

export async function getotheruser (id) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    if (localstorage.loadId() !== undefined && localstorage.loadId() !== null) {
      let res = await axios.get(`/user/get/` + id).catch(err => {
        return undefined
      })
      return res.data.data
    }
  }
  return undefined
}

export async function getallkioskinf (enable) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios.get(`/kiosk/get?enable=` + enable).catch(err => {
      return []
    })
    return res.data.data.users
  }
  return []
}

export async function getdevice (id) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    if (localstorage.loadId() !== undefined && localstorage.loadId() !== null) {
      let res = await axios.get(`/device/get/` + id).catch(err => {
        return undefined
      })
      return res.data.data
    }
  }
  return undefined
}
