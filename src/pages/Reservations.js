import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReservations } from '../redux/reservations/reservationsSlice';
import '../css/Reservations.css';

const Reservations = () => {
  const { reservations, isLoading, error } = useSelector((store) => store.reservations);
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getReservations(user));
    }
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger" role="alert">
              You need to log-in or sign-in to continue
            </div>
            <Link className="btn" to="/session#login">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">My Reservations</h1>
      <div className="row">
        {reservations.map((reservation) => (
          <div className="col-md-6 col-lg-4 mb-4" key={reservation.id}>
            <div className="card h-100">
              <img src={reservation.car.image} className="card-img-top reservation-image" alt={`${reservation.car.name}`} />
              <div className="card-body d-flex flex-column">
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
                <p className="card-text flex-grow-1">
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
