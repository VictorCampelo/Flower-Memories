import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/logo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import { useAuth } from '../../context/auth';

import './styles.css';

const Navbar = () => {
  const { setIsTrueFalse } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const [classOn, setClassOn] = useState(false);

  return (

    <header>
      <div className="containerHeader">
        <Link to="/">
          <div className="logo">
            <img className="image" src={memoriesLogo} alt="icon" />
            <a component={Link} to="/"><h1>NonFlowers</h1></a>
            {/* <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" /> */}
          </div>
        </Link>

        <div className={classOn ? 'menu-section on' : 'menu-section'} onClick={() => setClassOn(!classOn)}>
          <div className="menu-toggle">
            <div className="one" />
            <div className="two" />
            <div className="three" />
          </div>

          {user?.result ? (
            <nav>
              <ul>
                <li>
                  <Avatar
                    className={classes.purple}
                    alt={user?.result.name}
                    src={user?.result.imageUrl}
                  >
                    {user?.result.name.charAt(0)}
                  </Avatar>
                </li>
                <li>
                  <Typography className={classes.userName} variant="h6">
                    {user?.result.name}
                  </Typography>
                </li>
                <li>
                  <Button
                    variant="contained"
                    className={classes.logout}
                    color="secondary"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </li>
              </ul>
            </nav>
          ) : (
            <nav>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: '/auth',
                    }}
                    onClick={() => { setIsTrueFalse(true); }}
                  >
                    Cadastre-se
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: '/auth',
                    }}
                    onClick={() => { setIsTrueFalse(false); }}
                  >
                    <button type="button" className="login-btn">
                      Entrar
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

    </header>
  );
};

export default Navbar;
