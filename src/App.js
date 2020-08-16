import React, { Component } from "react";
import "./App.css";
import Header from "./Components/PageLayout/Header/Header.js";
import Footer from "./Components/PageLayout/Footer/Footer";
import ProductList from "./Components/Pages/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/PageLayout/Menu/Menu";
import CartDialog from "./Components/Pages/CartDialog/CartDialog";
import Details from "./Components/PageLayout/Details/Details";
import Order from "./Components/Pages/Order/Order";
import Orders from "./Components/Pages/Order/Orders";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import Profile from "./Components/Auth/Profile/Profile";
import ProfileEdit from "./Components/Auth/Profile/ProfileEdit";
import Cards from "./Components/Auth/Profile/Cards";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Forgetpassword from "./Components/Auth/forgetpassword/forgetpassword";
 

class App extends Component { 
 

  render() {
   
    
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgetpassword" component={Forgetpassword} />
              <ProtectedRoute path="/order" component={Order} />
              <ProtectedRoute path="/orders" component={Orders} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/profileedit" component={ProfileEdit} />
              <ProtectedRoute path="/cards" component={Cards} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
 
export default App;
