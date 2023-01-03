import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Moment from 'moment';


const ReportsFunction = () => {

    Moment.locale('en');
    const generalURL = '/api/admin';
    const [data, setdata] = useState({
        type: 0,
        range: 0
    });
    const [report, setreport] = useState([]);

    useEffect(() => {
        page()
    }, [])

    const reportoptions = [
        { value: 0, label: 'Stock' },
        { value: 1, label: 'Sales' },
        { value: 2, label: 'Medicine' }
    ]

    const rangeoptions = [
        { value: 0, label: 'Weekly' },
        { value: 1, label: 'Monthly' },
        { value: 2, label: 'Yearly' }
    ]

    // Search information
    const consultant = () => {

        data.date = Moment(new Date(data.date)).format("yyyy-MM-DDTHH:mm:ssaz")

        fetch(generalURL + '/report?type=' + data.type + '&range=' + data.range + '&date=' + data.date, {
            method: 'GET'
        }).then(response => response.json())
            .then(
                (result) => {
                    setreport(result)
                    page()
                },
                (error) => {
                    setreport([])
                }
            );
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target
        setdata({ ...data, [name]: value })
        setreport([])
    }

    function page() {

        if (data.type === 2) return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>Medicine</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Uses</th>
                            <th>Disease</th>
                            <th>Discount</th>
                            <th>Expire date</th>
                            <th>Quantity</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {report.map(medicine => (
                            <tr key={medicine.id}>
                                <td >{medicine.id}</td>
                                <td> {medicine.name} </td>
                                <td> {medicine.company} </td>
                                <td> {medicine.price} </td>
                                <td> {medicine.uses} </td>
                                <td> {medicine.disease} </td>
                                <td> {medicine.discount} </td>
                                <td> {Moment(medicine.expire).format("MM-D-YYYY")} </td>
                                <td> {medicine.quantity} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

        else if (data.type === 1) return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>User</th>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map(cart => (
                            <tr key={cart.id}>
                                <td >{cart.id}</td>
                                <td> {cart.owner} </td>
                                <td> {cart.medname} </td>
                                <td> {cart.quantity} </td>
                                <td> {cart.status} </td>
                                <td> {cart.total} </td>
                                <td> {Moment(cart.date).format("MM-D-YYYY")} </td>
                                <td> {cart.price} </td>
                                <td> {cart.discount} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )

        else if (data.type === 0) return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Medicine</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map(stock => (
                                <tr key={stock.reference}>
                                    <td >{stock.reference}</td>
                                    <td> {stock.name} </td>
                                    <td> {stock.quantity} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        )
        return (
            <label>No Records Found</label>
        )

    }

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
                                <Link className="nav-link" to={'/api/admin/orders'}>
                                    Orders
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
                        <h2> Reports </h2>
                        <div><br/>
                            <div className="d-grid">
                                <label>Type of report</label>
                                <select name="type" value={data.type} onChange={handleChange}>
                                    {reportoptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div><br/>
                            <div className="d-grid">
                                <label>Range of dates</label>
                                <select name="range" value={data.range} onChange={handleChange}>
                                    {rangeoptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div><br/>
                            <div className="d-grid">
                                <label>Insert the start date of the search</label>
                                <input
                                    type="date" name="date"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="date"
                                /><br/>
                                <button type="button" className="btn btn-primary" onClick={() => consultant()}>Search</button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default ReportsFunction;