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
import TextField from '@mui/material/TextField'
import Moment from 'react-moment'
import './../../assets/css/table.css'
import * as kioskservice from '../../services/KioskService'
import * as transactionservice from '../../services/TransactionService'

import * as accessmanager from '../../services/AccessManager'
const Listtransaction = () => {
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
    const res = await transactionservice.getalltransactionpagination(
      page - 1,
      size,
      fkioskid,
      fstatus,
      startdate,
      enddate
    )
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.transactions
      for (let i = 0; i < data0.length; i++) {
        const res3 = await kioskservice.getkiosk(data0[i].kioskId)
        var nameksk2 = ''
        if (res3 !== undefined && res3 !== null) {
          nameksk2 = res3.label + ' ' + res3.address
        }
        data0[i].kioskId = nameksk2
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
  const updatefstatus = event => {
    setFstatus(event.target.value)
  }
  const updatekioskid = event => {
    setFkioskid(event.target.value)
  }

  const createTable = () => {
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td> {data[i].kioskId}</td>
          <td>{data[i].codeclient}</td>
          <td> {data[i].codetransactiontopnet} </td>
          <td> {data[i].amount} </td>
          <td>
            <Badge
              color={
                data[i].status == 'success'
                  ? 'secondary-cyan'
                  : data[i].status == 'failed'
                  ? 'secondary-orange-dark'
                  : data[i].status == 'inprogress'
                  ? 'primary-hover'
                  : 'secondary-red'
              }
            >
              {data[i].status == 'success'
                ? 'Succès'
                : data[i].status == 'echec'
                ? 'Échec'
                : data[i].status == 'inprogress'
                ? 'En cours'
                : 'Invalide'}
            </Badge>
          </td>
          <td> {data[i].comment} </td>
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
              <h3>Transactions</h3>
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
                       Statut   
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          value={fstatus}
                          onChange={e => updatefstatus(e)}
                        >
                          <MenuItem value='all'>{'Tous '}</MenuItem>
                          <MenuItem value='success'>{'Succès'}</MenuItem>
                          <MenuItem value='echec'>{'Échec'}</MenuItem>
                          <MenuItem value='failed'>{'Invalide'}</MenuItem>
                          <MenuItem value='inprogress'>{'En cours'}</MenuItem>
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
                        <th> Code client </th>
                        <th> Code transaction </th>
                        <th> Montant </th>
                        <th> Statut </th>
                        <th> Message d'API </th>
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

export default Listtransaction
