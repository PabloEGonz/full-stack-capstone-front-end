import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarHome from '../components/CarHome';

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
    <CarHome />
  );
};
export default Home;
