import axios from './axios'
import Swal from 'sweetalert2'
import * as localstorage from './LocalStorage'
//{{url}}/api/cashbox/get?page=0&size=1&type=banknotes
export async function getcashbox (page, size, kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }

console.log(`/cashbox/get?page=` + page + `&size=` + size + filtre)
    let res = await axios
      .get(`/cashbox/get?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })
console.log(res)
    return res
  }
}

//{{url}}/api/cashbox/getfeeding?page=0&size=1&kioskid=f8f6327b-90ae-492d-a0f5-6368dd9f1021

export async function getfeeding (
  page,
  size,
  kioskid,
  type,
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
    if (type && type !== 'all') {
      filtre += '&type=' + type
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
    console.log(`/cashbox/getfeeding?page=` + page + `&size=` + size + filtre)
    let res = await axios
      .get(`/cashbox/getfeeding?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
//{{url}}/api/cashbox/getclose?page=0&size=4
export async function getclose (
  page,
  size,
  kioskid,
  type,
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
    if (type && type !== 'all') {
      filtre += '&type=' + type
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
      .get(`/cashbox/getfeeding?page=` + page + `&size=` + size + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
//{{url}}/api/payout/findall?cashboxid=56e500ea-4a57-4234-8426-70c8f87fca0e
export async function getpayoutchennels (cashboxid,kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '&kioskid=' + kioskid
    }
    let res = await axios
      .get(`/payout/findall?cashboxid=` + cashboxid + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
//{{url}}/api/cashbox/getfeedingdetails/ff7974c8-4e2a-47ea-89bf-1878ceebef30
export async function getfeedingdetails (idfeeding, kioskid) {
  if (
    localstorage.loadAccess() !== undefined &&
    localstorage.loadAccess() !== null
  ) {
    var filtre = ''
    if (kioskid && kioskid !== 'all') {
      filtre += '?kioskid=' + kioskid
    }
    console.log(`/cashbox/getfeedingdetails/` + idfeeding + filtre)
    let res = await axios
      .get(`/cashbox/getfeedingdetails/` + idfeeding + filtre)
      .catch(err => {
        console.log(
          '*/*/*/*/*/*/*/*/*/*/' + err + '/*/*/*/*/*/*/*/*/*/*/*/*/*/'
        )
        return undefined
      })

    return res
  }
}
