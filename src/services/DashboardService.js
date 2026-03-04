import axios from './axios'
import Swal from 'sweetalert2'
import * as localstorage from './LocalStorage'
//{{url}}/api/turnover/getturnover?period=year
export async function getturnover (period, kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
  
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }
   
    let res = await axios
      .get(`/turnover/getturnover?period=` + period + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}

//{{url}}/api/transaction/getnbtransaction?period=month
export async function getnbtransaction (period, kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
  
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }
   
    let res = await axios
      .get(`/transaction/getnbtransaction?period=` + period + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}

//{{url}}/api/user/getnbuser
export async function getnbuser () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
  
    
    let res = await axios .get(`/user/getnbuser`).catch(err => {
      console.log('*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/')
      return undefined
    })

    return res
  }
}
//{{url}}/api/kiosk/getnbkiosk
export async function getnbkiosk () {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
  

 
    let res = await axios .get(`/kiosk/getnbkiosk`).catch(err => {
      console.log('*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/')
      return undefined
    })

    return res
  }
}
