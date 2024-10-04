import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });
  
async function login(username, password) {
    try {    
        const response = await instance.post('login', {
            username: username,
            password: password
        });
        return response.data;
    } catch (error) {
        return (error.response.data);
    }
}
