import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/users/usersSlice';

const Sessions = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <form action="log-in" method="post">
        <label htmlFor="user-name">
          User name
          <input type="text" name="user-name" id="user-name" />
        </label>
        <button
          type="button"
          onClick={() => dispatch(fetchUser('ezek'))}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Sessions;
