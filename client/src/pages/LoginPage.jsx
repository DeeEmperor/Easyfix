import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    async function handleLogin(event) {
        event.preventDefault();
        
        // Basic validation
        if (!formData.email || !formData.password) {
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

        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                alert('Login successful!');
                navigate('/homepage'); // Redirect to homepage or dashboard
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Login
            formData={formData}
            handleChange={handleChange}
            handleLogin={handleLogin}
            loading={loading}
        />
    )
}
export default LoginPage