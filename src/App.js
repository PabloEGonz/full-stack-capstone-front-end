import './App.css';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet, Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Session from './pages/Session';

const Navbar = () => (
  <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/session">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <Outlet />
    </div>
  </>
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="/session" element={<Session />} />
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
