import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
import { createReserve, getReservations } from '../redux/reservations/reservationsSlice';
import { getCars } from '../redux/cars/carsSlice';

const Reservation = () => {
  const cars = useSelector((state) => state.cars.cars);
  // const user = useSelector((state) => state.user.id);
  const userId = useSelector((state) => state.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
    dispatch(getReservations(userId));
  }, [dispatch, userId]);

  const [reserve, setReserve] = useState({
    user_id: userId,
    reservation_date: '10-11-2023',
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

  const submit = () => {
    console.log(reserve);
    dispatch(createReserve(reserve));
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      <form>
        <div>
          <input
            type="date"
            id="reservationDate"
            name="reservation_date"
            value={reserve.reservation_date}
            onChange={handleInputChange}
            placeholder="Reservation Date"
            required
          />
        </div>
        <div>
          <input
            type="date"
            id="dueDate"
            name="due_date"
            value={reserve.due_date}
            onChange={handleInputChange}
            placeholder="Due Date"
            required
          />
        </div>
        <div>
          <input
            type="number"
            id="serviceFee"
            name="service_fee"
            value={reserve.service_fee}
            onChange={handleInputChange}
            placeholder="Service Fee"
            required
          />
        </div>
        <div>
          <select
            id="car"
            name="car_id"
            value={reserve.car_id}
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
        <button type="button" onClick={submit}>Create Reservation</button>
      </form>
    </div>
  );
};

export default Reservation;
