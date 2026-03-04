export const loadAccess = () => {
  try {
    const serializedState = localStorage.getItem('access')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    return undefined
  }
}
export const saveAccess = access => {
  try {
    const serializedState = JSON.stringify(access)
    localStorage.setItem('access', serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    //ignoring write erros
  }
}
export const loadName = () => {
  try {
    const serializedState = localStorage.getItem('nameusre')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    return undefined
  }
}
export const saveName = nameusre => {
  try {
    const serializedState = JSON.stringify(nameusre)
    console.log(nameusre)
    localStorage.setItem('nameusre', serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    //ignoring write erros
  }
}
export const loadRoles = () => {
  try {
    const serializedState = localStorage.getItem('rolesusre')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    return undefined
  }
}
export const saveRoles = rolesusre => {
  try {
    const serializedState = JSON.stringify(rolesusre)
    localStorage.setItem('rolesusre', serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    //ignoring write erros
  }
}
export const loadEmail = () => {
  try {
    const serializedState = localStorage.getItem('email')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    return undefined
  }
}
export const saveEmail = email => {
  try {
    const serializedState = JSON.stringify(email)
    localStorage.setItem('email', serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    //ignoring write erros
  }
}
export const loadId = () => {
  try {
    const serializedState = localStorage.getItem('id')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    return undefined
  }
}
export const saveId = id => {
  try {
    const serializedState = JSON.stringify(id)
    localStorage.setItem('id', serializedState)
  } catch (err) {
    console.log('exception ==>' + err.message)
    //ignoring write erros
  }
}

export const emptystorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (err) {
    console.log('exception ==>' + err.message)
    return false
  }
}
