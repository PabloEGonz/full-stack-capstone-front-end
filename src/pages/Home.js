import React from 'react';
import '../css/Home.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

const Home = () => {
  const cars = useSelector((state) => state.cars.cars);

  return (
    <>
      <h1>Available Cars</h1>
      <div className="cars-container">
        { cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <div className="text-center">
        <Link className="btn btn-block my-3 my-lg-1" to="/cars/new">Add a new car</Link>
      </div>
    </>
  );
};

export default Home;
