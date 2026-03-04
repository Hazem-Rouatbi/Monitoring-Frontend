import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Badge } from 'reactstrap'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Moment from 'react-moment'
import './../../assets/css/table.css'
import * as kioskservice from '../../services/KioskService'

import * as deviceservice from '../../services/DeviceService'
import * as panneservice from '../../services/PanneService'
import * as accessmanager from '../../services/AccessManager'
const Panne = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [fkioskid, setFkioskid] = useState('')
  const [startdate, setStartdate] = useState(null)
  const [enddate, setEnddate] = useState(null)
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
  }, [page, fstatus, fkioskid, startdate, enddate])

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk()
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  const initdata = async () => {
    const res = await panneservice.getallpannepagination(
      page - 1,
      size,
      fkioskid,
      fstatus,
      startdate,
      enddate
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.pannes
      for (let i = 0; i < data0.length; i++) {
        console.log(data0[i].createdBy)
        const res3 = await kioskservice.getkiosk(data0[i].createdBy)
        console.log(res3)
        var nameksk2 = ''
        if (res3 !== undefined && res3 !== null) {
          nameksk2 = res3.label + ' ' + res3.address
        }
        data0[i].createdBy = nameksk2
        const res4 = await deviceservice.getdevice(data0[i].deviceId)
        var namedv = ''
        if (res4 !== undefined && res4 !== null) {
         
          switch (res4.dtype) {
            case 'coinsacceptor':
              res4.dtype = 'Monnayeur'
              break
            case 'banknotesacceptor':
              res4.dtype = 'Accepteur de billets'
              break
            case 'printer':
              res4.dtype = 'Imprimante'
              break
            case 'sorter':
              res4.dtype = 'Caisse Intermédiaire'
              break
            case 'hopper':
              res4.dtype = 'Rondeur de monnaies'
              break

            default:
              break
          }
          namedv = res4.dtype + ' ' + res4.reference
        }
        data0[i].deviceId = namedv
      }
      setData([])
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
    console.log(index)
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
  const updatefstatus = event => {
    setFstatus(event.target.value)
  }

  const createTable = () => {
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td> {data[i].createdBy} </td>
          <td>
            <Moment format='DD-MM-YYYY hh:mm:ss'>{data[i].createdAt}</Moment>
          </td>
          <td> {data[i].deviceId} </td>
          <td>{data[i].code}</td>
          <td> {data[i].title} </td>
          <td> {data[i].description} </td>
          <td>
            <Badge
              color={
                data[i].status == 'done' ? 'secondary-cyan' : 'secondary-red'
              }
            >
              {data[i].status == 'done' ? 'Réparé' : 'En cours'}
            </Badge>
          </td>
          <td>
            {data[i].status != 'inprogress' && (
              <Moment format='DD-MM-YYYY hh:mm:ss'>{data[i].updatedAt}</Moment>
            )}
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
              <h3>Pannes</h3>
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
                            onChange={e => setFkioskid(e.target.value)}
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
                          statut
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          value={fstatus}
                          onChange={e => updatefstatus(e)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='inprogress'>{'En cours'}</MenuItem>
                          <MenuItem value='done'>{'Réparé'}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-md-6'>
                      <FormControl fullWidth>
                        <TextField
                          className='input'
                          id='startdate'
                          label='Date de début'
                          type='date'
                          /* sx={{ width: 220 }} */
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={startdate}
                          onChange={e => setStartdate(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className='col-md-6'>
                      <FormControl fullWidth>
                        <TextField
                          className='input'
                          id='enddate'
                          label='Date de fin'
                          type='date'
                          /* sx={{ width: 220 }} */
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={enddate}
                          onChange={e => setEnddate(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </form>

              <div className='mt-4 table-responsive'>
                <br />
                <div className='mt-4 table-responsive'>
                  <Table responsive className='table table-striped table-hover'>
                    <thead>
                      <tr>
                        <th> Borne </th>
                        <th> créé à </th>
                        <th> Périphérique </th>
                        <th> Code </th>
                        <th> Titre </th>
                        <th> Description </th>
                        <th> Statut </th>
                        <th> Corriger à </th>
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

export default Panne
