import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });
  
function setToken(token){
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
