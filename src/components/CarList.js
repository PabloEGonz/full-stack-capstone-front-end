import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCarById, getCars } from '../redux/cars/carsSlice';
import '../css/CarDelete.css';

const CarList = () => {
  const dispatch = useDispatch();
  const { cars, isLoading, error } = useSelector((store) => store.cars);
  const user = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    // Dispatch the deleteCar action with the carId
    dispatch(deleteCarById(carId))
      .catch((error) => error);
  };
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <h2>Oopps somethings went wrong.PLease try again!</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (!user) {
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
    <div className="delete-container">
      <div className="delete-list">
        {cars.map((car) => (
          <div key={car.id} className="delete-list-item">
            <h2>{car.name}</h2>
            <img className="item-image" src={car.image} alt={car.name} style={{ maxWidth: '200px' }} />
            <p>
              Type of car:&ensp;
              {car.car_type}
            </p>
            <button className="button btn-delete" type="button" onClick={() => handleDeleteCar(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
