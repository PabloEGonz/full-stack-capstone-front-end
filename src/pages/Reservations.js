import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../redux/reservations/reservationsSlice';
import '../css/Reservations.css';

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
    <div className="container">
      <h1 className="mt-5 mb-4">My Reservations</h1>
      <div className="row">
        {reservations.map((reservation) => (
          <div className="col-md-6 col-lg-4 mb-4" key={reservation.id}>
            <div className="card">
              <img src={reservation.car.image} className="card-img-top" alt={`${reservation.car.name}`} />
              <div className="card-body">
                <h5 className="card-title">{reservation.car.name}</h5>
                <p className="card-text">
                  <strong>Reservation Date:</strong>
                  {' '}
                  {reservation.reservation_date}
                </p>
                <p className="card-text">
                  <strong>Due Date:</strong>
                  {' '}
                  {reservation.due_date}
                </p>
                <p className="card-text">
                  <strong>Service Fee: $</strong>
                  {' '}
                  {reservation.service_fee}
                </p>
                <p className="card-text">
                  <strong>Location:</strong>
                  {' '}
                  {reservation.car.location}
                </p>
                <p className="card-text">
                  <strong>About:</strong>
                  {' '}
                  {reservation.car.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
