import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Table from 'react-bootstrap/Table'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from 'react-bootstrap/Button'
import eye from '../../assets/image/eye.svg'
import * as kioskservice from '../../services/KioskService'
import * as cahboxservice from '../../services/CahboxService'
import * as accessmanager from '../../services/AccessManager'
import './../../assets/css/table.css'
import Payoutdetails from './payoutdetails'
const Payout = () => {
  const [active, setActive] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [fkioskid, setFkioskid] = useState('')
  // const [ftype, setFtype] = useState('')
  const [dataksk, setDataksk] = useState([])
  const [data, setData] = useState([])
  const [datapayout, setDatapayout] = useState([])
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      accessmanager.isFinancial() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== 'all')
    ) {
      console.log('initdata')
      initdata()
    }
  }, [page, fkioskid])

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk()
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  const getpayout = async cashboxid => {
    const res = await cahboxservice.getpayoutchennels(cashboxid,fkioskid)
    if (res !== undefined && res !== null) {
      console.log(res.data.data.rows)
      setDatapayout(res.data.data.rows)
    }
  }
  const initdata = async () => {
    const res = await cahboxservice.getcashbox(page - 1, size, fkioskid)
    if (res !== undefined && res !== null) {
      var data0 = []
      data0 = res.data.data.cashboxs
      for (let i = 0; i < data0.length; i++) {
        const res3 = await kioskservice.getkiosk(data0[i].kioskId)
        var nameksk2 = ''
        if (res3 !== undefined && res3 !== null) {
          nameksk2 = res3.label + ' ' + res3.address
        }
        console.log(data[i]);
        
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

  const createTable = () => {
    let table = []
    for (let i = 0; i < data.length; i++) {
      table.push(
        <tr key={i} id={data[i].id}>
          <td> {data[i].kioskId} </td>
          <td>{data[i].stockh}</td>
          <td>{data[i].stockn}</td>
          <td>{data[i].stockm}</td>
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
              <h3>État du caisse</h3>
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
                          
                        </InputLabel>
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
                        <th> Stock Monnaie </th>
                        <th> Stock Billets </th>
                        <th> Total </th>
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
      <Payoutdetails
        datapayout={datapayout}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Payout
