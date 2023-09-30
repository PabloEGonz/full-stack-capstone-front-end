import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Reserve from '../components/Reserve';
import store from '../redux/store';

const cars = [
  {
    id: 1,
    name: 'Car 1',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
  },
  {
    id: 2,
    name: 'Car 2',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
  },
];

const user = 1;

it('Reserve component should render correctly', () => {
  const result = render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <Reserve cars={cars} user={user} />
        </Provider>
      </Router>
    </React.StrictMode>,
  );

  expect(result).toMatchSnapshot();
});
