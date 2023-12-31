import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, setSubmitted } from '../redux/cars/carsSlice';

const CarForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitted = useSelector((state) => state.cars.submitted);

  useEffect(() => {
    if (submitted) {
      navigate('/');
      dispatch(setSubmitted());
    }
  }, [submitted, navigate, dispatch]);

  const [carData, setCarData] = useState({
    name: '',
    description: '',
    image: '',
    location: '',
    daily_rate: '',
    car_type: '',
  });
  return (
    <form action="post" className="pt-md-5">
      <div className="row g-3 p-md-5 text-start">
        <div className="col-md-4">
          <label htmlFor="carName" className="form-label">Car name</label>
          <input
            type="text"
            className="form-control"
            id="carName"
            value={carData.name}
            onChange={(e) => setCarData({ ...carData, name: e.target.value })}
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="carName" className="form-label">Image</label>
          <input
            type="text"
            className="form-control"
            placeholder="URL"
            id="imageURL"
            value={carData.image}
            onChange={(e) => setCarData({ ...carData, image: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="carName" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={carData.location}
            onChange={(e) => setCarData({ ...carData, location: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="carName" className="form-label">Daily rate</label>
          <input
            type="number"
            className="form-control"
            placeholder="$"
            id="dailyRate"
            value={carData.daily_rate}
            onChange={(e) => setCarData({ ...carData, daily_rate: e.target.value })}
          />
        </div>
        <div className="col">
          <label htmlFor="carName" className="form-label">Car type</label>
          <input
            type="text"
            className="form-control"
            id="carType"
            value={carData.type}
            onChange={(e) => setCarData({ ...carData, car_type: e.target.value })}
          />
        </div>
        <div className="col-md-12">
          <textarea
            type="text-area"
            className="form-control textarea"
            placeholder="Description"
            rows="5"
            id="description"
            value={carData.description}
            onChange={(e) => setCarData({ ...carData, description: e.target.value })}
          />
        </div>
      </div>
      <div className="py-5 pt-lg-1">
        <button
          type="button"
          className="btn btn-block"
          onClick={() => dispatch(createCar(carData))}
        >
          Create Car
        </button>
      </div>
    </form>
  );
};
export default CarForm;
