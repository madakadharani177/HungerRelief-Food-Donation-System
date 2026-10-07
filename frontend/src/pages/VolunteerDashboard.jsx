import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function VolunteerDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [donations, setDonations] = useState([]);
    const [pickups, setPickups] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [
                donationsResponse,
                pickupsResponse
            ] = await Promise.all([

                api.get("/volunteers/donations"),

                api.get(
                    `/volunteers/${user?.id}/pickups`
                )

            ]);

            setDonations(
                donationsResponse.data || []
            );

            setPickups(
                pickupsResponse.data || []
            );

        } catch (error) {

            console.error(
                "Unable to load volunteer data:",
                error
            );

        }
    };

    const acceptPickup = async (
        donationId
    ) => {

        try {

            await api.post(
                `/volunteers/pickup/${donationId}?volunteerId=${user.id}`
            );

            setMessage(
                "Pickup accepted successfully!"
            );

            await loadData();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Unable to accept pickup."
            );

        }
    };

    const acceptedCount = pickups.filter(
        (pickup) =>
            pickup.status === "ACCEPTED"
    ).length;

    const pickedUpCount = pickups.filter(
        (pickup) =>
            pickup.status === "PICKED_UP"
    ).length;

    const deliveredCount = pickups.filter(
        (pickup) =>
            pickup.status === "DELIVERED"
    ).length;

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                {/* HEADER */}

                <div className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            VOLUNTEER DASHBOARD
                        </span>

                        <h1>
                            Welcome,{" "}
                            {user?.name || "Volunteer"}
                        </h1>

                        <p>
                            Find available donations and help
                            deliver food.
                        </p>

                    </div>

                    <button
                        className="dashboard-primary-btn"
                        onClick={() =>
                            navigate(
                                "/volunteer/pickups"
                            )
                        }
                    >
                        My Pickups
                    </button>

                </div>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {/* STATISTICS */}

                <section className="stats-grid">

                    <button
                        className="stat-card"
                        onClick={() =>
                            document
                                .getElementById(
                                    "available-donations"
                                )
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >

                        <div className="stat-icon">
                            🍱
                        </div>

                        <div>

                            <span>
                                Ready for Pickup
                            </span>

                            <strong>
                                {donations.length}
                            </strong>

                        </div>

                    </button>

                    <button
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                "/volunteer/pickups?status=ACCEPTED"
                            )
                        }
                    >

                        <div className="stat-icon">
                            🚚
                        </div>

                        <div>

                            <span>
                                My Pickups
                            </span>

                            <strong>
                                {pickups.length}
                            </strong>

                        </div>

                    </button>

                    <button
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                "/volunteer/pickups?status=PICKED_UP"
                            )
                        }
                    >

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>

                            <span>
                                Picked Up
                            </span>

                            <strong>
                                {pickedUpCount}
                            </strong>

                        </div>

                    </button>

                    <button
                        className="stat-card"
                        onClick={() =>
                            navigate(
                                "/volunteer/pickups?status=DELIVERED"
                            )
                        }
                    >

                        <div className="stat-icon">
                            ❤️
                        </div>

                        <div>

                            <span>
                                Delivered
                            </span>

                            <strong>
                                {deliveredCount}
                            </strong>

                        </div>

                    </button>

                </section>

                {/* AVAILABLE FOOD */}

                <div
                    id="available-donations"
                    className="dashboard-section-header"
                >

                    <div>

                        <span className="section-small-title">
                            AVAILABLE FOOD
                        </span>

                        <h2>
                            Donations Near You
                        </h2>

                    </div>

                </div>

                <div className="volunteer-grid">

                    {donations.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                🍲
                            </div>

                            <h3>
                                No donations available
                            </h3>

                            <p>
                                Check again later for new
                                donations.
                            </p>

                        </div>

                    ) : (

                        donations.map(
                            (donation) => (

                                <div
                                    className="volunteer-donation-card"
                                    key={donation.id}
                                >

                                    <div className="card-top">

                                        <span className="food-card-icon">
                                            🍱
                                        </span>

                                        <span className="status-badge status-accepted">
                                            READY FOR PICKUP
                                        </span>

                                    </div>

                                    <h3>
                                        {donation.foodName}
                                    </h3>

                                    <p>
                                        {donation.description ||
                                            "Food donation requested by an NGO."}
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
                                            acceptPickup(
                                                donation.id
                                            )
                                        }
                                    >
                                        Accept Pickup
                                    </button>

                                </div>

                            )
                        )

                    )}

                </div>

            </main>
        </>
    );
}

export default VolunteerDashboard;