import './App.css';
import Home from './pages/Home';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />} />
  ));

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
