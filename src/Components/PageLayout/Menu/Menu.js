import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { dataForTheMenu } from "../../Data";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { addItemInCart } from "../../../Redux/Actions";
import axios from "axios";
import server from "../../../server.json";
 import Api from "../../../Api";

const mapStateToProps = state => {
  return {
    showMenu: state.showMenu
  };
};

class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initially item with id 1 is expanded
      items: [],
      expandedMenuItems: {
        1: true
      },
        dataForTheMenu: "",
    };

   

    this.renderMenu = this.renderMenu.bind(this);
  }

   async fetchData() {
   
    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);
    let results = await Api.searchItems("AllProducts");
    this.setState({
      items: results.data
    });
  }

  componentDidMount = async () => {
  let userName = localStorage.getItem('userName');
  const token = localStorage.userToken;
  await this.fetchData() ;
  
  if(userName){       
  await axios
         .get(server.url + "/cart/" + userName
        , {
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        },
        }
      )
      .then((result) => {
      
      console.log('ssssssssssssssssssssssssss');
      console.log(this.state.items);

      let k = this.state.items.filter(x => x.productId ===result.data[0].productId);
      console.log(k[0].productId);

        for(let i = 0; i< result.data.length; i++){
          let res = this.state.items.filter(x => x.productId === result.data[i].productId);
                    this.props.dispatch(
                  addItemInCart({ ...res[0]  
                  , quantity: result.data[i].quantity })
                );            
             }
        
      })
      .catch((err) => this.setState({ error: err.response }));  
  }



  await axios
      .get(server.urlHenok + "/categories")
      .then((result) => {
        
        this.setState({ dataForTheMenu: result.data})
      })
      .catch((err) => this.setState({ error: err.response }));
  }

   isMenuItemActive(item, location) {
    if (location.pathname === "/" && location.search) {
      let queryStringParsed = queryString.parse(location.search);

      return item.label === queryStringParsed.category;
    }

    return "/?category=" + item.label === location.pathname;
  }

  renderMenu(data) {
    return (
      <List>
        {Array.from(data).map((x, i) => {
         
          if ( x.nodes.length ===0) {
    
            return (
              <NavLink
                to={"/?category=" + x.label}
                exact
                isActive={(param, location) => {
                  return this.isMenuItemActive(x, location);
                }}
                style={{
                  textDecoration: "none",
                  color: "rgb(32, 32, 34)"
                }}
                key={x.key}
                activeStyle={{
                  color: "#4282ad",
                  fontWeight: "bold"
                }}
              >
                <ListItem dense button
                      onClick={() => {
                    // Update in state which menu items are expanded.
                    this.setState(ps => {
                      return {
                        expandedMenuItems: {
                          ...ps.expandedMenuItems,
                          [x.key]: !ps.expandedMenuItems[x.key]
                        }
                      };
                    });
                  }}
                >
                  <ListItemIcon>
                    <Icon>{x.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<div style={{ color: "inherit" }}>{x.label}</div>}
                  />
                </ListItem>
              </NavLink>
            );
          } else {
            return (
               <NavLink
                to={"/?category=" + x.label}
                exact
                isActive={(param, location) => {
                  return this.isMenuItemActive(x, location);
                }}
                style={{
                  textDecoration: "none",
                  color: "rgb(32, 32, 34)"
                }}
                key={x.key}
                activeStyle={{
                  color: "#4282ad",
                  fontWeight: "bold"
                }}
              >
              <Fragment key={x.key}>
                <ListItem
                  button
                  dense
                  onClick={() => {
                    // Update in state which menu items are expanded.
                    this.setState(ps => {
                      return {
                        expandedMenuItems: {
                          ...ps.expandedMenuItems,
                          [x.key]: !ps.expandedMenuItems[x.key]
                        }
                      };
                    });
                  }}
                >
                  <ListItemText primary={x.label} />
                  {this.state.expandedMenuItems[x.key] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={this.state.expandedMenuItems[x.key]}
                  timeout="auto"
                  unmountOnExit
                >
                  { 
                   this.renderMenu(x.nodes)}
                </Collapse>
              </Fragment>
                 </NavLink>
            );
          }
        })}
      </List>
    );
  }

  render() {
    if (!this.props.showMenu) return null;
    return (
      <div
        style={{
          backgroundColor: "#FAFAFB",
          minWidth: 250
        }}
      >
        {/* Render our menu */
         }
        {
          this.renderMenu(this.state.dataForTheMenu)}
      </div>
    );
  }
}
const Menu = withRouter(connect(mapStateToProps)(ConnectedMenu));
export default Menu;
