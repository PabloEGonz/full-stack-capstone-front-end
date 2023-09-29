import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const userPresent = useSelector((state) => state.user.id);
  if (!userPresent) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger" role="alert">
              You need to log-in or sign-in to continue
            </div>
            <Link className="btn btn-primary" to="/session">Login</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Welcome</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
