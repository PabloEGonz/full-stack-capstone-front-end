import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../redux/reservations/reservationsSlice';

const Reservations = () => {
  const { reservations, isLoading, error } = useSelector((store) => store.reservations);
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations(user));
  }, [dispatch, user]);

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

  if (!user) {
    return (
      <div className="error-container">
        <h2>Please log in to see your reservations</h2>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <h1 className="reserve-title">My Reservations</h1>
      {reservations.map((reservation) => (
        <div className="reservation-info" key={reservation.id}>
          <div>
            <p>
              <strong>Reservation Date:&ensp;</strong>
              {reservation.reservation_date}
            </p>
          </div>
          <div>
            <p>
              <strong>Due Date:&ensp;</strong>
              {reservation.due_date}
            </p>
            <p>
              <strong>Fee:&ensp;</strong>
              {reservation.service_fee}
            </p>
            <p>
              <strong>Car:&ensp;</strong>
              {reservation.car.name}
            </p>
            <p>
              <strong>Location:&ensp;</strong>
              {reservation.car.location}
            </p>
            <p>
              <strong>About:&ensp;</strong>
              {reservation.car.description}
            </p>
            <img src={reservation.car.image} alt={`${reservation.car.name}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservations;
