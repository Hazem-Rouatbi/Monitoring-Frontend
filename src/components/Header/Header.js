import React, { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup
} from 'reactstrap'

import { logoutUser } from '../../actions/auth'
import { closeSidebar, openSidebar } from '../../actions/navigation'
import MenuIcon from '../Icons/HeaderIcons/MenuIcon'
import Badge from '@mui/material/Badge'
import LightbulbIcon from '@mui/icons-material/RadioButtonUnchecked'
import SearchIcon from '../Icons/HeaderIcons/SearchIcon'

import ProfileIcon from '../../assets/navbarMenus/pfofileIcons/ProfileIcon'

import logoutIcon from '../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg'
import editprofile from '../../assets/navbarMenus/pfofileIcons/editprofile.svg'
import basketIcon from '../../assets/navbarMenus/basketIcon.svg'
import calendarIcon from '../../assets/navbarMenus/calendarIcon.svg'
import envelopeIcon from '../../assets/navbarMenus/envelopeIcon.svg'
import * as loginservice from '../../services/LoginService'
import mariaImage from '../../assets/navbarMenus/mariaImage.jpg'
import teamImg from '../../assets/image/team.png'
import * as localstorage from '../../services/LocalStorage'
import s from './Header.module.scss'
import * as notificationservice from '../../services/NotificationsService'
import * as panneservice from '../../services/PanneService'
import * as kioskservice from '../../services/KioskService'
import * as accessmanager from '../../services/AccessManager'
import 'animate.css'

