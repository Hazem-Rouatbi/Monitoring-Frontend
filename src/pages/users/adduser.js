import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import * as userservice from '../../services/UserService'
const Adduser = () => {
  const [validated, setValidated] = useState(false)
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    username: '',
    password: '',
    telephone: null,
    enable: true,
    roles: ''
  })
  const changeCreds = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.stopPropagation()

    setValidated(true)
    const form = event.currentTarget
    if (true) {
      const resadd = await userservice.adduser(state)
      
      if (resadd !== undefined && resadd !== null) {
        if (resadd?.data?.code == 0) {
          Swal.fire({
            title: 'success!',
            text: 'Utilisateur ajouté avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(result => {
            window.location.href = '#/page/users'
          })
        } else {
          
          Swal.fire({
            title: 'Error!',
            text: 'une erreur(' + resadd?.response?.data?.message.split('.')[1] + ') se produit avec ',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }
    }
  }
  useEffect(() => {
    console.log('useEffect Statements')
  })

  useLayoutEffect(() => {
    console.log('useLayoutEffect Statements')
  }, [])
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h3>Ajouter un nouvel utilisateur</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Check
                    name='enable'
                    checked={state.enable}
                    onChange={event =>
                      setState({ ...state, enable: !state.enable })
                    }
                    required
                    label='Activer'
                    feedbackType='invalid'
                  />
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Nom
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='firstname'
                      value={state.firstname}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Nom'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le nom est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Prenom
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='lastname'
                      value={state.lastname}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Prenom'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le Prenom est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    E-mail
                  </Form.Label>
                  <Col sm='8'>
                    <InputGroup>
                      <Form.Control
                        name='email'
                        value={state.email}
                        onChange={event => changeCreds(event)}
                        required
                        type='email'
                        placeholder='azerty@cvbg.vf'
                      />
                      <InputGroup.Text id='inputGroupPrepend'>
                        @
                      </InputGroup.Text>
                      <Form.Control.Feedback type='invalid'>
                        L'email est obligatoire(ou/et la forma est incorrect).
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Le numéro du téléphone
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='telephone'
                      value={state.telephone}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Numéro du téléphone'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le numéro du téléphone est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Adresse
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='address'
                      value={state.address}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Adresse'
                    />
                    <Form.Control.Feedback type='invalid'>
                      L'addresse est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Nom d'utilisateur
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='username'
                      value={state.username}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder="Nom d'utilisateur"
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le nom d'utilisateur est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Le mot de passe
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='password'
                      value={state.password}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Mot de passe'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le mot de passe est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Rôle
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Select
                      id='username'
                      className='input-transparent pl-3'
                      name='roles'
                      value={state.roles}
                      onChange={event => changeCreds(event)}
                      required
                      placeholder='First name'
                    >
                      <option value=''>Ouvrir</option>
                      <option value='admin'>Admin</option>
                      <option value='responsible'>Responsable</option>
                      <option value='financial'>Financier</option>
                      <option value='user'>User</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      Veuillez choisir un rôle
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
  )
}

export default Adduser
