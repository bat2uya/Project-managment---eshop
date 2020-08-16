import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../../Redux/Actions";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
 
 
 class CheckLogin extends Component {
  state = {
    userName: "",
    pass: "",
    redirectToReferrer: false
  };

  componentDidMount = async () => {
  await axios
      .get(server.urlHenok + "/categories")
      .then((result) => {
        
        this.setState({ dataForTheMenu: result.data})
      })
      .catch((err) => this.setState({ error: err.response }));
  }

  render() {
    
    const { from } = this.props.location.state || { from: { pathname: "/" } };

  
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      
    );
  }
}
const LoginCheck = withRouter(connect()(CheckLogin));

export default LoginCheck;