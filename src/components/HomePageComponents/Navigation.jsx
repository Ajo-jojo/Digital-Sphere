import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SignOutUser } from '../../redux/actionCreators/authActionCreator';

const NavigationComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style={{ padding: '25px' }}>
      <Link className="navbar-brand mx-4" to="/">
        DIGITAL SPHERE
      </Link>

      <ul className="navbar-nav ms-auto me-5">
        {isAuthenticated ? (
          <>
            <li className="nav-item mx-2">
              <p className="my-0 mt-1 mx-2">
                <span className="text-light">Welcome, </span>
                <span className="text-warning">{user.displayName}</span>
              </p>
            </li>

            <li className="nav-item mx-2">
              <Link className="btn btn-primary btn-sm " to="/dashboard">
                Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="btn btn-primary btn-sm " to="/fileconversion">
                File Conversion
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-success btn-sm"
                onClick={() => {
                  //   console.log("working")
                  dispatch(SignOutUser());
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <Link className="btn btn-primary btn-sm " to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-success btn-sm" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationComponent;
