import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function RestaurantDashboard() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const restaurantName =
        storedUser?.name || "Restaurant";

    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {

        try {

            const response =
                await api.get("/donations");

            const allDonations =
                response.data || [];

            /*
             * IMPORTANT:
             * Only keep donations belonging
             * to the currently logged-in restaurant.
             */
            const myDonations =
                allDonations.filter(
                    (donation) => {

                        const restaurantUserId =
                            donation.restaurant?.user?.id;

                        return (
                            restaurantUserId != null &&
                            String(restaurantUserId) ===
                            String(storedUser?.id)
                        );
                    }
                );

            setDonations(myDonations);

        } catch (error) {

            console.error(
                "Unable to load donations:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    /*
     * These statistics are now calculated
     * ONLY from this restaurant's donations.
     */

    const available =
        donations.filter(
            (donation) =>
                donation.status === "AVAILABLE"
        ).length;

    const accepted =
        donations.filter(
            (donation) =>
                donation.status === "ACCEPTED"
        ).length;

    const delivered =
        donations.filter(
            (donation) =>
                donation.status === "DELIVERED"
        ).length;

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                {/* HEADER */}

                <section className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            RESTAURANT DASHBOARD
                        </span>

                        <h1>
                            Welcome, {restaurantName}
                        </h1>

                        <p>
                            Manage your food donations and help make
                            every meal matter.
                        </p>

                    </div>

                    <Link
                        to="/restaurant/create-donation"
                        className="dashboard-primary-btn"
                    >
                        + Create Donation
                    </Link>

                </section>


                {/* STATISTICS */}

                <section className="stats-grid">

                    {/* TOTAL */}

                    <Link
                        to="/restaurant/donations"
                        className="stat-card"
                    >

                        <div className="stat-icon">
                            🍱
                        </div>

                        <div>

                            <span>
                                Total Donations
                            </span>

                            <strong>
                                {donations.length}
                            </strong>

                        </div>

                    </Link>


                    {/* AVAILABLE */}

                    <Link
                        to="/restaurant/donations?status=AVAILABLE"
                        className="stat-card"
                    >

                        <div className="stat-icon">
                            🟢
                        </div>

                        <div>

                            <span>
                                Available
                            </span>

                            <strong>
                                {available}
                            </strong>

                        </div>

                    </Link>


                    {/* ACCEPTED */}

                    <Link
                        to="/restaurant/donations?status=ACCEPTED"
                        className="stat-card"
                    >

                        <div className="stat-icon">
                            🚚
                        </div>

                        <div>

                            <span>
                                Accepted
                            </span>

                            <strong>
                                {accepted}
                            </strong>

                        </div>

                    </Link>


                    {/* DELIVERED */}

                    <Link
                        to="/restaurant/donations?status=DELIVERED"
                        className="stat-card"
                    >

                        <div className="stat-icon">
                            ❤️
                        </div>

                        <div>

                            <span>
                                Delivered
                            </span>

                            <strong>
                                {delivered}
                            </strong>

                        </div>

                    </Link>

                </section>


                {/* QUICK ACTIONS */}

                <section className="dashboard-content">

                    <div className="dashboard-section-header">

                        <div>

                            <span className="section-small-title">
                                QUICK ACTIONS
                            </span>

                            <h2>
                                Manage Your Donations
                            </h2>

                        </div>

                    </div>


                    <div className="quick-actions">

                        {/* CREATE */}

                        <Link
                            to="/restaurant/create-donation"
                            className="quick-card"
                        >

                            <div className="quick-icon">
                                +
                            </div>

                            <div>

                                <h3>
                                    Create Donation
                                </h3>

                                <p>
                                    Report surplus food that can
                                    help people in need.
                                </p>

                            </div>

                        </Link>


                        {/* MY DONATIONS */}

                        <Link
                            to="/restaurant/donations"
                            className="quick-card"
                        >

                            <div className="quick-icon">
                                📋
                            </div>

                            <div>

                                <h3>
                                    My Donations
                                </h3>

                                <p>
                                    View and manage your submitted
                                    food donations.
                                </p>

                            </div>

                        </Link>


                        {/* PROFILE */}

                        <Link
                            to="/profile"
                            className="quick-card"
                        >

                            <div className="quick-icon">
                                👤
                            </div>

                            <div>

                                <h3>
                                    My Profile
                                </h3>

                                <p>
                                    View and manage your account
                                    information.
                                </p>

                            </div>

                        </Link>

                    </div>

                </section>


                {/* RECENT DONATIONS */}

                <section className="donations-section">

                    <div className="dashboard-section-header">

                        <div>

                            <span className="section-small-title">
                                DONATIONS
                            </span>

                            <h2>
                                Recent Donations
                            </h2>

                        </div>

                        <Link
                            to="/restaurant/donations"
                            className="view-all-link"
                        >
                            View All →
                        </Link>

                    </div>


                    <div className="donation-table-card">

                        {loading ? (

                            <div className="empty-state">
                                Loading donations...
                            </div>

                        ) : donations.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    🍲
                                </div>

                                <h3>
                                    No donations yet
                                </h3>

                                <p>
                                    Create your first donation and
                                    start making an impact.
                                </p>

                                <Link
                                    to="/restaurant/create-donation"
                                    className="dashboard-primary-btn"
                                >
                                    Create Donation
                                </Link>

                            </div>

                        ) : (

                            <div className="table-wrapper">

                                <table className="donation-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Food
                                            </th>

                                            <th>
                                                Quantity
                                            </th>

                                            <th>
                                                Pickup Location
                                            </th>

                                            <th>
                                                Pickup Date
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {donations
                                            .slice()
                                            .reverse()
                                            .slice(0, 5)
                                            .map(
                                                (donation) => (

                                                    <tr
                                                        key={
                                                            donation.id
                                                        }
                                                    >

                                                        <td>

                                                            <strong>
                                                                {
                                                                    donation.foodName
                                                                }
                                                            </strong>

                                                            <small>
                                                                {
                                                                    donation.foodType
                                                                }
                                                            </small>

                                                        </td>


                                                        <td>
                                                            {
                                                                donation.quantity
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                donation.pickupLocation
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                donation.pickupDate
                                                            }
                                                        </td>


                                                        <td>

                                                            <span
                                                                className={`status-badge status-${donation.status?.toLowerCase()}`}
                                                            >
                                                                {
                                                                    donation.status
                                                                }
                                                            </span>

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

export default RestaurantDashboard;