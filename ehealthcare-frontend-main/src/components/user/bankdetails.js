import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function BankDetails() {

    let { id } = useParams();
    const [bankdata, setbankdata] = useState([])
    const [state, setstate] = useState([])
    const bankURL = '/api/user/bank-account'

    useEffect(() => {
        getbankdata()
    }, [])

    const getbankdata = () => {

        fetch(bankURL + '?id=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(
                (result) => {
                    setbankdata(result)
                },
                (error) => {
                    setbankdata(null);
                }
            )
    }

    const handleChange = event => {
        setstate(event.target.value);
    };

    const handleSubmit = () => {
        if (state > 0) {
            fetch(bankURL + '?id=' + id + '&account=' + bankdata.accountNumber + '&funds=' + state, {
                method: 'PUT'
            }).then(() => { getbankdata() });
        }
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
                                <Link className="nav-link" to={'/api/user/orders/' + id}>
                                    Orders
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
                        <div className="col-10">
                            <h3>Bank Details</h3>
                            <div className="mb-3">
                                <label>Bank Account</label>
                                <p>{bankdata.accountNumber || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Funds</label>
                                <p>{bankdata.funds || ''}</p>
                            </div>
                            <div>
                                <label>Add funds</label>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Insert quantity" min="0"
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                    Add funds
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default BankDetails;