import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useLayoutEffect, useEffect } from 'react'
import { ProgressBar, Dropdown } from 'react-bootstrap'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import financeimg from '../../assets/dashboard/svg/finance.png'
import documentimg from '../../assets/dashboard/svg/document.png'
import kioskimg from '../../assets/dashboard/svg/kiosk.png'
import teamimg from '../../assets/dashboard/svg/team.png'
import './dashboard.css'
import * as dshboardservice from '../../services/DashboardService'
import * as kioskservice from '../../services/KioskService'
import * as accessmanager from '../../services/AccessManager'
const Dashboard = () => {
  const [fperiod, setFperiod] = useState('all')
  const [fkioskid, setFkioskid] = useState('')
  const [dataksk, setDataksk] = useState([])
  const [turnover, setTurnover] = useState(0)
  const [nbtransaction, setNbtransaction] = useState(0)
  const [nbuseractifs, setNbuseractifs] = useState(0)
  const [nballuser, setNballuser] = useState(0)
  const [nbkioskworks, setNbkioskworks] = useState(0)
  const [nballkiosk, setNballkiosk] = useState(0)
  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      accessmanager.isFinancial() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== 'all')
    ) {
      initdata()
    }
  }, [fperiod, nbtransaction, fkioskid])

  useLayoutEffect(() => {
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getinfksk()
    } else if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  const initdata = async () => {
    getturnover()
    getnbtransaction()
    if (accessmanager.isAdmin() || accessmanager.isFinancial()) {
      getnbuser()
      getnbkiosk()
    }
  }
  const getturnover = async () => {
    const res = await dshboardservice.getturnover(fperiod, fkioskid)
    console.log(JSON.stringify(res.data))
    if (res.data.code == 0) {
      setTurnover(res.data.turnover)
    } else {
      await Swal.fire({
        title: 'Impossible d"obtenir de nouvelles statistiques!',
        text: "Actualisez la page ou contactez l'équipe technique",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  const getnbtransaction = async () => {
    const res = await dshboardservice.getnbtransaction(fperiod, fkioskid)
    console.log(JSON.stringify(res.data))
    if (res.data.code == 0) {
      setNbtransaction(res.data.nbtransaction)
    } else {
      await Swal.fire({
        title: 'Impossible d"obtenir de nouvelles statistiques!',
        text: "Actualisez la page ou contactez l'équipe technique",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const getnbuser = async () => {
    const res = await dshboardservice.getnbuser()
    console.log(JSON.stringify(res.data))
    if (res.data.code == 0) {
      setNbuseractifs(res.data.enable)
      setNballuser(res.data.all + '   ')
    } else {
      await Swal.fire({
        title: 'Impossible d"obtenir de nouvelles statistiques!',
        text: "Actualisez la page ou contactez l'équipe technique",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  const getnbkiosk = async () => {
    const res = await dshboardservice.getnbkiosk()
    console.log(JSON.stringify(res.data))
    if (res.data.code == 0) {
      setNbkioskworks(res.data.works)
      setNballkiosk(res.data.all + '   ')
    } else {
      await Swal.fire({
        title: 'Impossible d"obtenir de nouvelles statistiques!',
        text: "Actualisez la page ou contactez l'équipe technique",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  const getperoid = () => {
    switch (fperiod) {
      case 'day':
        return 'Jour'
      case 'month':
        return 'Mois'
      case 'year':
        return 'Années'
      default:
        return 'Tous'
    }
  }
  const getperoidmsg = () => {
    switch (fperiod) {
      case 'day':
        return 'par jour'
      case 'month':
        return 'par mois'
      case 'year':
        return 'par année'
      default:
        return 'Tous'
    }
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
       <br />
      <br />
      <div class='d-flex flex-row-reverse'>
        <div class='p-2'>
          {' '}
          <Dropdown onSelect={e => setFperiod(e)}>
            <Dropdown.Toggle
              variant='btn btn-secondary dropdown-toggle'
              id='dropdownMenuButton1'
            >
              {getperoid()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='all'>Tous</Dropdown.Item>
              <Dropdown.Item eventKey='day'>Jour</Dropdown.Item>
              <Dropdown.Item eventKey='month'>Mois</Dropdown.Item>
              <Dropdown.Item eventKey='year'>Année</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div class='p-2'></div>
        <div class='p-2'>
          <p className='body-2 muted text-center'>Période</p>
        </div>
      </div>
      <br />
      <br />
      <div className='row'>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-3 grid-margin stretch-card average-price-card'>
              <div className='card texttheme'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between pb-2 align-items-center'>
                    <h2 className='font-weight-semibold mb-0'>{turnover}dt</h2>
                    <div /* className='icon-holder' */>
                      <img className='icontheme1' src={financeimg} alt='logo' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <h5 className='font-weight-semibold mb-0'>
                      Chiffre d'affaires
                    </h5>
                    <p className='texttheme mb-0'> {getperoidmsg()} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 grid-margin stretch-card average-price-card'>
              <div className='card texttheme'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between pb-2 align-items-center'>
                    <h2 className='font-weight-semibold mb-0'>
                      {nbtransaction}
                    </h2>
                    <div /* className='icon-holder' */>
                      <img
                        className='icontheme2'
                        src={documentimg}
                        alt='documentimg'
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <h5 className='font-weight-semibold mb-0'>
                      Nombre de transactions
                    </h5>
                    <p className='texttheme mb-0'>{getperoidmsg()}</p>
                  </div>
                </div>
              </div>
            </div>
            {(accessmanager.isAdmin() || accessmanager.isFinancial()) && (
              <div className='col-md-3 grid-margin stretch-card average-price-card'>
                <div className='card texttheme'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2 align-items-center'>
                      <h2 className='font-weight-semibold mb-0'>
                        {nbkioskworks} Actifs
                      </h2>
                      <div /* className='icon-holder' */>
                        <img
                          className='icontheme3'
                          src={kioskimg}
                          alt='kioskimg'
                        />
                      </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <h5 className='font-weight-semibold mb-0'>
                        Nombre de bornes
                      </h5>
                      <p className='texttheme mb-0'>
                        {' '}
                        {'Total '}
                        {nballkiosk}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(accessmanager.isAdmin() || accessmanager.isFinancial()) && (
              <div className='col-md-3 grid-margin stretch-card average-price-card'>
                <div className='card texttheme'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2 align-items-center'>
                      <h2 className='font-weight-semibold mb-0'>
                        {nbuseractifs} Actives
                      </h2>
                      <div /* className='icon-holder' */>
                        <img
                          className='icontheme4'
                          src={teamimg}
                          alt='teamimg'
                        />
                      </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <h5 className='font-weight-semibold mb-0'>
                        Nombre d'utilisateurs
                      </h5>
                      <p className='texttheme mb-0'>
                        {'Total '}
                        {nballuser}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
