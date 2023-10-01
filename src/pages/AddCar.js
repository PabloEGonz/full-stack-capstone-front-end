import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarForm from '../components/CarForm';

const AddCar = () => {
  const userPresent = useSelector((state) => state.user.id);
  if (!userPresent) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger" role="alert">
              You need to log-in or sign-in to continue
            </div>
            <Link className="btn" to="/session#login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>Add a Car</h2>
      <CarForm />
    </div>
  );
};
export default AddCar;
