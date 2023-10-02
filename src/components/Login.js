import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/users/usersSlice';

const Login = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  return (
    <form action="log-in" method="post">
      <div className="form-outline mb-4">
        <input
          className="form-control"
          type="text"
          name="loginUserName"
          id="loginUserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label
          htmlFor="loginUserName"
          className="form-label"
        >
          User name
        </label>
      </div>
      <div className="row mb-4" />
      <button
        type="button"
        className="btn btn-block mb-4"
        onClick={() => dispatch(fetchUser(userName))}
      >
        Log in
      </button>
      <div className="text-center">
        <p>
          Not a member?
          <a href="#register">Register</a>
        </p>
      </div>
    </form>
  );
};

export default Login;
