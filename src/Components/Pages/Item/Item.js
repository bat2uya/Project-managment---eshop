import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { connect } from "react-redux";
import { addItemInCart } from "../../../Redux/Actions";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import firebase from '../../../firebase';
import logo2 from '../../../Images/noimage.png';

class ConnectedItem extends Component {

 constructor(props) {
    super(props);
    this.state = {
         dataForTheMenu: logo2,
    };
}

    componentDidMount = async () => {
        let storageRef1 = firebase.storage().ref()
         this.props.item.imageList !==  'null' &&
        storageRef1.child(this.props.item.imageList[0])      
          .getDownloadURL()
          .then((url) => {          
              this.setState({ dataForTheMenu: url })
 
        })        
  }

 
  render() {
    return (
      <Card
        style={{ width: 200, height: 270, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.productId);
          }}
        >
          <CardMedia
            style={{ height: 140 }}
            image={this.state.dataForTheMenu}
          />
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {this.props.item.description}
            </div>
            <div style={{ margin: 5 }}>Price: {this.props.item.price} $</div>
            <div style={{ color: "#e12b35", fontWeight: "bold", margin: 5 }}>
              {this.props.item.popular && "Popular"}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 45 }}
        >
          <Button
            size="small"
            style={{ marginRight: 60 }}
            onClick={() => {
              this.props.history.push("/details/" + this.props.item.productId);
            }}
          >
            {" "}
            Details
          </Button>
          <Tooltip title="Add to cart">
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                this.props.dispatch(
                  addItemInCart({ ...this.props.item, quantity: 1 })
                );
              }}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <AddShoppingCartIcon size="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(ConnectedItem));
