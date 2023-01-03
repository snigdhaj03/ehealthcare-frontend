import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const initialFormState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
    address: '',
    accountNum: '',
    funds: ''
  };

  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/register`).then(response => response.json().then(data => setUser(data)))
  }, [setUser])

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) =>
      res.json()).then((response) => {
        console.log(response)
        navigate('/user/medicines/' + response)
      });
  }

  return (
    <div className="auth-wrapper-all" >
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text" name="username" value={user.username || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text" name="firstname" value={user.firstname || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input type="text" name="lastname" value={user.lastname || ''}
              onChange={handleChange}
              className="form-control" placeholder="Last name" />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email" name="email" value={user.email || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password" name="password" value={user.password || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
            <label>Date of birthday</label>
            <input
              type="date" name="dob" value={user.dob || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="DOB"
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text" name="phone" value={user.phone || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Phone"
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text" name="address" value={user.address || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <label>Account number</label>
            <input
              type="text" name="accountNum" value={user.accountNum || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Account number"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default SignUp;