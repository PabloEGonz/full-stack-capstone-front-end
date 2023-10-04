import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCars } from '../redux/cars/carsSlice';

const CarHome = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((store) => store.cars);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleCarDetail = (carId) => {
    // Set the selectedCarId to the clicked car's ID
    // Dispatch the getCarById action with the carId
    // dispatch(getCarById(carId)).catch((error) => {
    //   console.error('Error getting a car:', error);
    // });
    Navigate(`/cars/${carId}`);
  };

  // ... rest of the component

  return (
    <div>
      <h1>AVAILABLE CARS</h1>
      {cars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          {/* Other car details */}
          <button type="button" onClick={() => handleCarDetail(car.id)}>DETAIL</button>

          {/* Render CarDetail if selectedCarId matches the car's ID */}
          {/* {selectedCarId === car.id && <CarDetail car={car} />} */}
        </div>
      ))}
    </div>
  );
};

export default CarHome;
