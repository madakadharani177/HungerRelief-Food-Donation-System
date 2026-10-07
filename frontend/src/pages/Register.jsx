import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "RESTAURANT",
        restaurantName: "",
        ngoName: "",
        address: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");
        setLoading(true);

        try {
            const data = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: formData.role
            };

            // Restaurant details
            if (formData.role === "RESTAURANT") {
                data.restaurantName = formData.restaurantName;
                data.address = formData.address;
            }

            // NGO details
            if (formData.role === "NGO") {
                data.ngoName = formData.ngoName;
                data.address = formData.address;
            }

            const response = await api.post(
                "/auth/register",
                data
            );

            console.log(
                "Registration response:",
                response.data
            );

            setLoading(false);

            setMessage(
                "Account created successfully! Please login to continue."
            );

            setMessageType("success");

            // Automatically go to Login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setLoading(false);

            const errorMessage =
                error.response?.data?.message ||
                "Something went wrong. Please try again.";

            setMessage(errorMessage);
            setMessageType("error");
        }
    };

    const closeMessage = () => {
        setMessage("");
        setMessageType("");

        if (messageType === "success") {
            navigate("/login");
        }
    };

    return (
        <>
            <Navbar />

            <main className="auth-page">

                <div className="auth-card register-card">

                    {/* HEADER */}

                    <div className="auth-header">

                        <div className="auth-icon">
                            ♥
                        </div>

                        <h1>Create Account</h1>

                        <p>
                            Join HungerRelief and make a difference.
                        </p>

                    </div>


                    {/* SUCCESS / ERROR MESSAGE */}

                    {message && (
                        <div
                            className={
                                messageType === "success"
                                    ? "form-message success-form-message"
                                    : "form-message error-form-message"
                            }
                        >

                            <div className="form-message-icon">
                                {messageType === "success"
                                    ? "✓"
                                    : "!"}
                            </div>


                            <div className="form-message-content">

                                <strong>
                                    {messageType === "success"
                                        ? "Registration Successful"
                                        : "Registration Failed"}
                                </strong>

                                <p>
                                    {message}
                                </p>

                                {messageType === "success" && (
                                    <small>
                                        Redirecting to login...
                                    </small>
                                )}

                            </div>


                            <button
                                type="button"
                                className="form-message-close"
                                onClick={closeMessage}
                            >
                                ×
                            </button>

                        </div>
                    )}


                    {/* FORM */}

                    <form onSubmit={handleRegister}>

                        {/* FULL NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
                                required
                            />

                        </div>


                        {/* PHONE */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* ROLE */}

                        <div className="form-group">

                            <label>
                                Register As
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >

                                <option value="RESTAURANT">
                                    Restaurant
                                </option>

                                <option value="VOLUNTEER">
                                    Volunteer
                                </option>

                                <option value="NGO">
                                    NGO
                                </option>

                            </select>

                        </div>


                        {/* RESTAURANT FIELDS */}

                        {formData.role === "RESTAURANT" && (
                            <>
                                <div className="form-group">

                                    <label>
                                        Restaurant Name
                                    </label>

                                    <input
                                        type="text"
                                        name="restaurantName"
                                        placeholder="Enter restaurant name"
                                        value={formData.restaurantName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Restaurant Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Enter restaurant address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </>
                        )}


                        {/* NGO FIELDS */}

                        {formData.role === "NGO" && (
                            <>
                                <div className="form-group">

                                    <label>
                                        NGO Name
                                    </label>

                                    <input
                                        type="text"
                                        name="ngoName"
                                        placeholder="Enter NGO name"
                                        value={formData.ngoName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        NGO Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Enter NGO address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                            </>
                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>


                    {/* LOGIN */}

                    <div className="auth-footer">

                        Already have an account?{" "}

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Register;