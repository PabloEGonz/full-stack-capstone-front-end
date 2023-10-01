import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/users/usersSlice';

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <button
        type="button"
        className="nav-link logout"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-left" />
        Log out
      </button>
    </>
  );
};

export default LogoutBtn;
