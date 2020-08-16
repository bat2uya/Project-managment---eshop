import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../../Redux/Actions";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';

import axios from "axios";
import server from "../../../server.json";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

// This component shows the items user checked out from the cart.
class MyOrders extends Component {
 
  state = {
    data:[], 
    redirectToReferrer: false,
    error:""

  };

  componentDidMount = async () => {
    var customerId = localStorage.getItem('user');
    const token = localStorage.userToken;
    let userName = localStorage.getItem('userName');
     
     await axios
        .get(server.url + "/orders/" + userName
       , {
         headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'Authorization': `Bearer ${token}`
       },
       }
     )
       .then((result) => {   
         
        console.log(result.data.length + '0000000000000000000000000000000000000000');

         if(result.data !== null)
         {
                 
            this.setState({ data: result.data})
         }          
     })
     .catch((err) => this.setState({ error: err.response }));
 }

  render() {
  
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>My orders</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Ordered aDte</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Shipped date</TableCell>
              <TableCell>Delivered date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((item, index) => {
              return (
                <TableRow key={item.orderNumber}>
                  <TableCell>{item.orderNumber}</TableCell>
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>{item.totalCost}</TableCell>
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>{item.orderDate}</TableCell>
                </TableRow>
              );
            })}
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

     
        <Button
          color="primary"
          variant="outlined"
        
          onClick={() => {
            console.log("purchased");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Buy again
        </Button>
        <Button
          color="secondary"
          variant="outlined"
         
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Back
        </Button>
      </div>
    );
  }
}
const Orders = withRouter(connect(mapStateToProps)(MyOrders));

export default Orders;