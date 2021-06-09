import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

import { useAuth } from '../../context/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const { isTrueFalse, setIsTrueFalse } = useAuth();
  const history = useHistory();

  // const { state } = history.location;
  const [form, setForm] = useState(initialState);

  // const [isTrueFalse, setisTrueFalse] = useState(isTrueFalse);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    // setIsTrueFalse(!isTrueFalse);
    setForm(initialState);
    setIsTrueFalse((previsTrueFalse) => !previsTrueFalse);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isTrueFalse) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      // console.log(error);
    }
  };

  // const googleError = () => console.log('Erro ao tentar login pelo Google. Tente Novamente!');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.h5} component="h1" variant="h5">
          {isTrueFalse ? 'Cadastro' : 'Entrar no Sistema'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isTrueFalse && (
              <>
                <Input
                  name="firstName"
                  label="Primeiro Nome"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Sobrenome"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="E-mail"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Senha"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isTrueFalse && (
              <Input
                name="confirmPassword"
                label="Repita sua senha"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isTrueFalse ? 'Cadastrar' : 'Entrar'}
          </Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Entre com sua conta do Google
              </Button>
            )}
            onSuccess={googleSuccess}
            // onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isTrueFalse
                  ? 'Já possui uma conta? Faça login'
                  : 'Não tem uma conta? Cadastre-se'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
