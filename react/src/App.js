import React from 'react';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  const [form, setForm] = useState({});
  const [users, setUsers] = useState(['hello']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/demo', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // console.log(response)
    // console.log(data); 
  };

  const handleForm = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/demo', {
      method: 'GET',
    });

    const data = await response.json();

    console.log(data);
    setUsers(data);

  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div className='App'>
        <form onSubmit={handleSubmit}>

          <label>
            <span>Username:</span>
            <input type='text' name='username' placeholder='Enter username' onChange={handleForm} />
          </label>
          <br /><br />
          <label>
            <span>Password:</span>
            <input type='password' name='password' placeholder='Enter password' onChange={handleForm} />
          </label>
          <br /><br />
          <input type='submit' value='Submit' />
        </form>
      </div>

      <div>
        <ol type='1' >
          {users.map((user,i) => <li key={i} >  {user.username} <span> => </span> {user.password}</li>)}
        </ol>
      </div>
    </>
  );
}

export default App;
