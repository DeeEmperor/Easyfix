import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/auth/Signup";

function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    async function handleSignup(event) {
        event.preventDefault();
        
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Please enter all fields");
            return;
        }
        if (!formData.email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                alert('Account created successfully!');
                navigate('/homepage'); // Redirect to homepage or dashboard
            } else {
                alert(data.error || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <Signup
            formData={formData}
            handleChange={handleChange}
            handleSignup={handleSignup}
            loading={loading}
        />
    )
}
export default SignupPage
