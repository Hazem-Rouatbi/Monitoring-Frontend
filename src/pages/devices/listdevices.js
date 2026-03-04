import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Moment from 'react-moment'
import './../../assets/css/table.css'
import * as kioskservice from '../../services/KioskService'
import * as deviceservice from '../../services/DeviceService'
import * as accessmanager from '../../services/AccessManager'
const Listdevices = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [fkioskid, setFkioskid] = useState('')
  const [dataksk, setDataksk] = useState([])
  const [fstatus, setFstatus] = useState('all')
  const [data, setData] = useState([])
  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      accessmanager.isFinancial() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== 'all')
    ) {
      initdata()
    }
  }, [page, fstatus, fkioskid])

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk()
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  const initdata = async () => {
    const res = await deviceservice.getalldevicepagination(
      page - 1,
      size,
      fstatus,
      fkioskid
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.devices
      for (let i = 0; i < data0.length; i++) {
        if (data0[i].createdBy !== 'server') {
          const res = await deviceservice.getotheruser(data0[i].createdBy)
          var nameusr = ''
          if (res !== undefined && res !== null) {
            nameusr = res.firstname + ' ' + res.lastname
          }
          data0[i].createdBy = nameusr
        }
        const res2 = await kioskservice.getkiosk(data0[i].kioskId)
        var nameksk = ''
        if (res2 !== undefined && res2 !== null) {
          nameksk = res2.label + ' ' + res2.address
        }
        data0[i].kioskId = nameksk
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
  const updatekioskid = event => {
    setFkioskid(event.target.value)
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
          <td>{data[i].reference}</td>
          <td>
            <Badge
              color={
                data[i].status == 'works' ? 'secondary-cyan' : 'secondary-red'
              }
            >
              {data[i].status == 'works' ? 'En marche' : 'En panne'}
            </Badge>
          </td>
          <td> {data[i].name} </td>
          <td> {data[i].dtype} </td>
          <td> {data[i].kioskId} </td>

          <td> {data[i].createdBy}</td>
          <td>
            <Moment format='DD-MM-YYYY hh:mm:ss'>{data[i].createdAt}</Moment>
          </td>
        </tr>
      )
    }
    return table
  }
  const getinfksk = async () => {
    var res = await kioskservice.getallkiosksmall(1, 'all')
    if (res) {
      setDataksk(res)
    }
  }
  const getinfkskbyrsp = async () => {
    var res = await kioskservice.getinfkskbyrsp()
    console.info(res)
    if (res) {
      setFkioskid(res)
    }
  }
  return (
    <div>
      <div className='row justify-content-md-center'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h3>Périphériques</h3>
              <form className='form-sample'>
                <div className='container'>
                  <div className='row mt-4'>
                    {(accessmanager.isAdmin() ||
                      accessmanager.isFinancial()) && (
                      <div className='col-md-6'>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Borne
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Age'
                            value={fkioskid}
                            onChange={e => updatekioskid(e)}
                          >
                            <MenuItem value='all'>{'Tous '}</MenuItem>
                            {dataksk.map(option => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label} {option.address}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )}
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
              {accessmanager.isAdmin()  &&  <Container>
                  <Row className='justify-content-md-center'>
                    <Col></Col>
                    <Col md='auto'></Col>
                    <Col xs lg='4'>
                      <Link to='/page/adddevice'>
                        <button type='button' className='btn btn-primary'>
                          Ajouter un nouveau périphérique
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Container>
}
                <br />
                <div className='mt-4 table-responsive'>
                  <Table responsive className='table table-striped table-hover'>
                    <thead>
                      <tr>
                        <th> Reference </th>
                        <th> Statut </th>
                        <th> Nom </th>
                        <th> Type </th>
                        <th> Borne </th>
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

export default Listdevices
