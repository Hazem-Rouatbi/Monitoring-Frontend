import * as localstorage from './LocalStorage'

export const isAdmin = () => {
  const roles = localstorage.loadRoles()
  var res = false
  roles.forEach(element => {
    if (element.toLowerCase().includes('admin') == true) {
      res = true
    }
  })
  return res
}
export const isResponsible = () => {
  const roles = localstorage.loadRoles()
  var res = false
  roles.forEach(element => {
    if (element.toLowerCase().includes('responsible') == true) {
      res = true
    }
  })
  return res
}
export const isFinancial = () => {
  const roles = localstorage.loadRoles()
  var res = false
  roles.forEach(element => {
    if (element.toLowerCase().includes('financial') == true) {
      res = true
    }
  })
  return res
}
export const isUser = () => {
  const roles = localstorage.loadRoles()
  var res = false
  roles.forEach(element => {
    if (element.toLowerCase().includes('user') == true) {
      res = true
    }
  })
  return res
}
