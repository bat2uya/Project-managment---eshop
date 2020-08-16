import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
 

class ForgetPassword extends Component {
 
  state = {
    email: "", 
  };
 
  render() {
 
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
        <Avatar style={{marginTop: 20, backgroundColor: "red"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget password
        </Typography>
        <form style={{
      width: '100%',  
      marginTop: 20,
    }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                label="Email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
             
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"         
          >
            Reset password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>    
    </Container>
     
    );
  }
}
const Forgetpass = withRouter(connect()(ForgetPassword));

export default Forgetpass;