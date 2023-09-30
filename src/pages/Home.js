import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

const Home = () => {
  const cars = useSelector((state) => state.cars.cars);
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
    <>
      <h1>Available Cars</h1>
      { cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
      <div className="text-center">
        <Link className="btn btn-primary" to="/cars/new">Add a new car</Link>
      </div>
    </>
  );
};

export default Home;
