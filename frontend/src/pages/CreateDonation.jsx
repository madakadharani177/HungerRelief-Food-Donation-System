import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CreateDonation() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [formData, setFormData] = useState({
        restaurantId: user?.id || "",
        foodName: "",
        description: "",
        quantity: "",
        foodType: "",
        pickupLocation: "",
        pickupDate: "",
        pickupTime: "",
        expiryTime: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (Number(formData.quantity) <= 0) {
            setError("Quantity must be greater than zero.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/donations", {
                ...formData,
                restaurantId: Number(formData.restaurantId),
                quantity: Number(formData.quantity)
            });

            setSuccess("Donation created successfully!");

            setTimeout(() => {
                navigate("/restaurant/donations");
            }, 1000);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to create donation."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="form-page">
                <div className="form-card">

                    <div className="form-header">
                        <span>FOOD DONATION</span>
                        <h1>Create a Donation</h1>
                        <p>
                            Share surplus food and help someone in need.
                        </p>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form onSubmit={handleSubmit}>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Food Name</label>
                                <input
                                    name="foodName"
                                    value={formData.foodName}
                                    onChange={handleChange}
                                    placeholder="Example: Vegetable Biryani"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Food Type</label>
                                <select
                                    name="foodType"
                                    value={formData.foodType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option>Vegetarian</option>
                                    <option>Non-Vegetarian</option>
                                    <option>Vegan</option>
                                    <option>Bakery</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the food..."
                                rows="4"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="Number of servings"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Pickup Location</label>
                                <input
                                    name="pickupLocation"
                                    value={formData.pickupLocation}
                                    onChange={handleChange}
                                    placeholder="Pickup address"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Pickup Date</label>
                                <input
                                    type="date"
                                    name="pickupDate"
                                    value={formData.pickupDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Pickup Time</label>
                                <input
                                    type="time"
                                    name="pickupTime"
                                    value={formData.pickupTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Expiry Time</label>
                            <input
                                type="time"
                                name="expiryTime"
                                value={formData.expiryTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <Link
                                to="/restaurant/dashboard"
                                className="cancel-btn"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="dashboard-primary-btn"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Donation"}
                            </button>
                        </div>

                    </form>
                </div>
            </main>
        </>
    );
}

export default CreateDonation;