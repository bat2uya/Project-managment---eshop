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
const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

// This component shows the items user checked out from the cart.
class MyOrders extends Component {
 
  state = {
    fullname: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zip: "",
    redirectToReferrer: false,
    error:""

  };
  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>My orders</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Shipped date</TableCell>
              <TableCell>Delivered date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
          disabled={totalPrice === 0}
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
          disabled={totalPrice === 0}
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