//import { sampleProducts } from "./test";
import axios from "axios";
import server from "./server.json";
///
//
// Methods of this class are used to simulate calls to server.
//
 
class Api {
  
  makeOrder(customerID) {
 
    return new Promise((resolve, reject) => {
          axios
          .post(server.urlHenok + "/orders/create/" + customerID)
          .then((result) => {
     
            console.log(result.data);

            setTimeout(() => {
                  let res =  result.data.filter(x => x.customerID === customerID);
                  
                  console.log(res);

                  resolve(res.length === 0 ? null : res[0]);
                }, 500);

          })
          .catch((err) => this.setState({ error: err.response }));
    
    });
  }

   makePurchase(bankData, orderNumber) {
 
    return new Promise((resolve, reject) => {
          axios
          .post(server.urlHenok + "/checkout/"+orderNumber )
          .then((result) => {
     
            console.log(result.data);

            setTimeout(() => {
                  
                  let res =  result.data.filter(x => x.orderNumber === orderNumber);
                  
                  console.log(res);

                  resolve(res.length === 0 ? null : res[0]);
                }, 500);

          })
          .catch((err) => this.setState({ error: err.response }));
    
    });
  }
   
  getItemUsingID(productId) {
 
    return new Promise((resolve, reject) => {
          axios
          .get(server.urlHenok + "/products")
          .then((result) => {
     
            console.log(result.data);

            setTimeout(() => {
                  let res =  result.data.filter(x => x.productId === productId);
                  
                  console.log(res);

                  resolve(res.length === 0 ? null : res[0]);
                }, 500);

          })
          .catch((err) => this.setState({ error: err.response }));
    
    });
  }

  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  searchItems({
    category = "AllProducts",
    term = "",
    sortValue = "lh",
    itemsPerPage = 10,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {
    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;

    return new Promise((resolve, reject) => {

          axios
          .get(server.urlHenok + "/products")
          .then((result) => {

      setTimeout(() => {
        let data = result.data.filter(item => {
          if (
            usePriceFilter &&
            (item.price < minPrice || item.price > maxPrice)
          ) {
            return false;
          }

          // if (category === "popular") {
          //   return item.popular;
          // }

          if (category !== "AllProducts" && category !== item.categoryName)
            return false;

          if (term && !item.description.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = this.sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
           })
          .catch((err) => this.setState({ error: err.response }));

    });
  }
}

export default new Api();



