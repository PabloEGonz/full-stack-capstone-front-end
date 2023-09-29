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
}

export default CarList;
