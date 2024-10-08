import axios from "axios";
import { redirect } from "react-router-dom";

const apiURL = 'http://localhost:3000/api/'
const instance = axios.create({
    withCredentials: true,
    baseURL: apiURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
    },
  });
  
function setToken(token){
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getLocalCredentials() {
    const userName = localStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    return {userName, token};
}

async function getAuthToken() {
    console.log("Refreshed token");
    try {
        const response = await axios.post(apiURL+'login/refreshToken',null, {
            withCredentials: true
        });
        if (response.data?.token) {
            sessionStorage.setItem(
                "token", response.data.token,
            )
            return response.data.token
        }
        else {
            return null;
        }
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

// Refresh the token if it doens't exist in session storage
instance.interceptors.request.use(config => {
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));


instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const token = await getAuthToken();
        // Update the authorization header with the new access token.
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return await instance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('username');
        redirect("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);


export async function signUp(name, username, email, password) {
    try {    
        const response = await instance.post('register', {
            name: name,
            username: username,
            email: email,
            password: password,
        });

        localStorage.setItem(
            "username",
            username
        )
        sessionStorage.setItem(
            "token", response.data.token,
        )

        return response.data;
    } catch (error) {
        return (error.response.data);
    }
}


export async function login(username, password) {
    try {    
        const response = await instance.post('login', {
            username: username,
            password: password
        });

        localStorage.setItem(
            "username",
            username
        )
        sessionStorage.setItem(
            "token", response.data.token,
        )

        return response.data;
    } catch (error) {
        return (error.response.data);
    }
}

export async function logout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("username");
    instance.defaults.headers.common["Authorization"] = null;
    try {
        await axios.post(apiURL+"login/logout",null,{ withCredentials: true });
    } catch (error) {
        console.log(error.message);
    }
}

export async function getUser() {
    try {
        const response = await instance.get("user");

        if (response.data.username) {
            return response.data;
        }
        else {
            alert (response.data.message);
            return null;         
        }
    } catch (error) {
        console.log(error.response.data);
        return null;
    }
}

// Function to add an expense
async function addExpense(username, token, expenseData) {
    setToken(token);
    try {
        const response = await instance.post(`/${username}/expenses`, expenseData);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding expense' };
    }
}

// Function to get all expenses
async function getAllExpenses(username, token) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/expenses`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching expenses' };
    }
}

// Function to get a specific expense
async function getExpense(username, token, index) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/expenses/${index}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching expense' };
    }
}

// Function to update an expense
async function updateExpense(username, token, index, updatedData) {
    setToken(token);
    try {
        const response = await instance.put(`/${username}/expenses/${index}`, updatedData);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error updating expense' };
    }
}

// Function to delete an expense
async function deleteExpense(username, token, index) {
    setToken(token);
    try {
        const response = await instance.delete(`/${username}/expenses/${index}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error deleting expense' };
    }
}

// Investment Functions

// Function to add an investment
async function addInvestment(username, token, investmentData) {
    setToken(token);
    try {
        const response = await instance.post(`/${username}/investments`, investmentData);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding investment' };
    }
}

// Function to get all investments
async function getAllInvestments(username, token) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/investments`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching investments' };
    }
}

// Function to get a specific investment
async function getInvestment(username, token, investmentId) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/investments/${investmentId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching investment' };
    }
}

// Function to update an investment
async function updateInvestment(username, token, investmentId, updatedData) {
    setToken(token);
    try {
        const response = await instance.put(`/${username}/investments/${investmentId}`, updatedData);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error updating investment' };
    }
}

// Function to delete an investment
async function deleteInvestment(username, token, investmentId) {
    setToken(token);
    try {
        const response = await instance.delete(`/${username}/investments/${investmentId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error deleting investment' };
    }
}

// Transaction Functions

// Function to add a transaction
async function addTransaction(username, token, transactionData) {
    setToken(token);
    try {
        const response = await instance.post(`/${username}/transactions`, transactionData);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding transaction' };
    }
}

// Function to get all transactions
async function getAllTransactions(username, token) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/transactions`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching transactions' };
    }
}

// Function to get a specific transaction
async function getTransaction(username, token, index) {
    setToken(token);
    try {
        const response = await instance.get(`/${username}/transactions/${index}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching transaction' };
    }
}

// Function to delete a transaction
async function deleteTransaction(username, token, index) {
    setToken(token);
    try {
        const response = await instance.delete(`/${username}/transactions/${index}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error deleting transaction' };
    }
}
