import axios from './axios'
import Swal from 'sweetalert2'

import * as localstorage from './LocalStorage'
//{{url}}/api/user/get?page=0&size=1
export async function getalluserpagination (page, size, status, role) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (status && status !== 'all') {
      filtre += '&enable=' + status
    }
    if (role && role !== 'all') {
      filtre += '&role=' + role
    }

    let res = await axios
      .get(`/user/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
//{{url}}/api/user/findall
export async function findalluser () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios.get(`/user/findall`).catch(err => {
      return undefined
    })
    return res
  }
}

export async function adduser (state) {
  var enable = state.enable == true ? 1 : 0
  var user =
    '{      "firstname": "' +
    state.firstname +
    '",      "lastname": "' +
    state.lastname +
    '",      "email":"' +
    state.email +
    '",      "telephone":"' +
    state.telephone +
    '" ,      "address": "' +
    state.address +
    '",      "username": "' +
    state.username +
    '",      "password": "' +
    state.password +
    '",      "enable": "' +
    enable +
    '",      "roles":  ["' +
    state.roles +
    '"]  }'
  console.log(user)
  const instance = axios.create({
    timeout: 100000,
    headers: { Authorization: 'Bearer ' + localstorage.loadAccess() }
  })
  let res = await instance.post(`/user/add/`, JSON.parse(user)).catch(err => {
   return err
  })
  return res
}

/* {{baseurl}}/api/user/get/04bdf4cd-679e-4868-99b4-364adad2305d */
export async function getuser () {
  console.log('*/*/*/*/*/*/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*/*/')
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    if (localstorage.loadId() !== undefined && localstorage.loadId() !== null) {
      const id = localstorage.loadId()
      let res = await axios.get(`/user/get/` + id).catch(err => {
        return undefined
      })
      return res.data
    }
  }
  return undefined
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

export async function changerstatus (status, id) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var body = '{     "enable": "' + status + '"  }'
    let res = await axios
      .patch(`/user/updatestatus/` + id, JSON.parse(body))
      .catch(err => {
        return undefined
      })
    return res
  }
}

export async function getallusersmall (enable) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    let res = await axios
      .get(`/user/findallsmall?enable=` + enable + '&role=responsible')
      .catch(err => {
        return []
      })
    return res.data.data.rows
  }
  return []
}

export async function updatepassword (state) {
  var user =
    '{      "newpassword": "' +
    state.newpassword +
    '",      "oldpassword": "' +
    state.oldpassword +
    '" }'

  const instance = axios.create({
    timeout: 100000,
    headers: { Authorization: 'Bearer ' + localstorage.loadAccess() }
  })
  let res = await instance
    .patch(`/user/updatepassword/`, JSON.parse(user))
    .catch(err => {
      console.log(err)
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
