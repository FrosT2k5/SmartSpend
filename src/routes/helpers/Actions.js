import { addExpense, addInvestment, addTransaction, deleteExpense, deleteInvestment, login, signUp, updateExpense, updateInvestment } from '../../api/apiutils';
import { redirect } from 'react-router-dom';

export async function loginAction({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
  
    // login user
    if (_action === "loginUser") {
        try {
            const resp = await login(values.userName, values.password);
            if (!resp?.token) {
                alert("Invalid credentials.");
                return null;
            }
            else {
                return redirect("/");
            }
        } catch (e) {
            console.log(e.message);
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
            alert("Failure to submit form.");
            return null;
        }
        else {
            return redirect("/");
        }
    } catch (e) {
        console.log(e.message);
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
        return null;
    } catch(e) {
        console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
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
            return null;
        } catch(e) {
            console.log(e.message);
            throw new Error("Error deleting investment.")
        }
    }
}