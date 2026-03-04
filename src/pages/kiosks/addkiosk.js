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
import * as kioskservice from '../../services/KioskService'
import * as userservice from '../../services/UserService'
const Addkiosk = () => {
  const [validated, setValidated] = useState(false)
  const [datausr, setDatausr] = useState([])
  const [state, setState] = useState({
    label: '',
    address: '',
    positionx: '',
    positiony: '',
    status: true,
    enable: true,
    userid: '',
    username: '',
    password: ''
  })
  const changeCreds = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.stopPropagation()

    setValidated(true)
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      const resadd = await kioskservice.addkiosk(state)
      if (resadd !== undefined && resadd !== null) {
        if (resadd.data.code == 0) {
          Swal.fire({
            title: 'success!',
            text: 'Borne ajouté avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(result => {
            window.location.href = '#/page/kiosks'
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'une erreur(' + resadd.data.code + ') se produit avec ',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }
    }
  }
  const getinfuser = async () => {
    var res = await userservice.getallusersmall(1)
    if (res) {
      setDatausr(res)
    }
  }

  useEffect(() => {
    
    console.log('useEffect Statements')
  })

  useLayoutEffect(() => {
    getinfuser()
  }, [])
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h3>Ajouter un nouvel borne</h3>
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
                    Label
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='label'
                      value={state.label}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Label'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le Label est obligatoire.
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
                      placeholder='adresse'
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
                    Latitude
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='positionx'
                      value={state.positionx}
                      onChange={event => changeCreds(event)}
                      required
                      type='number'
                      step='0.1'
                      placeholder='latitude'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le latitude est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Longitude
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='positiony'
                      value={state.positiony}
                      onChange={event => changeCreds(event)}
                      required
                      type='number'
                      step='0.1'
                      placeholder='longitude'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le longitude est obligatoire.
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
                    Responsable
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Select
                      id='userid'
                      className='input-transparent pl-3'
                      name='userid'
                      value={state.userid}
                      onChange={event => changeCreds(event)}
                      required
                      placeholder='First name'
                    >
                      <option value=''>Ouvrir</option>
                      {datausr.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.firstname} {option.lastname}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                    Veuillez choisir un responsable.
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

export default Addkiosk
