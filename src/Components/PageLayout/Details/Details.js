import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCart } from "../../../Redux/Actions";
import Api from "../../../Api";
import Item from "../../Pages/Item/Item";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import firebase from '../../../firebase';
import logo2 from '../../../Images/noimage.png';

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: null,
      itemLoading: false,
      dataForTheMenu: logo2,
    };
  }

  async fetchProductAndRelatedItems(productId) {
    this.setState({ itemLoading: true });

    let item = await Api.getItemUsingID(productId);

    let relatedItems = await Api.searchItems({
      category: item.categoryName
    });

      let storageRef1 = firebase.storage().ref()
        storageRef1.child(item.imageList[0])      
          .getDownloadURL()
          .then((url) => {          
              this.setState({ dataForTheMenu: url })
 
        })

 
    if (this.isCompMounted) {
      this.setState({
        item,
        quantity: 1,
        relatedItems: relatedItems.data.filter(x => x.productId !== item.productId),
        itemLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
   
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProductAndRelatedItems(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProductAndRelatedItems(this.props.match.params.id);

  

  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  render() {
    if (this.state.itemLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div style={{ padding: 10 }}>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 22
          }}
        >
          {this.state.item.productName}
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={this.state.dataForTheMenu}
            alt=""
            width={250}
            height={250}
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              objectFit: "cover"
            }}
          />
          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                fontSize: 16
              }}
            >
              Price: {this.state.item.price} $
            </div>
            {this.state.item.popular && (
              <div style={{ fontSize: 14, marginTop: 5, color: "#e12b35" }}>
                (Popular product)
              </div>
            )}

            <TextField
              type="number"
              value={this.state.quantity}
              style={{ marginTop: 20, marginBottom: 10, width: 70 }}
              label="Quantity"
              inputProps={{ min: 1, max: 10, step: 1 }}
              onChange={e => {
                this.setState({ quantity: parseInt(e.target.value) });
              }}
            />
            <Button
              style={{ width: 170, marginTop: 5 }}
              color="primary"
              variant="outlined"
              onClick={() => {
                this.props.dispatch(
                  addItemInCart({
                    ...this.state.item,
                    quantity: this.state.quantity
                  })
                );
              }}
            >
              Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>
          </div>
        </div>

        {/* Product description */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 22
          }}
        >
          Product Description
        </div>
        <div
          style={{
            maxHeight: 200,
            fontSize: 13,
            overflow: "auto"
          }}
        >
          {this.state.item.description
            ? this.state.item.description
            : "Not available"}
        </div>

        {/* Relateditems */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 22
          }}
        >
          Related Items
        </div>
        {this.state.relatedItems.slice(0, 3).map(x => {
          return <Item key={x.id} item={x} />;
        })}
      </div>
    );
  }
}

let Details = connect()(ConnectedDetails);
export default Details;
