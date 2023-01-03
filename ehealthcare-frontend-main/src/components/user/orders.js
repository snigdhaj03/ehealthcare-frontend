import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from 'moment';
import { Link } from 'react-router-dom';

function Orders() {

    Moment.locale('en');
    let { id } = useParams();
    const [ordersdata, setordersdata] = useState([])
    const generalURL = '/api/user'

    useEffect(() => {
        getorderdata()
    }, [])

    const getorderdata = () => {

        fetch(generalURL + '/orders?userId=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(
                (result) => {
                    setordersdata(result)
                },
                (error) => {
                    setordersdata(null)
                }
            )
    }


    if (!ordersdata) return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/api/login'}>
                        Ehealthcare
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/medicines/' + id}>
                                    Medicines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/cart/' + id}>
                                    Cart
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/bank/' + id}>
                                    Bank Information
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/profile/' + id}>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link className="navbar-brand" to={'/api/logout'}>
                        Log out
                    </Link>
                </div>
            </nav>
            <div className="container">
                <div className="auth-wrapper-all">
                    <div className="auth-inner-all">
                        <label>No Records Found</label>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/api/login'}>
                        Ehealthcare
                    </Link>
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/medicines/' + id}>
                                    Medicines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/cart/' + id}>
                                    Cart
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/bank/' + id}>
                                    Bank Information
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/profile/' + id}>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link className="navbar-brand" to={'/api/logout'}>
                        Log out
                    </Link>
                </div>
            </nav>
            <div className="container">
                <div className="auth-wrapper-all">
                <span>User number: {id}</span><br/>
                    <div className="auth-inner-all">
                        <h2> Orders </h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Medicines</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersdata.map(order => (
                                    <tr key={order.id}>
                                        <td> {order.id} </td>
                                        <td> {order.medname} </td>
                                        <td> {order.quantity}</td>
                                        <td> {order.status} </td>
                                        <td> {order.total} </td>
                                        <td> {Moment(order.date).format("MM-D-YYYY")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;