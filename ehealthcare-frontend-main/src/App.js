import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Logout from './components/logout';
// User
import MedicinesListFunction from './components/user/medicine';
import UserDetails from './components/user/profile';
import Orders from './components/user/orders';
import Cart from './components/user/cart';
import BankDetails from './components/user/bankdetails';
// Admin
import AdminMedicinesListFunction from './components/admin/medicine';
import ReportsFunction from './components/admin/reports';
import OrdersFunction from './components/admin/order';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/api/login'}>
              Ehealthcare
            </Link>
          </div>
          <div>
            <Link className="navbar-brand" to={'/api/sign-up'}>
            Sign up
            </Link>
          </div>
        </nav>
        <Routes>
          <Route exact path = "/" element = {<Login />} />
          <Route path = "/api/login" element = {<Login />} />
          <Route path = "/api/sign-up" element = {<SignUp />} />
          <Route path = "/api/logout" element = {<Logout/>}/>

          <Route path = "/api/user/medicines/:id" element = {<MedicinesListFunction/>}/>
          <Route path = "/api/user/profile/:id" element = {<UserDetails/>}/>
          <Route path = "/api/user/cart/:id" element = {<Cart/>}/>
          <Route path = "/api/user/orders/:id" element = {<Orders/>}/>
          <Route path = "/api/user/bank/:id" element = {<BankDetails/>}/>

          <Route path = "/api/admin/medicines" element = {<AdminMedicinesListFunction/>}/>
          <Route path = "/api/admin/reports" element = {<ReportsFunction/>}/>
          <Route path = "/api/admin/orders" element = {<OrdersFunction/>}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App;