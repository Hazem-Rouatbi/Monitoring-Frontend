import axios from './axios'
import Swal from 'sweetalert2'

import * as localstorage from './LocalStorage'
//{{url}}/api/notification/get?page=0&size=1
export async function getallnotificationpagination (
  page,
  size,
  kioskid,
  type,
  startdate,
  enddate
) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }
    if (type && type !== 'all') {
      filtre += '&type=' + type
    }
    if (
      startdate &&
      startdate !== 'all' &&
      startdate !== null &&
      startdate !== undefined
    ) {
      filtre += '&startdate=' + startdate
    }
    if (
      enddate &&
      enddate !== 'all' &&
      enddate !== null &&
      enddate !== undefined
    ) {
      filtre += '&enddate=' + enddate
    }
  
    let res = await axios
      .get(`/notification/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}

//Retrieve lot of notifications today
//{{url}}/api/notification/getinfo
export async function getinfonotifications (kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '?kioskid=' + kioskid
    }
    let res = await axios.get(`/notification/getinfo` + filtre).catch(err => {
      console.log('*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/')
      return undefined
    })

    return res
  }
}
