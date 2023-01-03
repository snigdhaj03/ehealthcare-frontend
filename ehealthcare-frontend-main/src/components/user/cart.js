import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Moment from 'moment';

function Cart() {

    Moment.locale('en');
    let { id } = useParams();
    const [ordersdata, setordersdata] = useState([])
    const [quantity, setquantity] = useState([])
    const generalURL = '/api/user'

    const [total, settotal] = useState([])

    useEffect(() => {
        getorderdata()
    }, [])

    const getorderdata = () => {

        fetch(generalURL + '/pending-orders?userId=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(
                (result) => {
                    setordersdata(result)
                    getTotal(result)
                },
                (error) => {
                    setordersdata(null)
                }
            )
    }

    const getTotal = (data) => {
        var total = 0.0
        data.forEach(order => {
            total += order.total
        });

        settotal(total)
    }

    const onChange = event => {
        setquantity(event.target.value);
    };

    const updateQuantity = (data) => {
        if (quantity > 0) {
            fetch(generalURL + '/cart?cartId=' + data.id + '&quantity=' + quantity, { method: 'PUT' })
                .then(getorderdata());
        }
    }

    const deletemedicine = (id) => {
        fetch(generalURL + '/cart?cartId=' + id, { method: 'DELETE' })
            .then(
                getorderdata()
            );
    }

    const checkout = (data) => {
        var checkouttotal = 0.0
        data.forEach(order => {
            checkouttotal += order.total
        });

        fetch(generalURL + '/checkout?userId=' + data[0].owner + '&total=' + checkouttotal, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(getorderdata())
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
                                <Link className="nav-link" to={'/api/user/orders/' + id}>
                                    Orders
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
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/medicines/' + id}>
                                    Medicines
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/user/orders/' + id}>
                                    Orders
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
                    <span>User number: {id}</span><br />
                    <div className="auth-inner-all">
                        <h2> Cart </h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Medicines</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th>Add total quantity</th>
                                    <th></th>
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
                                        <td>
                                            <div>
                                                <input
                                                    type="number"
                                                    onChange={onChange}
                                                    className="form-control"
                                                    placeholder="Insert quantity" min="0"
                                                />
                                            </div>
                                            <div className="d-grid">
                                                <button onClick={() => updateQuantity(order)}>Update</button>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-primary" onClick={() => deletemedicine(order.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <label>Total = {total} </label>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary" onClick={() => checkout(ordersdata)}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;