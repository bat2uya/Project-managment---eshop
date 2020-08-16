import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../../Auth";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../../Redux/Actions";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
 

class SignupClass extends Component {
  
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    pass: "",
    redirectToReferrer: false,
    error:""

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
          Sign up
        </Typography>
        <form style={{
      width: '100%', // Fix IE 11 issue.
      marginTop: 20,
    }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.firstName}
                onChange={e => {
              this.setState({ firstName: e.target.value });
            }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={this.state.lastName}
                onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.username}
                onChange={e => {
              this.setState({ userName: e.target.value });
            }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.pass}
                onChange={e => {
              this.setState({ pass: e.target.value });
            }}
              />
            </Grid>
           
          </Grid>
          <Button
         
            fullWidth
            variant="contained"
            color="primary"
             onClick={() => {
              // authentication call
           
              Auth.signup(this.state.userName, this.state.pass, user => {
                if (!user) {
                  var retrievedObject = localStorage.getItem('error');
                  this.setState({ wrongCred: true });
                  this.setState({ error: retrievedObject });
                 return;
                }

                this.props.dispatch(setLoggedInUser({ name: user.name }));
                this.setState(() => ({
                  redirectToReferrer: true
                }));
              
              });
            }}
          >
            Sign Up
          </Button>
            {this.state.wrongCred && (
            <div style={{ color: "red" }}>{this.state.error}</div>
          )}
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
    //   <div
    //     style={{
    //       height: "100%",
    //       display: "flex",
    //       justifyContent: "center",

    //       alignItems: "center"
    //     }}
    //   >
    //     <div
    //       style={{
    //         height: 300,
    //         width: 200,
    //         padding: 30,
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         flexDirection: "column"
    //       }}
    //     >
    
    // <Avatar className={useStyles.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
   
    //       <div
    //         style={{
    //           marginBottom: 20,
    //           fontSize: 24,
    //           textAlign: "center"
    //         }}
    //       >
    //         {" "}
    //         Log in{" "}
    //       </div>
    //       <TextField
    //         label="Required"
    //         variant="filled"
    //         value={this.state.userName}
    //         placeholder="User name"
    //         required
    //         onChange={e => {
    //           this.setState({ userName: e.target.value });
    //         }}
    //       />
    //       <TextField
    //         label="Required"
      
    //         variant="outlined"
    //         value={this.state.pass}
    //         type="password"
    //         placeholder="Password"
    //         required
    //         onChange={e => {
    //           this.setState({ pass: e.target.value });
    //         }}
    //       />
    //       <Button
    //         style={{ marginTop: 20, width: 200 }}
    //         variant="outlined"
    //         color="primary"
    //         onClick={() => {
    //           // Simulate authentication call
    //           Auth.authenticate(this.state.userName, this.state.pass, user => {
    //             if (!user) {
    //               this.setState({ wrongCred: true });
    //               return;
    //             }

    //             this.props.dispatch(setLoggedInUser({ name: user.name }));
    //             this.setState(() => ({
    //               redirectToReferrer: true
    //             }));
    //           });
    //         }}
    //       >
    //         Log in
    //       </Button>
    //       {this.state.wrongCred && (
    //         <div style={{ color: "red" }}>Wrong username and/or password</div>
    //       )}
    //     </div>
    //   </div>
    );
  }
}
const Signup = withRouter(connect()(SignupClass));

export default Signup;