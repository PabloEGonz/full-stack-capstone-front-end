import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/users/usersSlice';

const Signin = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const data = {
      name,
      user_name: userName,
    };
    dispatch(createUser(data));
  };
  return (
    <form action="log-in" method="post">
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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
        onClick={handleSubmit}
      >
        Log in
      </button>
    </form>
  );
};

export default Signin;
