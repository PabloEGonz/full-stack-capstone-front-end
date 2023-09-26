import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/users/usersSlice';

const Login = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  return (
    <form action="log-in" method="post">
      <label htmlFor="user-name">
        User name
        <input
          type="text"
          name="user-name"
          id="user-name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => dispatch(fetchUser(userName))}
      >
        Log in
      </button>
    </form>
  );
};

export default Login;
