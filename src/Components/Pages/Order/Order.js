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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';




const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};


// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
   constructor(props) {
    super(props);
    this.state = {
    fullname: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zip: "",
    redirectToReferrer: false,
    error:"",
    options : [],
    defaultOption : '',
    cards: [],
  };
  this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

 handleChangeStatus(event) {
   
     this.setState({ defaultOption: event.value });
  }

   CheckOut= async () =>
  {
     var customerId = localStorage.getItem('user');
     const token = localStorage.userToken;
     let userName = localStorage.getItem('userName');
     
     let address = {street: this.state.addressline1,city:this.state.city,state:this.state.state,zip:this.state.zip };

     let tmp = this.state.cards.filter(x => x.cardNumber === this.state.defaultOption);
    
     let data = {customerId: customerId,address: address,bankCardDto : tmp[0]};

console.log(data);
    //   private String street;
    // private String city;
    // private String state;
    // private String zip;
     await axios
     .post(server.url + "/orders/checkout/",
        data   
        , {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        }
      )
        .then((result) => {     
              console.log(result.data, '=========================');   
              
      })
      .catch((err) => this.setState({ error: err.response }));
  }

     componentDidMount = async () => {
     var customerId = localStorage.getItem('user');
     const token = localStorage.userToken;
     let userName = localStorage.getItem('userName');
     // const dataWithUser = {userName: localStorage.getItem('userName')};
     
     const data = Array.from(this.props.checkedOutItems).map((item, index) => {
            return {productId: item.productId, 
                    quantity: item.quantity,              
                    unitCost: item.price,
                    userName: userName,
                    vendorId: item.vendorId};            
            })
      //dataWithUser.push(data);

          let rData = {userName: userName, 
                    customerId: customerId, cartItems: data};
          

          await axios
          .post(server.url + '/cart/create', 
                                    rData,                                      
                                        {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        })
      .then((result) => {     
   
      })
      .catch((err) => this.setState({ error: err.response }));

      await axios
         .get(server.url + "/users/cards/" + customerId
        , {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        }
      )
        .then((result) => {     
            

          if(result.data !== null)
          {
           
             for(let i = 0; i< result.data.length; i++){
              //  this.state.options.push(result.data[i].cardNumber);
                  if(result.data[i].cardNumber !== null) this.state.options.push(result.data[i].cardNumber) ;
             }
            
             this.setState({ cards: result.data})
 
          }          
      })
      .catch((err) => this.setState({ error: err.response }));
  }

  render() {
 

    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Order summary</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "blue",
            textAlign: "left",
            marginLeft: 10,
            marginTop: 20,
            fontSize: 22
          }}
        >
          Total price: $ {totalPrice} 
        </div>

      {  totalPrice > 0 && (

        
          <div>
           <fieldset>
           <legend>Shipping address:</legend>
          
           <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Full name"
                name="email"
                autoComplete="email"
                value={this.state.fullname}
                onChange={e => {
              this.setState({ fullname: e.target.value });
            }}
              />
            </Grid>
             <div>
            </div>
             <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressline1"
                label="addressline 1"
                name="addressline1"
                autoComplete="addressline1"
                value={this.state.addressline1}
                onChange={e => {
              this.setState({ addressline1: e.target.value });
            }}
              />
            </Grid>
             <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="city"
                name="city"
                autoComplete="city"
                value={this.state.city}
                onChange={e => {
              this.setState({ city: e.target.value });
            }}
              />
            </Grid>
              <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={this.state.state}
                onChange={e => {
              this.setState({ state: e.target.value });
            }}
              />
            </Grid>
             <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zip"
                label="Zip"
                name="zip"
                autoComplete="zip"
                value={this.state.zip}
                onChange={e => {
              this.setState({ zip: e.target.value });
            }}
              />
              </Grid>
              </fieldset>
 <Grid> 
 <fieldset>
 <legend>Card information:</legend>
             <Dropdown  id="ddlViewBy" 
                        options={this.state.options} 
                        onChange={this.handleChangeStatus}
                        value={this.state.defaultOption} placeholder="Select an option" />
</fieldset>
</Grid>
            
</div>

      )}
        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
           
            // let e = document.getElementById("ddlViewBy");
            // let v = e.options[e.selectedIndex].value;
            // this.setState({defaultOption: v});
            this.CheckOut();
         
             this.props.history.push("orders");

          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
             this.props.history.push("/?category=AllProducts&term=");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
