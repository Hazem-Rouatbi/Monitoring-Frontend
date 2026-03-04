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
import * as notificationservice from '../../services/NotificationsService'
import * as accessmanager from '../../services/AccessManager'
const Notification = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [fkioskid, setFkioskid] = useState('')
  const [startdate, setStartdate] = useState(null)
  const [enddate, setEnddate] = useState(null)
  const [dataksk, setDataksk] = useState([])
  const [ftype, setFtype] = useState('all')
  const [data, setData] = useState([])

  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      accessmanager.isFinancial() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== 'all')
    ) {
      initdata()
    }
  }, [page, ftype, fkioskid, startdate, enddate])

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk()
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  const initdata = async () => {
    const res = await notificationservice.getallnotificationpagination(
      page - 1,
      size,
      fkioskid,
      ftype,
      startdate,
      enddate
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.notifications
      for (let i = 0; i < data0.length; i++) {
        const res3 = await kioskservice.getkiosk(data0[i].createdBy)
        var nameksk2 = ''
        if (res3 !== undefined && res3 !== null) {
          nameksk2 = res3.label + ' ' + res3.address
        }
        data0[i].createdBy = nameksk2
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

  const createTable = () => {
    /*     "id": "3b0ae59f-7255-4e2d-b357-72c32b5b6484",
                "": "critical",
                "createdAt": "2022-07-01T10:09:52.013Z",
                "createdBy": "c055d8a3-11d7-4075-a0f0-80b867e4b8aa",
                "updatedAt": "2022-07-01T10:09:52.013Z",
                "updatedBy": null,
                "kioskId": "c055d8a3-11d7-4075-a0f0-80b867e4b8aa"
 */
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td> {data[i].createdBy}</td>
          <td>{data[i].title}</td>
          <td> {data[i].description} </td>
          <td> {data[i].details} </td>
          <td>
            <Badge
              color={
                data[i].ntype == 'critical'
                  ? 'safety-orange'
                  : data[i].ntype == 'major'
                  ? 'dark-orange'
                  : data[i].ntype == 'info'
                  ? 'secondary-cyan'
                  : 'golden-poppy'
              }
            >
              {data[i].ntype == 'critical'
                ? 'Critique'
                : data[i].ntype == 'major'
                ? 'Majeur'
                : data[i].ntype == 'info'
                ? 'Information'
                : 'Mineur'}
            </Badge>
          </td>

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
              <h3>Notifications</h3>
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
                          Type
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          value={ftype}
                          onChange={e => setFtype(e.target.value)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='critical'>{'Critique'}</MenuItem>
                          <MenuItem value='major'>{'Majeur'}</MenuItem>
                          <MenuItem value='minor'>{'Mineur'}</MenuItem>
                          <MenuItem value='info'>{'Information'}</MenuItem>
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
                        <th> Title </th>
                        <th> Description </th>
                        <th> Détails </th>
                        <th> Type </th>
                        <th> Date </th>
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

export default Notification
