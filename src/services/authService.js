import * as jwt_decode from 'jwt-decode'
import * as localstorage from '../services/LocalStorage'

const hasToken = auth => {
  if (auth) {
    const token = localstorage.loadAccess()
    let decodedToken = jwt_decode.jwtDecode(token)
    //  console.log('Decoded Token', decodedToken)
    let currentDate = new Date()

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log('Token expired.')
      localstorage.emptystorage()
      return false
    } else {
      console.log('Valid token')

      return true
    }
  }
}

export default hasToken
