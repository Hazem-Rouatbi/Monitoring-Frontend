// -- React and related libs
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router'


// -- Third Party Libs
import PropTypes from 'prop-types'

// -- Custom Components
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import Breadcrumbs from '../Breadbrumbs/Breadcrumbs'
import Dashboard from '../../pages/dashboard/Dashboard'
import Listusers from '../../pages/users/listusers'
import Adduser from '../../pages/users/adduser'
import Addkiosk from '../../pages/kiosks/addkiosk'
import Listkiosks from '../../pages/kiosks/listkiosks'
import Listdevices from '../../pages/devices/listdevices'
import Listtransaction from '../../pages/transaction/listtransaction'
import Listturnover from '../../pages/turnover/listturnover'
import Adddevice from '../../pages/devices/adddevice'
import Notification from '../../pages/alert/notification'
import Panne from '../../pages/alert/panne'
import Payout from '../../pages/cashbox/payout'
import Feeding from '../../pages/cashbox/feeding'
import Close from '../../pages/cashbox/close'
import Profileuser from '../../pages/profile/profileuser'
import Editprofile from '../../pages/profile/editprofile'
// -- Component Styles
import s from './Layout.module.scss'

const Layout = props => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
       
          <Header />
          <Sidebar />
          <main className={s.content}>
            {/*  <Breadcrumbs url={props.location.pathname} /> */}
            <br />
            <br />
            <Switch>
              <Route
                path='/page'
                exact
                render={() => <Redirect to='template/dashboard' />}
              />
              <Route path='/page/dashboard' exact component={Dashboard} />
              <Route path='/page/users' exact component={Listusers} />
              <Route path='/page/adduser' exact component={Adduser} />
              <Route path='/page/addkiosk' exact component={Addkiosk} />
              <Route path='/page/kiosks' exact component={Listkiosks} />
              <Route path='/page/devices' exact component={Listdevices} />
              <Route
                path='/page/transactions'
                exact
                component={Listtransaction}
              />
              <Route path='/page/turnovers' exact component={Listturnover} />
              <Route path='/page/adddevice' exact component={Adddevice} />
              <Route
                path='/page/alerte/notifications'
                exact
                component={Notification}
              />
              <Route path='/page/alerte/pannes' exact component={Panne} />
              <Route path='/page/cashbox/payout' exact component={Payout} />
              <Route path='/page/cashbox/feeding' exact component={Feeding} />
              <Route path='/page/cashbox/close' exact component={Close} />
              <Route path='/page/profile/user' exact component={Profileuser} />
              <Route path='/page/profile/edit' exact component={Editprofile} />
              <Route path='*' exact render={() => <Redirect to='/error' />} />
            </Switch>
          </main>
          <Footer />
      
      </div>
    </div>
  )
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened
  }
}

export default withRouter(connect(mapStateToProps)(Layout))
