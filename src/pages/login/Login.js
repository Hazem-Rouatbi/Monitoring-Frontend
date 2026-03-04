import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input
} from 'reactstrap'
import Widget from '../../components/Widget/Widget'
import Footer from '../../components/Footer/Footer'
import { loginUser } from '../../actions/auth'
import hasToken from '../../services/authService'

import loginImage from '../../assets/image/logopaypos.svg'
import './Login.css'

import Swal from 'sweetalert2'

import * as loginservice from '../../services/LoginService'
import * as localstorage from '../../services/LocalStorage'
const Login = props => {
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const doLogin = async e => {
    e.preventDefault()
    const log = await loginservice.logingg(state.username, state.password)
    if (
      localstorage.loadAccess() !== undefined &&
      localstorage.loadAccess() !== null
    ) {
      props.dispatch(loginUser())
      window.location.href="/"
    } else {
      await Swal.fire({
        title: 'Utilisateur non trouvé!',
        text:
          "Assurez-vous que le nom d'utilisateur et le mot de passe sont valides",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const changeCreds = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const { from } = props.location.state || { from: { pathname: '/page' } }
  if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
    return <Redirect to={from} />
  }

  return (
    <div className='auth-page'>
      <Container className='col-12'>
        <Row className='d-flex  justify-content-md-center'>
          <Col xs={12} lg={6} className='left-column my-5'>
            <Widget className='widget-auth widget-p-lg'>
              <div className='image-container'>
                <img
                  src={loginImage}
                  alt='logopaypos'
                  style={{ height: 212, width: 144 }}
                />
              </div>
              <form onSubmit={event => doLogin(event)}>
                <FormGroup className='my-3'>
                  <FormText>Nom d'utilisateur</FormText>
                  <Input
                    id='username'
                    className='input-transparent pl-3'
                    value={state.username}
                    onChange={event => changeCreds(event)}
                    type='text'
                    required
                    name='username'
                  />
                </FormGroup>
                <FormGroup className='my-3'>
                  <div className='d-flex justify-content-between'>
                    <FormText>Mot de passe</FormText>
                  </div>
                  <Input
                    id='password'
                    className='input-transparent pl-3'
                    value={state.password}
                    onChange={event => changeCreds(event)}
                    type='password'
                    required
                    name='password'
                  />
                </FormGroup>
                <div className='bg-widget d-flex justify-content-center'>
                  <Button
                    className='rounded-pill my-3'
                    type='submit'
                    color='primary'
                  >
                    Connexion
                  </Button>
                </div>
              </form>
            </Widget>
          </Col>
        </Row>
      </Container>
     
    </div>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  }
}

export default withRouter(connect(mapStateToProps)(Login))
