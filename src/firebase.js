// import firebase from "./firebase";
import * as firebase from "firebase";
 

const config = {
    apiKey: "AIzaSyDRF8dN6a45RSpzpem3wb4QJ-aFM0zCgFM",
    authDomain: "eshop-abfb2.firebaseapp.com",
    databaseURL: "https://eshop-abfb2.firebaseio.com",
    projectId: "eshop-abfb2",
    storageBucket: "eshop-abfb2.appspot.com",
    messagingSenderId: "1044962063720",
    appId: "1:1044962063720:web:a051dac0918bba15da52dd",
    measurementId: "G-FX7N95Y9RQ"
}

firebase.initializeApp(config);
export default firebase