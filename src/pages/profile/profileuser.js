import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Moment from 'react-moment'
import showprofile from './../../assets/image/showprofile.png'
import * as userservice from '../../services/UserService'
import './../../assets/css/profile.css'
const Profileuser = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState([])
  const [address, setAddress] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [createdat, setCreatedat] = useState('')
  const [updatedat, setUpdatedat] = useState('')

  useEffect(() => {
    getuser()
  }, [])

  useLayoutEffect(() => {}, [])
  const getuser = async () => {
    const res = await userservice.getuser()
    if (res !== undefined && res !== null) {
      console.log(JSON.stringify(res.data))
      console.log(res.data.firstname + ' ' + res.data.lastname)
      setName(res.data.firstname + ' ' + res.data.lastname)
      const rl = res.data.roles
      var tb = []
      console.log('28')
      rl.forEach(element => {
        switch (element) {
          case 'admin':
            console.log('32')
            tb.push('Administrateur')
            break
          case 'financial':
            tb.push('Financier')
            break
          case 'responsible':
            tb.push('Responsable')
            break
          default:
            tb.push('Inconnue')
            break
        }
      })
      setRole(tb)
      setAddress(res.data.address)
      setTelephone(res.data.telephone)
      setEmail(res.data.email)
      setCreatedat(res.data.createdAt)
      setUpdatedat(res.data.updatedAt)
    }
    console.log(name)
  }
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div class='row container d-flex justify-content-center  backcolor'>
          <div class='col-4 bg-c-lite-green user-profile rounded-lg'>
            <div class='card-block text-center text-white'>
              <div class='m-b-25'>
                <img
                  src='https://img.icons8.com/bubbles/100/000000/user.png'
                  class='img-radius'
                  alt='User-Profile-Image'
                />
              </div>
              <h6 class='f-w-600'>{name}</h6>
              {role.map(option => (
                <p key={option}>{option}</p>
              ))}
              <i class=' mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16'></i>
            </div>
          </div>
          <div class='col-sm-8'>
            <div class='card-block'>
              <h6 class='m-b-20 p-b-5 b-b-default f-w-600'>
                Information
                <br />
              </h6>
              <br />
              <div class='row'>
                <div class='col'>
                  <p class='f-w-600'>Email</p>
                  <h6 class='text-muted f-w-400'>{email}</h6>
                </div>
                <div class='col-sm-6'>
                  <p class='f-w-600'>Phone</p>
                  <h6 class='text-muted f-w-400'>{telephone}</h6>
                </div>
              </div>
              <br />
              <div class='row'>
                <div class='col-sm-6'>
                  <p class='f-w-600'>Adresse</p>
                  <h6 class='text-muted f-w-400'>{address}</h6>
                </div>
              </div>
              <br />
              <div class='row'>
                <div class='col-sm-6'>
                  <p class='m-b-10 f-w-600'>Date de création :</p>
                  <h6 class='text-muted f-w-400'>
                    <Moment format='DD-MM-YYYY hh:mm:ss'>{createdat}</Moment>
                  </h6>
                </div>
                <div class='col-sm-6'>
                  <p class='m-b-10 f-w-600'>Dernière mise à jour:</p>
                  <h6 class='text-muted f-w-400'>
                    <Moment format='DD-MM-YYYY hh:mm:ss'>{updatedat}</Moment>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profileuser
