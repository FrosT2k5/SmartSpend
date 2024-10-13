import { addTransaction, login, signUp } from '../../api/apiutils';
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