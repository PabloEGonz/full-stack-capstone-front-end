import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Reserve from '../components/Reserve';
import store from '../redux/store';

const carReservation = {
  id: 1,
  user_id: 1,
  car_id: 1,
  reservation_date: '2023-04-20',
  due_date: '2023-04-25',
};

const car = {
  id: 1,
  name: 'Car 1',
};

it('CarReservation component should render correctly', () => {
  const result = render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <Reserve carReservation={carReservation} car={car} />
        </Provider>
      </Router>
    </React.StrictMode>,
  );

  expect(result).toMatchSnapshot();
});
