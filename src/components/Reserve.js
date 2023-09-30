import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createReserve, getReservations } from '../redux/reservations/reservationsSlice';
import { getCars } from '../redux/cars/carsSlice';
import '../css/ReservationForm.css';

const Reservation = () => {
  const cars = useSelector((state) => state.cars.cars);
  const userId = useSelector((state) => state.user.id);
  const { isLoading, error } = useSelector((store) => store.reservations);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCars());
    dispatch(getReservations(userId));
  }, [dispatch, userId]);

  const [reserve, setReserve] = useState({
    user_id: userId,
    reservation_date: '',
    due_date: '',
    service_fee: '',
    car_id: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserve((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (!reserve.car_id || !reserve.reservation_date || !reserve.due_date || !reserve.service_fee) {
      alert('Please fill in all required fields.');
      return;
    }
    const reservationDate = new Date(reserve.reservation_date);
    const dueDate = new Date(reserve.due_date);
    if (reservationDate >= dueDate) {
      alert('Reservation date must be before due date.');
      return;
    }
    await dispatch(createReserve(reserve));
    navigate('/reservations');
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
        <h2>Oops, something went wrong. Please try again!</h2>
        <p>{error}</p>
      </div>
    );
  }

  

  return (
    <div className="container mt-5">
      <h2>Create Reservation</h2>
      <form className="reservation-form">
        <div className="mb-3">
          <label htmlFor="reservationDate" className="form-label">Reservation Date</label>
          <input
            type="date"
            id="reservationDate"
            name="reservation_date"
            value={reserve.reservation_date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="due_date"
            value={reserve.due_date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceFee" className="form-label">Service Fee</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              id="serviceFee"
              name="service_fee"
              value={reserve.service_fee}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="car" className="form-label">Select a Car</label>
          <select
            id="car"
            name="car_id"
            value={reserve.car_id}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={submit} className="btn btn-primary">Create Reservation</button>
      </form>
    </div>
  );
};

export default Reservation;
