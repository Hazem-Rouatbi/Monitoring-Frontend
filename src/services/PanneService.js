import axios from './axios'
import Swal from 'sweetalert2'

import * as localstorage from './LocalStorage'
//{{url}}/api/panne/get?page=0&size=1
export async function getallpannepagination (
  page,
  size,
  kioskid,
  status,
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
    if (status && status !== 'all') {
      filtre += '&status=' + status
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
      .get(`/panne/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}

//Retrieve lot of pannes today
//{{url}}/api/pannes/getinfo
export async function getinfopannes (kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '?kioskid=' + kioskid
    }
    console.log(`/panne/getinfo` + filtre)
    let res = await axios.get(`/panne/getinfo` + filtre).catch(err => {
      console.log('*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/')
      return undefined
    })
    console.log(res)
    return res
  }
}
