// CarList.js
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCarById, getCars } from '../redux/cars/carsSlice'; // Import your Redux action for deleting a car

function CarList() {
  const dispatch = useDispatch();
  const { cars, isLoading, error } = useSelector((store) => store.cars);
  const user = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    // Dispatch the deleteCar action with the carId
    dispatch(deleteCarById(carId))
      .catch((error) => {
        console.error('Error deleting car:', error);
      });
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
      <div className="error-container">
        <h2>Please login to see cars</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>
        Car List
      </h1>
      {cars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>
            Location:
            {car.location}
          </p>
          <p>
            Car Type:
            {car.car_type}
          </p>
          <p>
            Description:
            {car.description}
          </p>
          <p>
            Daily Rate: $
            {car.daily_rate}
          </p>
          <img src={car.image} alt={car.name} style={{ maxWidth: '200px' }} />
          <button type="button" onClick={() => handleDeleteCar(car.id)}>Delete Car</button>
        </div>
      ))}
    </div>
  );
}

export default CarList;
