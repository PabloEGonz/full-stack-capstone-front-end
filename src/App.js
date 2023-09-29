import './App.css';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Session from './pages/Session';
import AddCar from './pages/AddCar';
import Navbar from './components/Navbar';
import { fetchUser } from './redux/users/usersSlice';
import Reservations from './pages/Reservations';
import Reserve from './components/Reserve';
import { getCars } from './redux/cars/carsSlice';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
    const username = JSON.parse(localStorage.getItem('user_name'));
    if (username) {
      dispatch(fetchUser(username));
    }
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="container pt-5 mt-5 mt-lg-3">
        <Outlet />
      </div>
    </>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/session" element={<Session />} />
      <Route path="/cars/new" element={<AddCar />} />
      <Route path="/reservations/new" element={<Reserve />} />
      <Route path="/reservations" element={<Reservations />} />
    </Route>,
  ),
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
