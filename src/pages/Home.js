import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const userPresent = useSelector((state) => state.user.id);
  if (!userPresent) {
    return (
      <div>
        <h1>You need to log-in or sign-in to continue</h1>
        <Link className="btn btn-primary" to="/session">Login</Link>
      </div>
    );
  }
  return (
    <h1>Home</h1>
  );
};
export default Home;