const Header = props => {
  const [menuOpennotification, setMenuOpennotification] = useState(false)
  const [menuOpenpanne, setMenuOpenpanne] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [fkioskid, setFkioskid] = useState('all')
  const [countnt, setCountnt] = useState(0)
  const [datant, setDatant] = useState([])
  const [countpn, setCountpn] = useState(0)
  const [datapn, setDatapn] = useState([])
  useLayoutEffect(() => {
    if (accessmanager.isResponsible()) {
      getinfkskbyrsp()
    }
  }, [])
  useEffect(() => {
    if (
      accessmanager.isAdmin() ||
      (accessmanager.isResponsible() && fkioskid && fkioskid !== 'all')
    ) {
      getinfonotifications()
      getinfopannes()
    }
  }, [fkioskid])
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }

  const toggleMenunotification = () => {
    setMenuOpennotification(!menuOpennotification)
  }
  const toggleMenupanne = () => {
    setMenuOpenpanne(!menuOpenpanne)
  }
  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar())
    } else {
      const paths = props.location.pathname.split('/')
      paths.pop()
      props.dispatch(openSidebar())
    }
  }

  const doLogout = async () => {
    const log = await loginservice.logoutt()
    props.dispatch(logoutUser())
    window.location.href = '#/login'
  }

  const getusrname = () => {
    if (
      localstorage.loadName() !== undefined &&
      localstorage.loadName() !== null
    ) {
      return localstorage.loadName()
    } else {
      return '----------'
    }
  }
  const getinfonotifications = async () => {
    const res = await notificationservice.getinfonotifications(fkioskid)
    if (res !== undefined && res !== null) {
      if (res.data.code === 0) {
        setCountnt(res.data.data.count)
        setDatant(res.data.data.rows)
      }
    }
  }
  const getinfopannes = async () => {
    console.log(
      '*****************************************************************************'
    )
    const res = await panneservice.getinfopannes(fkioskid)
    console.log(
      '*****************************************************************************'
    )
    if (res !== undefined && res !== null) {
      if (res.data.code === 0) {
        setCountpn(res.data.data.count)
        setDatapn(res.data.data.rows)
      }
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
    <Navbar className={`${s.root} d-print-none`}>
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3 ${s.navItem}`}
          href='#'
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
      <Nav className='ml-auto'>
        <NavItem className='d-sm-none mr-4'>
          <NavLink className='' href='#'>
            <SearchIcon />
          </NavLink>
        </NavItem>
        {(accessmanager.isAdmin() || accessmanager.isResponsible()) && (
          <Dropdown
            nav
            isOpen={menuOpenpanne}
            toggle={() => toggleMenupanne()}
            className='tutorial-dropdown mr-2 mr-sm-3'
          >
            <Badge
              badgeContent={countpn}
              color={countpn === 0 ? 'info' : 'error'}
              showZero
            >
              <DropdownToggle nav>
                <div className={s.navbarBlock}>
                  <i className={'eva eva-flash-outline'} />
                </div>
              </DropdownToggle>
            </Badge>
            <DropdownMenu
              right
              className='navbar-dropdown notifications-dropdown'
              style={{ width: '340px' }}
            >
              {countpn < 1 && (
                <DropdownItem>
                  <div>
                    <p className='body-2 muted text-center'>Aucune panne</p>
                  </div>
                </DropdownItem>
              )}
              {datapn.map(option => (
                <DropdownItem key={option.id}>
                  <span>
                    {option.title}:{option.description}
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
        {(accessmanager.isAdmin() || accessmanager.isResponsible()) && (
          <Dropdown
            nav
            isOpen={menuOpennotification}
            toggle={() => toggleMenunotification()}
            className='tutorial-dropdown mr-2 mr-sm-3'
          >
            <Badge
              badgeContent={countnt}
              color={countnt === 0 ? 'info' : 'error'}
              showZero
            >
              <DropdownToggle nav>
                <div className={s.navbarBlock}>
                  <i className={'eva eva-bell-outline'} />
                </div>
              </DropdownToggle>
            </Badge>
            <DropdownMenu
              right
              className='navbar-dropdown notifications-dropdown'
              style={{ width: '340px' }}
            >
              {countnt < 1 && (
                <DropdownItem>
                  <div>
                    <p className='body-2 muted text-center'>
                      Aucune notification
                    </p>
                  </div>
                </DropdownItem>
              )}

              {datant.map(option => (
                <DropdownItem key={option.id}>
                  <LightbulbIcon
                    color={option.ntype === 'info' ? 'secondary' : 'warning'}
                  />
                  <span>
                    {option.title}:{option.description}
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}

        <Dropdown
          isOpen={notificationsOpen}
          toggle={() => toggleNotifications()}
          nav
          id='basic-nav-dropdown'
          className='ml-3'
        >
          <DropdownToggle nav caret className='navbar-dropdown-toggle'>
            <span className={`${s.avatar} rounded-circle float-left mr-2`}>
              <img src={teamImg} alt='logopaypos' />
            </span>
            <span className='small d-none d-sm-block ml-1 mr-2 body-1'>
              {getusrname()}
            </span>
          </DropdownToggle>
          <DropdownMenu
            className='navbar-dropdown profile-dropdown'
            style={{ width: '230px' }}
          >
            <a href='#/page/profile/user'>
              <DropdownItem className={s.dropdownProfileItem}>
                <ProfileIcon />
                <span>Profil</span>
              </DropdownItem>
            </a>
            <a href='#/page/profile/edit'>
              <DropdownItem className={s.dropdownProfileItem}>
                <img
                  src={editprofile}
                  alt='Basket Icon'
                  style={{ height: 60, width: 25 }}
                />
                <span>Modifier le profil</span>
              </DropdownItem>
            </a>
            <NavItem>
              <NavLink onClick={() => doLogout()} href='#'>
                <button
                  className='btn btn-primary rounded-pill mx-auto logout-btn'
                  type='submit'
                >
                  <img src={logoutIcon} alt='Logout' />
                  <span className='ml-1'>Déconnexion</span>
                </button>
              </NavLink>
            </NavItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool
}

function mapStateToProps (store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic
  }
}

export default withRouter(connect(mapStateToProps)(Header))
