import { login } from '../../api/apiutils';
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