import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CarDetail() {
  const { carId } = useParams();
  const cars = useSelector((state) => state.cars.cars);
  //console.log(cars);
  //console.log(carId);
  // Find the specific car with the matching ID
  const car = cars.find((c) => c.id === Number(carId));
  console.log(car);
  //   useEffect(() => {
  //     // if (!car) {
  //     //   dispatch(getCarById(carId));
  //     // }
  //   }, [dispatch, car, carId]);

  return (
    <div>
      {/* Display car details here */}
      <h1>{car.name}</h1>
      {/* Display other car details */}
    </div>
  );
}

export default CarDetail;
