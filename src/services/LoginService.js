import axios from './axios'

import * as localstorage from './LocalStorage'

export async function logingg (username, password) {
  var userst =
    '{"username": "' + username + '","password": "' + password + '" }'

  var user = JSON.parse(userst)

  await axios
    .post(`/user/auth/signin`, user)
    .then(res => {
      if (res.data.accessToken !== undefined && res.data.accessToken !== null) {
        localstorage.saveId(res.data.id)
        console.log(res.data.name)
        localstorage.saveName(res.data.name)
        localstorage.saveEmail(res.data.email)
        localstorage.saveAccess(res.data.accessToken)
        localstorage.saveRoles(res.data.roles)
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      console.log('err ' + err)
      return false
    })
}

export async function logoutt () {
  localstorage.emptystorage()
  try {
    await axios
      .post(`/user/auth/signout`)
      .then(res => {
        localstorage.emptystorage()
        return true
      })
      .catch(err => {
        console.log('err ' + err)
        return false
      })
  } catch (error) {}
  return true
}
