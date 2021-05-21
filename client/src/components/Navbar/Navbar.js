import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/logo.png';
// import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

import './styles.css';

const Navbar = () => {
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

  return (
    <header className="paper-root root positionStatic colorInherit appBar-1 paper-elevation4">
      <div to="/" className="logo">
        <img className={classes.image} src={memoriesLogo} alt="icon" height="90px" />
        <a component={Link} to="/"><h1>NonFlowers</h1></a>
        {/* <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" /> */}
      </div>
      <div>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          // <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          <Link to="/auth">
            <button type="button" className="login-btn">Entrar</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
