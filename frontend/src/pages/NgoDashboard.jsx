import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function NgoDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNgoData();
    }, []);

    const loadNgoData = async () => {

        try {

            const [
                donationsResponse,
                requestsResponse
            ] = await Promise.all([

                api.get("/ngos/donations"),

                api.get(
                    `/ngos/${user?.id}/requests`
                )

            ]);

            setDonations(
                donationsResponse.data || []
            );

            setRequests(
                requestsResponse.data || []
            );

        } catch (error) {

            console.error(
                "Unable to load NGO data:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to load NGO information."
            );

        } finally {

            setLoading(false);

        }
    };

    const acceptDonation = async (
        donationId
    ) => {

        try {

            setMessage("");

            await api.post(
                `/ngos/accept/${donationId}?ngoId=${user.id}`
            );

            setMessage(
                "Donation accepted successfully!"
            );

            await loadNgoData();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Unable to accept donation."
            );

        }
    };

    const scrollToAvailable = () => {

        document
            .getElementById(
                "available-donations"
            )
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    const scrollToRequests = () => {

        document
            .getElementById(
                "my-requests"
            )
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                {/* HEADER */}

                <section className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            NGO DASHBOARD
                        </span>

                        <h1>
                            Welcome,{" "}
                            {user?.name || "NGO"}
                        </h1>

                        <p>
                            Receive surplus food and help
                            distribute it to people who need it.
                        </p>

                    </div>

                    <button
                        className="dashboard-primary-btn"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        My Profile
                    </button>

                </section>

                {/* MESSAGE */}

                {message && (

                    <div
                        className={
                            message.includes(
                                "successfully"
                            )
                                ? "success-message"
                                : "error-message"
                        }
                    >
                        {message}
                    </div>

                )}

                {/* STATISTICS */}

                <section className="stats-grid">

                    <button
                        className="stat-card"
                        onClick={scrollToAvailable}
                    >

                        <div className="stat-icon">
                            🍱
                        </div>

                        <div>

                            <span>
                                Available Donations
                            </span>

                            <strong>
                                {donations.length}
                            </strong>

                        </div>

                    </button>

                    <button
                        className="stat-card"
                        onClick={scrollToRequests}
                    >

                        <div className="stat-icon">
                            🤝
                        </div>

                        <div>

                            <span>
                                My Requests
                            </span>

                            <strong>
                                {requests.length}
                            </strong>

                        </div>

                    </button>

                    <button
                        className="stat-card"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >

                        <div className="stat-icon">
                            ❤️
                        </div>

                        <div>

                            <span>
                                Support
                            </span>

                            <strong>
                                Food Relief
                            </strong>

                        </div>

                    </button>

                </section>

                {/* AVAILABLE DONATIONS */}

                <section
                    id="available-donations"
                >

                    <div className="dashboard-section-header">

                        <div>

                            <span className="section-small-title">
                                FOOD SUPPORT
                            </span>

                            <h2>
                                Available Donations
                            </h2>

                        </div>

                    </div>

                    {loading ? (

                        <div className="empty-state">
                            Loading donations...
                        </div>

                    ) : donations.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                ❤️
                            </div>

                            <h3>
                                No donations available
                            </h3>

                            <p>
                                New food donations will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="volunteer-grid">

                            {donations.map(
                                (donation) => (

                                    <div
                                        className="volunteer-donation-card"
                                        key={donation.id}
                                    >

                                        <div className="card-top">

                                            <span className="food-card-icon">
                                                🍲
                                            </span>

                                            <span className="status-badge status-available">
                                                AVAILABLE
                                            </span>

                                        </div>

                                        <h3>
                                            {
                                                donation.foodName
                                            }
                                        </h3>

                                        <p>
                                            {
                                                donation.description ||
                                                "Surplus food available for distribution."
                                            }
                                        </p>

                                        <div className="food-info">

                                            <span>
                                                📦{" "}
                                                {
                                                    donation.quantity
                                                }{" "}
                                                servings
                                            </span>

                                            <span>
                                                🍽️{" "}
                                                {
                                                    donation.foodType
                                                }
                                            </span>

                                            <span>
                                                📍{" "}
                                                {
                                                    donation.pickupLocation
                                                }
                                            </span>

                                            <span>
                                                📅{" "}
                                                {
                                                    donation.pickupDate
                                                }
                                            </span>

                                        </div>

                                        <button
                                            className="dashboard-primary-btn full-btn"
                                            onClick={() =>
                                                acceptDonation(
                                                    donation.id
                                                )
                                            }
                                        >
                                            Accept Donation
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

                {/* MY REQUESTS */}

                <section
                    id="my-requests"
                    className="ngo-requests-section"
                >

                    <div className="dashboard-section-header">

                        <div>

                            <span className="section-small-title">
                                MY ACTIVITY
                            </span>

                            <h2>
                                My Accepted Donations
                            </h2>

                        </div>

                    </div>

                    <div className="donation-table-card">

                        {requests.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    📋
                                </div>

                                <h3>
                                    No accepted donations yet
                                </h3>

                                <p>
                                    Accept an available donation
                                    to see it here.
                                </p>

                            </div>

                        ) : (

                            <div className="table-wrapper">

                                <table className="donation-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Donation
                                            </th>

                                            <th>
                                                Food
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {requests.map(
                                            (request) => (

                                                <tr
                                                    key={
                                                        request.id
                                                    }
                                                >

                                                    <td>
                                                        #
                                                        {
                                                            request.id
                                                        }
                                                    </td>

                                                    <td>

                                                        <strong>
                                                            {
                                                                request
                                                                    .donation
                                                                    ?.foodName ||
                                                                "Food Donation"
                                                            }
                                                        </strong>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`status-badge status-${request.status?.toLowerCase()}`}
                                                        >
                                                            {
                                                                request.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="small-action-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/donation/${request.donation?.id}`
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </section>

            </main>
        </>
    );
}

export default NgoDashboard;