import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MaterialTable from 'material-table';
import axios from "axios";
import server from "../../../server.json";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};
 
class CardsClass extends Component {
  state = {
   
    data: [
      { CardType: 'Mehmet', Holder: 'Baran', cardNumber: 1987, expirationDate: 63, cvv:11},
     { CardType: 'Mehmet', Holder: 'Baran', cardNumber: 1987, expirationDate: 63, cvv:11},
      { CardType: 'Mehmet', Holder: 'Baran', cardNumber: 1987, expirationDate: 63, cvv:11},
    ],
 
    redirectToReferrer: false,
    error:""

  };

   componentDidMount = async () => {
        const token = localStorage.userToken;
        var customerId = localStorage.getItem('user');
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
              console.log(result.data.username + '=========================');
               this.setState({ data: result.data})
             

      })
      .catch((err) => this.setState({ error: err.response }, console.log(err.response)));
  }

  render() {
  
    return (
       
      <MaterialTable
      title="Cards"
      columns={[
  
            { title: "Holder", field: "holderName" },
            { title: "Bank Name", field: "bankName" },
            { title: "Card Number", field: "cardNumber", type: "numeric" },
              { title: "expirationDate", field: "expirationDate", type: "date" },
                  { title: "cvv", field: "cvv", type: "numeric" },
          
          ]}
      data={this.state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
                var customerId = localStorage.getItem('user');
                const token = localStorage.userToken;
       
               axios
                .post(server.url + '/users/cards/' +customerId , {
                                     "bankName": newData.bankName,
                                     "cardNumber" : newData.cardNumber,
                                      "holderName" : newData.holderName,
                                      "expirationDate" : newData.expirationDate,
                                      "cvv" : newData.cvv,
                                      "cardStatus" : "true"},                                      
                                        {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        })
                .then((res) => {
              
                   setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    });
                    }, 600);
             
                })
                .catch((err) =>{
                        console.log('request failed', err);
                });

           
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
                var customerId = localStorage.getItem('user');
                const token = localStorage.userToken;
       
               axios
                .delete(server.url + '/users/cards/' +customerId ,                                      
                                        {
                                            headers: {
                                            'Content-Type': 'application/json',
                                             Accept: 'application/json',
                                            'Authorization': `Bearer ${token}`,
                                           
                                            },
                                           data: {
                                     "bankName": oldData.bankName,
                                     "cardNumber" : oldData.cardNumber,
                                      "holderName" : oldData.holderName,
                                      "expirationDate" : oldData.expirationDate,
                                      "cvv" : oldData.cvv,
                                      "cardStatus" : "true"}
                                          
                                        })
                .then((res) => {
          

                                    setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                    }, 600);

                })
                .catch((err) =>{
                        console.log('request failed', err);
                });

          }),
      }}
    />
        
    );
  }
}
const Cards = withRouter(connect(mapStateToProps)(CardsClass));

export default Cards;