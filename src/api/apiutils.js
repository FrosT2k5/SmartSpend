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


// Function to get all transactions
export async function getAllTransactions() {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.get(`/${username}/transactions`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching transactions' };
    }
}

// Function to get all investments
export async function getAllInvestments() {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.get(`/${username}/investments`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching investments' };
    }
}

// Function to get all expenses
export async function getAllExpenses() {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.get(`/${username}/expenses`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error fetching expenses' };
    }
}


// Function to add a transaction
export async function addTransaction(description, amount) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }
    try {
        const response = await instance.post(`/${username}/transactions`, {
            description: description,
            amount: parseInt(amount),
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding transaction' };
    }
}

// Function to add an investment
export async function addInvestment(type, amount, interest) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }
    try {
        const response = await instance.post(`/${username}/investments`, {
            type: type,
            baseValue: parseInt(amount),
            rateOfInterest: parseFloat(interest),
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding investment' };
    }
}

// Function to update an investment
export async function updateInvestment(investmentId, description, amount) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }
    try {
        const response = await instance.put(`/${username}/investments/${investmentId}`, {
            "transactionAmount": parseInt(amount),
            "description": description,
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error updating investment' };
    }
}

// Function to delete an investment
export async function deleteInvestment(investmentId) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.delete(`/${username}/investments/${investmentId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error deleting investment' };
    }
}


export async function addExpense(name, amount, modeOfPayment) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.post(`/${username}/expenses`, { 
            name, 
            currentAmount: parseInt(amount),
            modeOfPayment,
            usedValue: 0,
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error adding expense' };
    }
}


// Function to update an expense
export async function updateExpense(expenseId, amount, description) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.put(`/${username}/expenses/${expenseId}`, {
            amount,
            description
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error updating expense' };
    }
}

// Function to delete an expense
export async function deleteExpense(expenseId) {
    const username = localStorage.getItem("username");
    if (!username) {
        throw new Error("Username Not Found. Login Again")
    }

    try {
        const response = await instance.delete(`/${username}/expenses/${expenseId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error deleting expense' };
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



// Investment Functions


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



// Transaction Functions

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
