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
import * as deviceservice from '../../services/DeviceService'
import * as kioskservice from '../../services/KioskService'
const Adddevice = () => {
  const [validated, setValidated] = useState(false)
  const [dataksk, setDataksk] = useState([])
  const [state, setState] = useState({
    reference: '',
    status: 'works',
    name: '',
    dtype: '',
    kioskid: ''
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
      const resadd = await deviceservice.adddevice(state)
      if (resadd !== undefined && resadd !== null) {
        if (resadd.data.code == 0) {
          Swal.fire({
            title: 'success!',
            text: 'Périphériques ajouté avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(result => {
            window.location.href = '#/page/devices'
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
  const getinfkiosk = async () => {
    var res = await kioskservice.getallkiosksmall('all', 'all')
    if (res) {
      setDataksk(res)
    }
  }

  useEffect(() => {
    console.log('useEffect Statements')
  })

  useLayoutEffect(() => {
    getinfkiosk()
  }, [])
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h3>Ajouter un nouvel périphérique</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Référence
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      name='reference'
                      value={state.reference}
                      onChange={event => changeCreds(event)}
                      required
                      type='text'
                      placeholder='Référence'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Le référence est obligatoire.
                    </Form.Control.Feedback>
                  </Col>
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
                      name='name'
                      value={state.name}
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
                    Type
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Select
                      id='dtype'
                      className='input-transparent pl-3'
                      name='dtype'
                      value={state.dtype}
                      onChange={event => changeCreds(event)}
                      required
                    >
                      <option value=''>Ouvrir</option>
                      <option value='coinsacceptor'>monnayeur</option>
                      <option value='banknotesacceptor'>
                        accepteur de billets
                      </option>
                      <option value='printer'>imprimante</option>
                      <option value='sorter'>Caisse Intermédiaire</option>
                      <option value='hopper'>Rondeur de monnaies</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      Veuillez choisir un type
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='validationCustom01'
                >
                  <Form.Label column sm='2'>
                    Borne
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Select
                      id='kioskid'
                      className='input-transparent pl-3'
                      name='kioskid'
                      value={state.kioskid}
                      onChange={event => changeCreds(event)}
                      required
                    >
                      <option value=''>Ouvrir</option>
                      {dataksk.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label} {option.address}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      Veuillez choisir un borne.
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

export default Adddevice
