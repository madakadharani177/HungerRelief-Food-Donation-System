import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            setMessage("Login successful!");

            const role = response.data.role;

            setTimeout(() => {
                if (role === "RESTAURANT") {
                    navigate("/restaurant/dashboard");
                } else if (role === "VOLUNTEER") {
                    navigate("/volunteer/dashboard");
                } else if (role === "NGO") {
                    navigate("/ngo/dashboard");
                } else if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                }
            }, 500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="auth-page">

                <div className="auth-card">

                    <div className="auth-header">

                        <div className="auth-icon">
                            ♥
                        </div>

                        <h1>Welcome Back</h1>

                        <p>
                            Login to continue making an impact.
                        </p>

                    </div>

                    {message && (
                        <div
                            className={
                                message === "Login successful!"
                                    ? "success-message"
                                    : "error-message"
                            }
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    <div className="auth-footer">

                        Don't have an account?{" "}

                        <Link to="/register">
                            Create Account
                        </Link>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Login;