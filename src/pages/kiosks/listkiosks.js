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
import { Badge } from 'reactstrap'
import './../../assets/css/table.css'
import * as kioskservice from '../../services/KioskService'
import * as userservice from '../../services/UserService'
const Listkiosks = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [fenable, setFenable] = useState('')
  const [fstatus, setFstatus] = useState('all')
  const [data, setData] = useState([])
  useEffect(() => {
    initdata()
  }, [page, fstatus, fenable])

  useLayoutEffect(() => {
    console.log('useLayoutEffect Statements')
  }, [])
  const initdata = async () => {
    const res = await kioskservice.getallkioskpagination(
      page - 1,
      size,
      fenable,
      fstatus
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.kiosks
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
    setFstatus(event.target.value)
  }
  const updateenable = event => {
    setFenable(event.target.value)
  }
  const switchstatus = async (i, e, id, status) => {
    if (e == true && status == 0) {
      const res = await kioskservice.changerpower(1, id)
      if (res != undefined) {
        initdata()
      }
    } else if (e == false && status == 1) {
      const res = await kioskservice.changerpower(0, id)
      if (res != undefined) {
        initdata()
      }
    }
  }

  const createTable = () => {
    const DATE_OPTIONS = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td>{data[i].label}</td>
          <td>
            <Badge
              color={
                data[i].status == 'works' ? 'secondary-cyan' : 'secondary-red'
              }
            >
              {data[i].status == 'works' ? 'En marche' : 'En panne'}
            </Badge>
          </td>
          <td>
            <Switch
              onChange={e => switchstatus(i, e, data[i].id, data[i].enable)}
              checked={data[i].enable == 1 ? true : false}
            />
          </td>
          <td> {data[i].address} </td>

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
              <h3>Bornes</h3>
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
                          value={fenable}
                          onChange={e => updateenable(e)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='1'>{'Activer '}</MenuItem>
                          <MenuItem value='0'>{'Désactiver '}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className='col-md-6'>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Etat
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          value={fstatus}
                          onChange={e => updatestatus(e)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='works'>{'En marche'}</MenuItem>
                          <MenuItem value='broken'>{'En panne '}</MenuItem>
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
                      <Link to='/page/addkiosk'>
                        <button type='button' className='btn btn-primary'>
                          Ajouter un nouveau borne
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Container>

                <br />
                <div className='mt-4 table-responsive'>
                  <Table responsive className='table table-striped table-hover'>
                    <thead>
                      <tr>
                        <th> Label </th>
                        <th> État </th>
                        <th> Activer </th>
                        <th> address </th>
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

export default Listkiosks
