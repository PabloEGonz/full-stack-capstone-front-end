import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/CarDetails.css';

function CarDetail() {
  const { carId } = useParams();
  const cars = useSelector((state) => state.cars.cars);

  // Find the specific car with the matching ID
  const car = cars.find((c) => c.id === Number(carId));

  // return (
  //   <div>
  //     {/* Display car details here */}
  //     <h1>{car.name}</h1>
  //     {/* Display other car details */}
  //   </div>
  // );

  return (
    <div className="car-details">
      <h1 className="car-name-details-mobile">{car.name}</h1>
      <div className="car-image-table-container">
        <div className="car-image-container">
          <img src={car.image} alt={car.name} className="car-image-details" />
        </div>
        <div className="car-details-container">
          <h1 className="car-name-details">{car.name}</h1>
          <table className="car-details-table">
            <tbody>
              <tr>
                <th>Type</th>
                <td>{car.car_type}</td>
              </tr>
              <tr>
                <th>Daily Rate</th>
                <td>{car.daily_rate}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{car.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p className="car-description">{car.description}</p>
      <div className="button-container">
        <Link to={`/reservations/new?carId=${car.id}&carName=${encodeURIComponent(car.name)}`} className="nav-link">
          <button type="button" className="reserve-button">Rent</button>
        </Link>
      </div>
    </div>
  );
}

export default CarDetail;
