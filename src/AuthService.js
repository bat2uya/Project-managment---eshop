
import axios from "axios";
import server from "./server.json";
 
const sendGetRequest = async () => {
    try {
        const resp = await axios.get(server.henkok + 'products');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
 
export default  sendGetRequest;


 
//export default new AuthService();
