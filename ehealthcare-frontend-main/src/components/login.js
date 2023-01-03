import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const initialFormState = {
    username: '',
    password: ''
  };

  var userDetails = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
    address: '',
    roles: [{ id: '', name: '' }]
  }

  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/login`).then(response => response.json().then(data => setUser(data)))
  }, [setUser])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUser(initialFormState);

    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((res) =>
      res.json()).then((response) => {
        userDetails = response
        if (userDetails.roles[0].name === 'ADMIN') {
          navigate('/api/admin/medicines')
        } else if (userDetails.roles[0].name === 'USER') {
          navigate('/api/user/medicines/' + userDetails.id)
        } else {
          navigate('/')
        }
      })
  }

  return (
    <div className="auth-wrapper" >
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
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
            <label>Password</label>
            <input
              type="password" name="password" value={user.password || ''}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
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

export default Login;