import { useState } from "react";
import Login from "../components/auth/Login";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleLogin(event) {
        event.preventDefault()
        if (!formData.email || !formData.password) {
            alert("Please enter all fields")
            return;
        }
        if (!formData.email.includes("@")) {
            alert("Please enter a valid email")
            return;
        }
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long")
            return;
        }
        console.log("Validation successful", formData)
    }

    return (
        <Login
            formData={formData}
            handleChange={handleChange}
            handleLogin={handleLogin}
        />
    )
}
export default LoginPage