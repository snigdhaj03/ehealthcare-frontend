import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Modal from 'react-modal';

const AdminMedicinesListFunction = () => {

    Moment.locale('en');
    const generalURL = '/api/admin';
    const [medicineslist, setmedicines] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAddIsOpen, setAddIsOpen] = React.useState(false);
    const [medicinetoupdate, setmedicinetoupdate] = useState([]);
    const [medicine, setmedicine] = useState([]);
    const [reference, setreference] = useState([]);


    const MedicineComponent = (medicine) => (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit}>
            <h3>Update informartion</h3><br />
            <span>*Note: You can only update the following fields of a drug</span><br /><br />
            <div className="mb-3">
                <label>Company</label>
                <input type="text" name="company" value={medicine.company || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Company" />
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number" name="price" value={medicine.price || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Price"
                />
            </div>
            <div className="mb-3">
                <label>Quantity</label>
                <input
                    type="number" name="quantity" value={medicine.quantity || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Quantity"
                />
            </div>

            <div className="mb-3">
                <label>Discount</label>
                <input
                    type="number" name="discount" value={medicine.discount || 0}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Discount"
                />
            </div>

            <div className="flex-row">
                <div className="flex-col">
                    <button  type="submit" className="btn btn-primary">
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
    )

    // Get medicines
    useEffect(() => {
        getmedicines()
    }, [])

    const getmedicines = () => {
        fetch(generalURL + '/medicines')
            .then(response => response.json())
            .then(
                (result) => {
                    setmedicines(result)
                },
                (error) => {
                    setmedicines(null);
                }
            )
    }

    // Add medicine
    const addMedicine = async (event) => {
        event.preventDefault();

        console.log(medicine)

        medicine.expire = new Date(medicine.expire)
        if (medicine.discount === null) {
            medicine.discount = 0
        }

        if (medicine !== []) {
            fetch(generalURL + '/create', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicine)
            }).then(response => response.json())
                .then(
                    (result) => {
                        closeAddModal()
                        setmedicine([])
                        getmedicines()
                    },
                    (error) => {
                        setmedicine([])
                    }
                );
        }
    }

    const addChange = event => {
        event.preventDefault();
        const { name, value } = event.target
        setmedicine({ ...medicine, [name]: value })
    };

    const openAddMedicine = () => {
        setAddIsOpen(true);
    }

    function closeAddModal() {
        setmedicine([])
        setAddIsOpen(false);
    }

    // Delete medicine
    const deleteMedicine = (data) => {

        fetch(generalURL + '/delete?id=' + data.id, {
            method: 'DELETE'
        }).then(
            getmedicines()
        )
    }

    // Update medicine
    const updateMedicine = (data) => {
        setmedicinetoupdate(data)
        openModal()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(generalURL + '/update?id=' + medicinetoupdate.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicinetoupdate)
        }).then(response => response.json())
            .then(
                () => {
                    closeModal()
                    getmedicines()
                }
            );

    }

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target
        setmedicinetoupdate({ ...medicinetoupdate, [name]: value })
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Expired medicines
    const expireMedicines = () => {

        fetch(generalURL + '/all', {
            method: 'DELETE'
        }).then(
            () => {
                getmedicines()
            }
        )
    }

    // No demand medicines
    const nodemandmedicine = () => {

        if (reference > 0) {
            fetch(generalURL + '/demand?id=' + reference, {
                method: 'DELETE'
            }).then(
                () => {
                    getmedicines()
                }
            )
        }
    }

    const onChange = event => {
        setreference(event.target.value);
    };


    if (!medicineslist) return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/api/login'}>
                        Ehealthcare
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/api/admin/cart'}>
                                    Cart
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
                                <Link className="nav-link" to={'/api/admin/reports'}>
                                    Reports
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
                        <h2> Medicines </h2>
                        <div className="d-grid">
                            <button  type="button" className="btn btn-primary" onClick={() => openAddMedicine()}>Add medicine</button>
                        </div> <br/>
                        <Modal isOpen={modalAddIsOpen} onRequestClose={closeAddModal}>
                            <form onSubmit={addMedicine}>
                                <h3>Insert data</h3><br />
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={medicine.name}
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert medicine name" />
                                </div>
                                <div className="mb-3">
                                    <label>Company</label>
                                    <input type="text" name="company"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert company name" />
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <input
                                        type="number" name="price"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Quantity</label>
                                    <input
                                        type="number" name="quantity"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert quantity"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Uses</label>
                                    <input type="text" name="uses"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert uses description" />
                                </div>
                                <div className="mb-3">
                                    <label>Disease</label>
                                    <input type="text" name="disease"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert disease description" />
                                </div>
                                <div className="mb-3">
                                    <label>Date of expire</label>
                                    <input
                                        type="date" name="expire"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Insert a date"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Discount</label>
                                    <input
                                        type="number" name="discount"
                                        onChange={addChange}
                                        className="form-control"
                                        placeholder="Discount"
                                    />
                                </div>
                                <div className="flex-row">
                                    <div className="flex-col">
                                        <button class="btn btn-primary" type="submit" className="btn btn-primary">
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex-col">
                                        <button class="btn btn-primary" className="btn btn-primary" onClick={closeAddModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>
                        <div className="d-grid">
                            <button type="button" className="btn btn-primary" onClick={() => expireMedicines()}>Delete expired medicines</button>
                        </div> <br/>
                        <div className="d-grid">
                            <div>
                                <input
                                    type="number"
                                    onChange={onChange}
                                    className="form-control p-2 font-lg shadow border border-blo"
                                    placeholder="Insert reference to delete"
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => nodemandmedicine()}><i className="fas fa-search">Delete no demand medicines</i></button>
                        </div>
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
                                {medicineslist.map(medicine => (
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
                                        <td>
                                            <div className="d-grid">
                                                <button class=".btn-default" onClick={() => updateMedicine(medicine)}>Update</button>
                                            </div><br/>
                                            <div className="d-grid">
                                                <button class=".btn-default" onClick={() => deleteMedicine(medicine)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       <>{MedicineComponent (medicinetoupdate)}</>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMedicinesListFunction;