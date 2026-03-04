import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import s from './Sidebar.module.scss'
import LinksGroup from './LinksGroup/LinksGroup.js'
import { changeActiveSidebarItem } from '../../actions/navigation.js'
import SofiaLogo from '../Icons/SofiaLogo.js'
import cn from 'classnames'
import * as accessmanager from '../../services/AccessManager'
import loginImage from '../../assets/image/logopaypos.png'

const Sidebar = props => {
  const { activeItem = '', ...restProps } = props

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0)
    }
  }, [props.sidebarOpened])

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}>
      <header className={s.logo}>
        <img src={loginImage} alt='logopaypos' />
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header='Dashboard'
          isHeader
          iconName={<i className={'eva eva-home-outline'} />}
          link='/page/dashboard'
          index='dashboard'
        />
        <LinksGroup
          onActiveSidebarItemChange={activeItem =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header='Transaction'
          isHeader
          iconName={<i className={'eva eva-swap-outline'} />}
          link='/page/transactions'
          index='transaction'
        />
        {(accessmanager.isAdmin() || accessmanager.isFinancial()) && (
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={props.activeItem}
            header="Chiffre d'affaires"
            isHeader
            iconName={<i className={'eva eva-activity-outline'} />}
            link='/page/turnovers'
            index='turnover'
          />
        )}
        {(accessmanager.isAdmin() || accessmanager.isResponsible()) && (
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={props.activeItem}
            header='Configurations'
            isHeader
            iconName={<i className={'eva eva-bell-outline'} />}
            link='/page/avertissement'
            index='avertissement'
            childrenLinks={[
              {
                header: 'Pannes',
                link: '/page/alerte/pannes'
              },
              {
                header: 'Notifications',
                link: '/page/alerte/notifications'
              }
            ]}
          />
        )}
        <LinksGroup
          onActiveSidebarItemChange={activeItem =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header='Caisse'
          isHeader
          iconName={<i className={'eva eva-archive-outline'} />}
          link='/page/caisse'
          index='caisse'
          childrenLinks={[
            {
              header: 'État du caisse',
              link: '/page/cashbox/payout'
            },
            {
              header: 'Alimentation',
              link: '/page/cashbox/feeding'
            },
            {
              header: 'Arrêt',
              link: '/page/cashbox/close'
            }
          ]}
        />
        {accessmanager.isAdmin() && (
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={props.activeItem}
            header='Bornes'
            isHeader
            iconName={<i className={'eva eva-monitor-outline'} />}
            link='/page/kiosks'
            index='bornes'
          />
        )}
        {(accessmanager.isAdmin() || accessmanager.isResponsible()) && (
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={props.activeItem}
            header='Périphériques'
            isHeader
            iconName={<i className={'eva eva-settings-outline'} />}
            link='/page/devices'
            index='périphériques'
          />
        )}
        {accessmanager.isAdmin() && (
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={props.activeItem}
            header='Utilisateurs'
            isHeader
            iconName={<i className={'eva eva-people-outline'} />}
            link='/page/users'
            index='utilisateurs'
          />
        )}
      </ul>
      <div className='bg-widget d-flex mt-auto ml-1'></div>
    </nav>
  )
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

function mapStateToProps (store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar))
