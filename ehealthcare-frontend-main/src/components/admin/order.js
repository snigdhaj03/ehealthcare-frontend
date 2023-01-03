import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Moment from 'moment';


const OrdersFunction = () => {

    Moment.locale('en');
    const generalURL = '/api/admin';
    const [data, setdata] = useState([]);
    const [orders, setorders] = useState([]);

    // Search information
    const consultant = () => {

        if (data.userId > 0) {
            fetch(generalURL + '/user-report?userId=' + data.userId, {
                method: 'GET'
            }).then(response => response.json())
                .then(
                    (result) => {
                        setorders(result)
                    },
                    (error) => {
                        setorders([])
                    }
                );
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target
        setdata({ ...data, [name]: value })
    }

    if (!orders) return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/api/login'}>
                        Ehealthcare
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/admin/medicines'}>
                                    Medicines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/admin/reports'}>
                                    Reports
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
                    <div>
                        <label>Orders</label>
                        <div>
                            <input
                                type="number"
                                name="userId"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Insert user reference"
                            />
                        </div>
                        <button className=".btn-primary" onClick={() => consultant()}>Search</button>
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
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/admin/medicines'}>
                                    Medicines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/admin/reports'}>
                                    Reports
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
                        <div>
                            <h3>Orders</h3>
                            <div>
                                <input
                                    type="number"
                                    name="userId"
                                    onChange={handleChange}
                                    className="form-control p-2 font-lg shadow border border-blo"
                                    placeholder="Insert user reference" min={0}
                                />
                            </div><br/>
                            <button type="button" className="btn btn-primary" onClick={() => consultant()}>Search</button>
                        </div> <br/>
                        <div>
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
                                    {orders.map(order => (
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
        </div>
    )
}

export default OrdersFunction;