import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setProfileEdit } from "../../../Redux/Actions";
 
import Grid from '@material-ui/core/Grid';

 
 import OrderIcon from '@material-ui/icons/ListAltOutlined';
import ProfileIcon from '@material-ui/icons/AccountBoxOutlined';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import server from "../../../server.json";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

 
class ProfileClass extends Component {
 
  state = {
     customerId: "CU1597103114628",
     username: "bat2uya@gmail.com",
     firstName: null,
     lastName: null,
     phone: null,
     cards: [],
     status: "ACTIVE",
     totalScore: 0.0,
     imageUrl: null,
     billingAddress: null,
     shippingAddress: null,   
     error:"",
  

  };
     
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  componentDidMount = async () => {
        const token = localStorage.userToken;
        var customerId = localStorage.getItem('user');
         await axios
         .get(server.url + "/users/" + customerId
        , {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        }
      )
        .then((result) => {     
              console.log(result.data.username + '=========================');
               this.setState({ username: result.data.username})
               this.setState({ firstName: result.data.firstName})
               this.setState({ lastName: result.data.lastName})
               this.setState({ phone: result.data.phone})
               this.setState({ billingAddress: result.data.billingAddress})
               this.setState({ shippingAddress: result.data.shippingAddress})

      })
      .catch((err) => this.setState({ error: err.response }, console.log(err.response)));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
 

    // If user was authenticated, redirect her to where she came from.
    if (!localStorage.getItem("userToken")) {

      return <Redirect to={from} />;
    }
    return (
      <div style={{ padding: 10, width: 800 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>My profile</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email:</TableCell>
              <TableCell> 
              <input
              readonly='true'
            name='username'
            placeholder=''
            value={this.state.username}
            onChange={this.handleChange}
            />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             <TableRow>
              <TableCell>First name:</TableCell>
              <TableCell> 
               <input
               readonly='true'
            name='firstName'
            placeholder=''
            value={this.state.firstName}
            onChange={this.handleChange}
            />
              </TableCell>
            </TableRow>
             <TableRow>
              <TableCell>Last name:</TableCell>
              <TableCell> 
               <input
               readonly='true'
            name='lastName'
            placeholder=''
            value={this.state.lastName}
            onChange={this.handleChange}
            />
              </TableCell>
            </TableRow>

             <TableRow>
              <TableCell>Phone:</TableCell>
              <TableCell> 
               <input
               readonly='true'
            name='phone'
            placeholder=''
            value={this.state.phone}
            onChange={this.handleChange}
            />
              </TableCell>
            </TableRow>

             <TableRow>
              <TableCell>billingAddress:</TableCell>
              <TableCell> 
               <input
               readonly='true'
            name='billingAddress'
            placeholder=''
            value={this.state.billingAddress}
            onChange={this.handleChange}
            />
              </TableCell>
            </TableRow>

  <TableRow>
              <TableCell>shippingAddress:</TableCell>
              <TableCell> 
               <input
               readonly='true'
            name='shippingAddress'
            placeholder=''
            value={this.state.shippingAddress}
            onChange={this.handleChange}
            />
              </TableCell>
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
                    Orders
                  </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<ProfileIcon />}
                    size="large"
                    onClick={() => {
                         this.props.dispatch(
                            setProfileEdit({ ...this.props.item, quantity: 1 })
                            );
                           this.props.history.push("/profileedit");
                    }}
                    style={{ margin: 3, marginTop: 30 }}
                    >
                    Edit Profile
                  </Button>
            </Grid>
             <Grid item xs={12} sm={4}>
                <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CardMembershipOutlinedIcon />}
                    size="large"
                    onClick={() => {
                            this.props.history.push("/cards");
                    }}
                    style={{ margin: 3, marginTop: 30 }}
                    >
                    Cards
                  </Button>
            </Grid>
           
            
          </Grid>
        
    
      </div>
    );
  }
}
const Profile = withRouter(connect(mapStateToProps)(ProfileClass));

export default Profile;