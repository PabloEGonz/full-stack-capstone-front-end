import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => (
  <div className="card mb-3">
    <div className="row g-0">
      <Link to={`/cars/${car.id}`}>
        <div className="col-md-4">
          <img src={car.image} className="img-fluid rounded-start" alt={car.name} />
        </div>
      </Link>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{car.name}</h5>
          <h6>
            Location:
            {car.location}
            , Daily Rate:
            {car.daily_rate}
          </h6>
          <p className="card-text">
            Type:
            {car.car_type}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    daily_rate: PropTypes.string.isRequired,
    car_type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
