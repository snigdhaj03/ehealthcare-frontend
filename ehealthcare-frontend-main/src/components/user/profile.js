import React, { useState, useEffect } from "react";
import Moment from 'moment';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Modal from 'react-modal';

function UserDetails() {

    Moment.locale('en');
    let { id } = useParams();
    const [userdata, setuserdata] = useState([])
    const detailsURL = '/api/user/data?id=' + id;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const updateData = '/api/user/update?id=' + id;

    useEffect(() => {
        getuserdata()
    }, [])

    const getuserdata = () => {
        fetch(detailsURL)
            .then(response => response.json())
            .then(
                (result) => {
                    setuserdata(result)
                },
                (error) => {
                    setuserdata(null);
                }
            )
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target
        setuserdata({ ...userdata, [name]: value })
    }

    const handleSubmit = async (event) => {
        if (userdata !== []) {
            event.preventDefault();
            await fetch(updateData, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userdata)
            }).then(response => response.json())
            .then(
                (result) => {
                    setuserdata(result)
                    closeModal()
                },
                (error) => {
                    closeModal()
                }
            );
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
                                <Link className="nav-link" to={'/api/user/bank/' + id}>
                                    Bank Information
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
                            <h3>Profile</h3>
                            <div className="mb-3">
                                <label>Reference number</label>
                                <p>{id || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Username</label>
                                <p>{userdata.username || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>First name</label>
                                <p>{userdata.firstname || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Last name</label>
                                <p>{userdata.lastname || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Email address</label>
                                <p>{userdata.email || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Date of birthday</label>
                                <p>{Moment(userdata.dob).format("MM-D-YYYY") || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Phone</label>
                                <p>{userdata.phone || ''}</p>
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <p>{userdata.address || ''}</p>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary" onClick={openModal}>
                                    Edit
                                </button>
                            </div>
                            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                                <form onSubmit={handleSubmit}>
                                    <h3>Update informartion</h3>
                                    <div className="mb-3">
                                        <label>Username</label>
                                        <input
                                            type="text" name="username" value={userdata.username || ''}
                                            className="form-control"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>First name</label>
                                        <input
                                            type="text" name="firstname" value={userdata.firstname || ''}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="First name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Last name</label>
                                        <input type="text" name="lastname" value={userdata.lastname || ''}
                                            onChange={handleChange}
                                            className="form-control" placeholder="Last name" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Email address</label>
                                        <input
                                            type="email" name="email" value={userdata.email || ''}
                                            className="form-control"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input
                                            type="text" name="password" value={userdata.password || ''}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Date of birthday</label>
                                        <input
                                            type="date" name="dob" value={Moment(userdata.dob).format("yyyy-MM-DD") || ''}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="DOB"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Phone</label>
                                        <input
                                            type="text" name="phone" value={userdata.phone || ''}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Phone"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Address</label>
                                        <input
                                            type="text" name="address" value={userdata.address || ''}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </div>
                                        <div className="flex-col">
                                            <button className="btn btn-primary" onClick={closeModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;