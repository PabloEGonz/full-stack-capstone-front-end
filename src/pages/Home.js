import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

const Home = () => {
  const cars = useSelector((state) => state.cars.cars);
  const userPresent = useSelector((state) => state.user.id);
  console.log(cars);
  if (!userPresent) {
    return (
      <div>
        <h1>You need to log-in or sign-in to continue</h1>
        <Link className="btn btn-primary" to="/session">Login</Link>
      </div>
    );
  }
  return (
    <>
      <h1>Home</h1>
      { cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </>
  );
};
export default Home;
