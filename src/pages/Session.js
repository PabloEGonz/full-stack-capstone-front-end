import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Signin from '../components/Signin';

const Session = () => {
  const userPresent = useSelector((state) => state.user.id);
  const [logIn, SetLogIn] = useState('show active');
  const [signIn, SetSignIn] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userPresent) {
      navigate('/');
    }
  }, [navigate, userPresent]);
  const toggleVissibility = (on, off) => {
    off(' ');
    on('show active');
  };
  return (
    <div className="container session-form pt-5">
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${logIn}`}
            id="tab-login"
            data-mdb-toggle="pill"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="false"
            onClick={() => toggleVissibility(SetLogIn, SetSignIn)}
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${signIn}`}
            id="tab-register"
            data-mdb-toggle="pill"
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="true"
            onClick={() => toggleVissibility(SetSignIn, SetLogIn)}
          >
            Register
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className={`tab-pane fade ${logIn}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
          <Login />
        </div>
        <div className={`tab-pane fade ${signIn}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default Session;
