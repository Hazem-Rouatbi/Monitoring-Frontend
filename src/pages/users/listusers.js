import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Switch from 'react-switch'
import Moment from 'react-moment'
import './../../assets/css/table.css'
import * as userservice from '../../services/UserService'
const Listusers = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(8)
  const [totalPages, setTotalPages] = useState(0)
  const [frole, setFrole] = useState('')
  const [fstatus, setFstatus] = useState('all')
  const [data, setData] = useState([])
  useEffect(() => {
    initdata()
  }, [page, fstatus])

  useLayoutEffect(() => {
    console.log('useLayoutEffect Statements')
  }, [])
  const initdata = async () => {
    const res = await userservice.getalluserpagination(
      page - 1,
      size,
      fstatus,
      frole
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.users
      for (let i = 0; i < data0.length; i++) {
        if (data0[i].createdBy !== 'server') {
          const res = await userservice.getotheruser(data0[i].createdBy)
          var nameusr = ''
          if (res !== undefined && res !== null) {
            nameusr = res.firstname + ' ' + res.lastname
          }
          data0[i].createdBy = nameusr
        }
      }
      setData(data0)
      console.log(JSON.stringify(data))
      setTotalItems(res.data.data.totalItems)
      setTotalPages(res.data.data.totalPages)
    }
  }
  const getpagination = () => {
    let pagbt = []
    if (page != 1) {
      pagbt.push(
        <li className='page-item' key='previous' onClick={() => previous()}>
          <button
            className='btn btn-outline-primary'
            href='#'
            aria-label='Previous'
          >
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </button>
        </li>
      )
    } else {
      pagbt.push(
        <li className='page-item' key='previous'>
          <button
            className='btn btn-outline-secondary'
            href='#'
            aria-label='Previous'
            disabled
          >
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </button>
        </li>
      )
    }
    for (let index = 0; index < totalPages; index++) {
      if (page == index + 1) {
        pagbt.push(
          <li
            className='page-item'
            key={index}
            onClick={() => updatepage(index)}
          >
            <button className='btn btn-primary'>{index + 1} </button>
          </li>
        )
      } else {
        pagbt.push(
          <li
            className='page-item'
            key={index}
            onClick={() => updatepage(index)}
          >
            <button className='btn btn-outline-primary'>{index + 1} </button>
          </li>
        )
      }
    }
    if (page != totalPages) {
      pagbt.push(
        <li className='page-item' key='next' onClick={() => next()}>
          <button
            className='btn btn-outline-primary'
            href='#'
            aria-label='Next'
          >
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Next</span>
          </button>
        </li>
      )
    } else {
      pagbt.push(
        <li className='page-item' key='next' onClick={() => next()}>
          <button
            className='btn btn-outline-secondary'
            href='#'
            aria-label='Next'
            disabled
          >
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Next</span>
          </button>
        </li>
      )
    }
    return pagbt
  }
  const updatepage = async index => {
    setPage(index + 1)
  }
  const previous = () => {
    if (page != 1) {
      setPage(page - 1)
      initdata()
    }
  }
  const next = () => {
    if (page != totalPages) {
      setPage(page + 1)
      initdata()
    }
  }
  const updatestatus = event => {
    console.log(event.target.value)
    setFstatus(event.target.value)
  }

  const switchstatus = async (i, e, id, status) => {
    if (e == true && status == 0) {
      const res = await userservice.changerstatus(1, id)
      if (res != undefined) {
        initdata()
      }
    } else if (e == false && status == 1) {
      const res = await userservice.changerstatus(0, id)
      if (res != undefined) {
        initdata()
      }
    }
  }

  const createTable = () => {
 
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td>
            {data[i].firstname} {data[i].lastname}
          </td>
          <td> {data[i].email} </td>
          <td> {data[i].address} </td>
          <td> {data[i].telephone} </td>
          <td> {JSON.stringify(data[i].roles) === '["responsible"]' ? 'Responsable' : data[i].roles} </td>
          <td>
            <Switch
              onChange={e => switchstatus(i, e, data[i].id, data[i].enable)}
              checked={data[i].enable == 1 ? true : false}
            />
          </td>
          <td> {data[i].createdBy}</td>
          <td>
            <Moment format='DD-MM-YYYY hh:mm:ss'>{data[i].createdAt}</Moment>
          </td>
        </tr>
      )
    }
    return table
  }

  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h3>Utilisateurs</h3>
              <form className='form-sample'>
                <div className='container'>
                  <div className='row mt-4'>
                    <div className='col-md-6'>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Statut
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          value={fstatus}
                          onChange={e => updatestatus(e)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='1'>{'Activer '}</MenuItem>
                          <MenuItem value='0'>{'Désactiver '}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </form>

              <div className='mt-4 table-responsive'>
                <Container>
                  <Row className='justify-content-md-center'>
                    <Col></Col>
                    <Col md='auto'></Col>
                    <Col xs lg='4'>
                      <Link to='/page/adduser'>
                        <button type='button' className='btn btn-primary'>
                          Ajouter un nouveau utilisateur
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Container>

                <br />
                <div className='mt-4 table-responsive'>
                  {/* table-striped table-borderless table-hover  */}
                  <Table
                    responsive
                    className='table table-striped table-hover '
                  >
                    <thead>
                      <tr>
                        <th> Nome </th>
                        <th> E-mail </th>
                        <th> address </th>
                        <th> Numéro de téléphone </th>
                        <th> Rôle </th>
                        <th> Activer </th>
                        <th> créé par </th>
                        <th> créé à </th>
                      </tr>
                    </thead>
                    <tbody>{createTable()}</tbody>
                  </Table>
                </div>
                <br />
                <br />
                <br />
                <nav aria-label='Page navigation example'>
                  <ul className='pagination'>{getpagination()}</ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listusers
