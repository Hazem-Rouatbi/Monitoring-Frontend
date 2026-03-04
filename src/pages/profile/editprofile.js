import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import Swal from 'sweetalert2'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import editprofileusr from './../../assets/image/editprofileusr.png'
import Form from 'react-bootstrap/Form'
import * as userservice from '../../services/UserService'
import * as localstorage from '../../services/LocalStorage'
import './../../assets/css/profile.css'
const Editprofile = () => {
  const [validated, setValidated] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState([])
  const [state, setState] = useState({
    oldpassword: '',
    cnewpassword: '',
    newpassword: ''
  })

  useEffect(() => {}, [])

  useLayoutEffect(() => {
    setName(localstorage.loadName())
    const rl = localstorage.loadRoles()
    var tb = []
    console.log('28')
    rl.forEach(element => {
      switch (element) {
        case 'ROLE_ADMIN':
          console.log('32')
          tb.push('Administrateur')
          break
        case 'ROLE_FINANCIAL':
          tb.push('Financier')
          break
        case 'ROLE_RESPONSIBLE':
          tb.push('Responsable')
          break
        default:
          tb.push('Inconnue')
          break
      }
    })
    console.log('45')
    setRole(tb)
  }, [])
  const changeCreds = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.stopPropagation()

    setValidated(true)
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      if (state.cnewpassword == state.newpassword) {
        const res = await userservice.updatepassword(state)
        console.log(JSON.stringify(res.data))
        console.log(res.data.code)
        if (res.data.code == 0) {
          Swal.fire({
            title: 'Succès!',
            text: 'Le mot de passe mis à jour avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(result => {
            window.location.href = '/#/page/profile/user'
          })
        } else {
          Swal.fire({
            title: 'Erreur!',
            text:
              'Impossible de mettre à jour le mot de passe.Vérifier les informations saisies',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } else {
        Swal.fire({
          title: 'Attention!',
          text: 'La confirmation du nouveau mot de passe est incorrecte',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    }
  }
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div class='row container d-flex justify-content-center  backcolor'>
          <div class='col-4 bg-c-lite-green user-profile rounded-lg'>
            <div class='card-block text-center text-white'>
              <div class='m-b-25'>
                <img
                  src={editprofileusr}
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
                Éditer le profil
                <br />
              </h6>
              <br />
              <div class='row justify-content-md-center'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='validationCustom01'
                  >
                    <Form.Label class='f-w-600' column sm='8'>
                      Le nouveau mot de passe
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        name='newpassword'
                        minLength={6}
                        value={state.newpassword}
                        onChange={event => changeCreds(event)}
                        required
                        type='password'
                        placeholder='nouveau mot de passe'
                      />
                      <Form.Control.Feedback type='invalid'>
                        Le nouveau mot de passe est obligatoire(au moins 6
                        caractères)
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='validationCustom01'
                  >
                    <Form.Label class='f-w-600' column sm='8'>
                      Confirmez Le nouveau mot de passe
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        name='cnewpassword'
                        minLength={6}
                        value={state.cnewpassword}
                        onChange={event => changeCreds(event)}
                        required
                        type='password'
                        placeholder='nouveau mot de passe'
                      />
                      <Form.Control.Feedback type='invalid'>
                        Confirmez Le nouveau mot de passe est obligatoire(au
                        moins 6 caractères)
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='validationCustom02'
                  >
                    <Form.Label class='f-w-600' column sm='8'>
                      L'ancien mot de passe
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        name='oldpassword'
                        minLength={6}
                        value={state.oldpassword}
                        onChange={event => changeCreds(event)}
                        required
                        type='password'
                        placeholder='ancien mot de passe'
                      />
                      <Form.Control.Feedback type='invalid'>
                        L'ancien mot de passe est obligatoire(au moins 6
                        caractères)
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Button type='submit'>ok</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editprofile
