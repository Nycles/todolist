import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { IconButton, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Field, Form } from 'react-final-form'
import { NavLink } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
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
}))

export default function SignUp(props) {
  const classes = useStyles()

  function onSubmit(data) {
    props.submitData(data)
  }

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

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="age"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        autoComplete="age"
                        name="age"
                        variant="outlined"
                        fullWidth
                        id="age"
                        label="age"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={props.show ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position={'end'}>
                              <IconButton onClick={props.switchShow}>
                                {props.show ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-start">
                <Grid item>
                  <NavLink
                    to="/login"
                    style={{ textDecoration: 'none', color: '#2E2E2E' }}
                  >
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
