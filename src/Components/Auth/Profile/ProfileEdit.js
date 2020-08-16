import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import OrderIcon from '@material-ui/icons/ListAltOutlined';
import ProfileIcon from '@material-ui/icons/AccountBoxOutlined';
 
const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

 
class ProfileEditClass extends Component {
 
  state = {
    mail: "",
    firstName: "",
    lastName: "",
    redirectToReferrer: false,
    error:""

  };
  render() {
  
    return (
      <div style={{ padding: 10, width: 800 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Profile edit </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email Address:</TableCell>
              <TableCell>  <TextField
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
              /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             <TableRow>
              <TableCell>First name:</TableCell>
              <TableCell>  <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoComplete="firstName"
                value={this.state.firstName}
                onChange={e => {
              this.setState({ firstName: e.target.value });
            }}
              /></TableCell>
            </TableRow>
             <TableRow>
              <TableCell>Last name:</TableCell>
              <TableCell>  <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={this.state.lastName}
                onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
              /></TableCell>
            </TableRow>
          </TableBody>
          
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
         
        </div>


        <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
                 <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<OrderIcon />}
                    size="large"
                    onClick={() => {
                       this.props.history.push("/orders");
                    }}
                    style={{ margin: 3, marginTop: 30 }}
                    >
                    Save
                  </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<ProfileIcon />}
                    size="large"
                    onClick={() => {
                           this.props.history.push("/profileedit");
                    }}
                    style={{ margin: 3, marginTop: 30 }}
                    >
                    Change password
                  </Button>
            </Grid>
             <Grid item xs={12} sm={4}>
                <Button
                    color="secondary"
                    variant="outlined"
                    startIcon={<ProfileIcon />}
                    size="large"
                    onClick={() => {
                            this.props.history.push("/orders");
                    }}
                    style={{ margin: 3, marginTop: 30 }}
                    >
                    Delete account
                  </Button>
            </Grid>
           
            
          </Grid>
        
    
      </div>
    );
  }
}
const ProfileEdit = withRouter(connect(mapStateToProps)(ProfileEditClass));

export default ProfileEdit;