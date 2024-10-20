import { toast } from 'react-toastify';
import { addExpense, addInvestment, addTransaction, deleteExpense, deleteInvestment, login, logout, signUp, updateExpense, updateInvestment, updateUserData } from '../../api/apiutils';
import { redirect } from 'react-router-dom';

export async function loginAction({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
  
    // login user
    if (_action === "loginUser") {
        try {
            const resp = await login(values.userName, values.password);
            if (!resp?.token) {
                toast.error("Invalid credentials.");
                return null;
            }
            else {
                toast.success("Login Successful");
                return redirect("/");
            }
        } catch (e) {
            console.log(e.message);
            toast.error("Login Failed");
            throw new Error("There was a problem creating your account.");
        }
    }
}

export async function signupAction({ request }) {

    const data = await request.formData();
    const { ...values } = Object.fromEntries(data);
  
    try {
        const resp = await signUp(values.name, values.userName, values.email, values.password);
        if (!resp?.token) {
            return toast.error("Failed to submit form");
        }
        else {
            toast.info("User Successfully Created, redirected to dashboard.")
            return redirect("/");
        }
    } catch (e) {
        console.log(e.message);
        toast.error("Failed to SignUp.")
        throw new Error("There was a problem creating your account.");
    }
}

export async function accountTransaction({ request }) {
    const data = await request.formData();
    const { ...values } = Object.fromEntries(data);

    let amount = values.amount;
    const description = values.description;
    const type = values.type;

    amount = type === "sub" ? -amount : amount;
    try {
        const resp = await addTransaction(description, amount);
        if ("error" in resp) {
            toast.error("Error occured: "+resp.error);
        }
        else {
            toast.info("Added transaction of ₹ "+amount)
        }
        return null;
    } catch(e) {
        console.log(e.message);
        toast.error("Failed to Add Transaction")
        throw new Error("Error adding transaction.")
    }
}

export async function addNewInvestment({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "addInvestment") {
        const investmentType = values.type;
        let amount = parseInt(values.amount);
        const interest = parseFloat(values.interest);

        try {
            const resp = await addInvestment(investmentType, amount, interest);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Added New Investement: "+investmentType)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            toast.error("Failed to Add Investment.")
            throw new Error("Error adding transaction.")
        }
    }

    if (_action === "updateInvestment") {
        const investmentId = values._investmentId;
        let amount = parseInt(values.amount);
        const type = values.type;
        const description = values.description;

        amount = type === "sub" ? -amount : amount;
        try {
            const resp = await updateInvestment(investmentId, description, amount);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Added transaction of ₹ "+amount)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            toast.error("Error adding transaction in investment.")
            throw new Error("Error adding transaction in investment.")
        }
    }

    if (_action === "deleteInvestment") {
        const investmentId = values._investmentId;
        const type = values._investmentType;
        const userType = values.type;

        if (type !== userType) {
            return "Invalid Input, investment not deleted"
        }

        try {
            const resp = await deleteInvestment(investmentId);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Removed Investment: "+type)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            toast.error("Failed to delete investment.")
            throw new Error("Error deleting investment.")
        }
    }
}

export async function updateExpenses({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "addExpense") {
        const name = values.name;
        let amount = parseInt(values.amount);
        const mode = values.mode;

        try {
            const resp = await addExpense(name, amount, mode);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Added New expense: "+name)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            toast.error("Failed to add expense.")
            throw new Error("Error adding transaction.")
        }
    }

    if (_action === "updateExpense") {
        const expenseId = values._expenseId;
        let amount = parseInt(values.amount);
        const type = values.type;
        const description = values.description;

        amount = type === "sub" ? -amount : amount;
        try {
            const resp = await updateExpense(expenseId, amount, description);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Added transaction of ₹ "+amount)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            toast.error("Failed to add transaction to expense.")
            throw new Error("Error adding transaction in investment.")
        }
    }

    if (_action === "deleteExpense") {
        const expenseId = values._expenseId;
        const name = values._expenseName;
        const userEnteredName = values.name;

        if (name !== userEnteredName) {
            return "Invalid Input, investment not deleted"
        }

        try {
            const resp = await deleteExpense(expenseId);
            if ("error" in resp) {
                toast.error("Error occured: "+resp.error);
            }
            else {
                toast.info("Deleted Expense: "+name)
            }
            return null;
        } catch(e) {
            console.log(e.message);
            throw new Error("Error deleting investment.")
        }
    }
}

export async function updateAccount({ request }) {
    const data = await request.formData();
    const { ...values } = Object.fromEntries(data);
    let returnData = {};

    const name = values?.name;
    const income = values?.income;
    const password = values?.password;
    const confirmPassword = values?.confirmPassword;

    if (name) {
        returnData["name"] = name;
    }

    if (password) {
        if (password !== confirmPassword) {
            return "Passwords do not match"
        }
        returnData["password"] = password;
    }

    if (income) {
        returnData["monthlyIncome"] = income;
    }

    console.log(returnData);
    try {
        const resp = await updateUserData(returnData);
        if ("error" in resp) {
            toast.error("Error occured: "+resp.error);
        }
        else {
            toast.info("Updated Account Information Successfully")
        }
        return null;
    } catch(e) {
        console.log(e.message);
        toast.error("Failed to Update Account Info.")
        throw new Error("Error adding transaction.")
    }
}

export async function dashboardAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);  
    
    if (_action === "logout") {
        logout();
        return toast.success("Logout Successful!");
    }
}