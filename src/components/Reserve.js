import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReserve } from '../redux/reservations/reservationsSlice';
import { getCars } from '../redux/cars/carsSlice';

const Reservation = () => {
  cars = useSelector((state) => state.cars.cars);
  users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const [reserve, setReserve] = useState({
    userName: user?.userName || null,
    reservationDate: '',
    dueDate: '',
    serviceFee: '',
    car: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReserve((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const {
      reservationDate, dueDate, serviceFee, car,
    } = reserve;
    if (!reservationDate || !dueDate || !serviceFee || !car) {
      alert('Please fill all fields!');
      return;
    }

    try {
      await dispatch(createReserve({ ...reserve, userName: user.userName }));
      alert('Reservation created successfully!');
    } catch (error) {
      alert('Error creating reservation!');
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
