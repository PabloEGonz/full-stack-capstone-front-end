import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReserve } from '../redux/reservations/reservationsSlice';
import { getCars } from '../redux/cars/carsSlice';

const Reservation = () => {
  const cars = useSelector((state) => state.cars.cars);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const [reserve, setReserve] = useState({
    userName: user?.user || null,
    user_id: 2,
    reservationDate: '',
    dueDate: '',
    serviceFee: '',
    car: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserve((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const {
      reservationDate, dueDate, serviceFee, car,
    } = reserve;

    if (!reservationDate || !dueDate || !serviceFee || !car) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      // Dispatch the createReserve action to make the reservation request
      await dispatch(createReserve({ ...reserve, userName: user }));
      alert('Reservation created successfully!');
      navigate('/reservations'); // Redirect to the reservation page after successful reservation
    } catch (error) {
      alert('Error occurred while making a reservation.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      <form onSubmit={submit}>
        <div>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={reserve.reservationDate}
            onChange={handleInputChange}
            placeholder="Reservation Date"
            required
          />
        </div>
        <div>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={reserve.dueDate}
            onChange={handleInputChange}
            placeholder="Due Date"
            required
          />
        </div>
        <div>
          <input
            type="number"
            id="serviceFee"
            name="serviceFee"
            value={reserve.serviceFee}
            onChange={handleInputChange}
            placeholder="Service Fee"
            required
          />
        </div>
        <div>
          <select
            id="car"
            name="car"
            value={reserve.car}
            onChange={handleInputChange}
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
        <button type="submit">Create Reservation</button>
      </form>
    </div>
  );
};

export default Reservation;