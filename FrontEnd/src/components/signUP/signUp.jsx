import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../../constants';

//QUERY TO SEND DATA TO OUR GRAPH API, ADD USER, AND RETURN TOKEN FOR FURTHER AUTH ACTIONS
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
    $userName: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      userName: $userName
    ) {
      token
    }
  }
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://stagewood.com/"
      >
        StageWood Consortium, Inc.
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  let history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      history.push('/');
    }
  });

  //SETUP THE STATES NEEDED TO CAPTURE USER INFO
  const classes = useStyles();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //CONFIRM USSER WAS ADDED AND REDIRECT TO SIGNIN
  let confirm = async () => {
    alert('User Added');
    history.push('/SignIn');
  };

  //Removeing GraphQL Error from error message

  let fixErrorMessage = (message) => {
    return alert(message.replace('GraphQL error: ', ''));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="Uname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {/* Mutation compoenent from React Apollo, get data from form, and execute accordingly */}
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, name, userName }}
            onCompleted={() => confirm()}
            onError={(e) => fixErrorMessage(e.message)}
          >
            {(mutation) => (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={mutation}
                className={classes.submit}
              >
                Sign Up
              </Button>
            )}
          </Mutation>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
