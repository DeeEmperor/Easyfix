import { useState } from "react";
import Signup from "../components/auth/Signup";

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    function handleSignup(event) {
        event.preventDefault()
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return;
        }
        console.log("Validation successful", formData)
    }
    return (
        <Signup
            formData={formData}
            handleChange={handleChange}
            handleSignup={handleSignup}
        />
    )
}
export default SignupPage
