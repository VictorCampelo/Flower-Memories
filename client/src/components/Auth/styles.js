import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: 'hsl(240deg 55% 30%)',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1.5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
    backgroundColor: '#624dcb',
    cursor: 'pointer',
    padding: '6px 5px',
    fontSize: '0.875rem',
    border: '0',
    transition: ' all 0.5s',
    borderRadius: '10px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#705cd6',

      background: 'hsl(250deg 75% 55%)',
      transition: 'all 0.5s',
      borderRadius: '10px',
      boxShadow: '0px 4px 16px #5543af',
      padding: '0.5rem 0.5rem 0.5rem 0.5rem',
      color: '#ffffff',
      fontWeight: '600',
    },
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    color: '#fff',
    backgroundColor: '#cb4d77',
    cursor: 'pointer',
    padding: '6px 5px',
    fontSize: '0.875rem',
    border: '0',
    transition: ' all 0.5s',
    borderRadius: '10px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#d65c85',

      background: 'hsl(250deg 75% 55%)',
      transition: 'all 0.5s',
      borderRadius: '10px',
      boxShadow: '0px 4px 16px #5543af',
      padding: '0.5rem 0.5rem 0.5rem 0.5rem',
      color: '#ffffff',
      fontWeight: '600',
    },
  },
  h5: {
    fontSize: '1.2rem',
    fontWight: '500',
    lineHeight: '1.15',
  },
}));
