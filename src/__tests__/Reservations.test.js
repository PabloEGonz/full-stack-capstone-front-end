import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Reservations from '../pages/Reservations';
import store from '../redux/store';

const reservations = [
  {
    id: 1,
    user_id: 1,
    car_id: 1,
    reservation_date: '2023-04-20',
    due_date: '2023-04-25',
    car: {
      id: 1,
      name: 'Car 1',
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
    },
  },
  {
    id: 2,
    user_id: 1,
    car_id: 2,
    reservation_date: '2023-04-20',
    due_date: '2023-04-25',
    car: {
      id: 2,
      name: 'Car 2',
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
    },
  },
];

const user = 1;

it('Reservations component should render correctly', () => {
  const result = render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <Reservations reservations={reservations} user={user} />
        </Provider>
      </Router>
    </React.StrictMode>,
  );

  expect(result.container).toMatchInlineSnapshot(`
<div>
  <div
    class="container mt-5"
  >
    <div
      class="row justify-content-center"
    >
      <div
        class="col-md-6"
      >
        <div
          class="alert alert-danger"
          role="alert"
        >
          You need to log-in or sign-in to continue
        </div>
        <a
          class="btn"
          href="/session#login"
        >
          Login
        </a>
      </div>
    </div>
  </div>
</div>
`);
});
