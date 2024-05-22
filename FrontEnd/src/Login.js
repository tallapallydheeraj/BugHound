import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice';
import { storeBugs } from './utils/bugsSlice';
import { showBugs } from './utils/showOne';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uname = useRef();
  const pass = useRef();
  const token = useSelector((store) => store.user.loggedinUserDetails);

  async function loginButton() {
    const userdetails = {
      username: uname.current.value,
      password: pass.current.value,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdetails),
    };

    const apiUrl = 'http://localhost:8080/authenticate';

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        alert("Bad Credentials!");
      }
      const data = await response.json();
      console.log('Login successful:', data);
      dispatch(addUser(data));
      let new_jwt = token.jwt;
      const requestOptions1 = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + new_jwt,
        },
      };

      const data1 = await fetch('http://localhost:8080/bug', requestOptions1);
      const json1 = await data1.json();
      dispatch(storeBugs(json1));
      dispatch(showBugs());
      navigate('/start');
    } catch (error) {
      console.error('There was a problem with the login operation:', error);
      //alert("Bad Credentials!");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-8 rounded-lg bg-white shadow-lg w-80 md:w-96"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Login</h2>
        <input
          ref={uname}
          type="text"
          placeholder="User Name"
          className="block w-full px-4 py-3 rounded-lg bg-gray-100 mb-4"
        />
        <input
          ref={pass}
          type="password"
          placeholder="Password"
          className="block w-full px-4 py-3 rounded-lg bg-gray-100 mb-8"
        />
        <button
          type="submit"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
          onClick={loginButton}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
