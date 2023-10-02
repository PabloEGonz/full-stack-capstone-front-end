import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sessions.css';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Signin from '../components/Signin';

const Session = () => {
  const { hash } = useLocation();
  const userPresent = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (userPresent) {
      navigate('/');
    }
  }, [navigate, userPresent]);
  return (
    <div className="container session-form pt-5 px-5">
      <ul className="nav nav-pills nav-justified mb-3 px-5" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={hash === '#login' ? 'nav-link active' : 'nav-link '}
            id="tab-login"
            data-mdb-toggle="pill"
            href="#login"
            role="tab"
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={hash === '#register' ? 'nav-link active' : 'nav-link '}
            id="tab-register"
            data-mdb-toggle="pill"
            href="#register"
            role="tab"
          >
            Register
          </a>
        </li>
      </ul>
      <div className="tab-content px-5">
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-session">
          {hash === '#register' ? <Signin /> : <Login /> }
        </div>
      </div>
    </div>
  );
};

export default Session;
