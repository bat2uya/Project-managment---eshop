import axios from "axios";
import server from "./server.json";


// Simulate authentication service
const Auth = {
  

  authenticate(name, pass, cb) {

    axios
    .post(server.url + '/login', {
                              username: name, 
                              password: pass,})
    .then((res) => {
        
        if (res.data.token) {
          localStorage.setItem("user", res.data.userId);
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userName", name);
          localStorage.setItem("password", pass);
        }
   
        setTimeout(
          () =>
            cb({
              name: name
            }),
          100
        );
    })
    .catch((err) =>{
            console.log('request failed', err);
    });
 
  
  },

  signup(name, pass, cb) {

    axios
    .post(server.url + '/signup', {
                              username: name, 
                              password: pass,})
    .then((res) => {
     
        setTimeout(
          () =>
            cb({
              name: name
            }),
          100
        );
    })
    .catch((err) =>{
       if (err.response.data.error === 'CONFLICT') {
           console.log('request failed', err.response.data.error);
           localStorage.setItem("error", name + ' ' + JSON.stringify(err.response.data.message));
     
          }

        setTimeout(cb, 100);
         ///   console.log('request failed', err);
    });
 
  
  },

  signout(cb) {
 
 
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
     localStorage.removeItem("password");
    setTimeout(cb, 100);
  }
};

export default Auth;