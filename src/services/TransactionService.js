import axios from './axios'
import Swal from 'sweetalert2'

import * as localstorage from './LocalStorage'
//{{url}}/api/device/get?page=0&size=1
export async function getalltransactionpagination (
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
      .get(`/transaction/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })      
    return res
  }
}
