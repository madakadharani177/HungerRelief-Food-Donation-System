import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyDonations() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    const selectedStatus =
        searchParams.get("status")?.toUpperCase() || null;

    useEffect(() => {

        if (!user || user.role !== "RESTAURANT") {

            navigate(
                user?.role === "NGO"
                    ? "/ngo/dashboard"
                    : user?.role === "VOLUNTEER"
                    ? "/volunteer/dashboard"
                    : user?.role === "ADMIN"
                    ? "/admin/dashboard"
                    : "/login"
            );

            return;
        }

        loadDonations();

    }, [selectedStatus]);

    const loadDonations = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/donations");

            const allDonations =
                response.data || [];

            /*
             * First identify donations belonging
             * to the logged-in restaurant.
             */
            const myDonations = allDonations.filter(
                (donation) => {

                    const restaurantUserId =
                        donation.restaurant?.user?.id;

                    return (
                        restaurantUserId != null &&
                        String(restaurantUserId) ===
                        String(user.id)
                    );
                }
            );

            /*
             * Then apply status filter.
             */
            const filteredDonations =
                selectedStatus
                    ? myDonations.filter(
                        (donation) =>
                            String(
                                donation.status || ""
                            ).toUpperCase() ===
                            selectedStatus
                    )
                    : myDonations;

            console.log(
                "All donations:",
                allDonations
            );

            console.log(
                "My donations:",
                myDonations
            );

            console.log(
                "Selected status:",
                selectedStatus
            );

            console.log(
                "Filtered donations:",
                filteredDonations
            );

            setDonations(
                filteredDonations
            );

        } catch (error) {

            console.error(
                "Error loading donations:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const goToDashboard = () => {
        navigate("/restaurant/dashboard");
    };

    const showAll = () => {
        navigate("/restaurant/donations");
    };

    const getTitle = () => {

        switch (selectedStatus) {

            case "AVAILABLE":
                return "Available Donations";

            case "ACCEPTED":
                return "Accepted Donations";

            case "PICKED_UP":
                return "Picked Up Donations";

            case "DELIVERED":
                return "Delivered Donations";

            case "CANCELLED":
                return "Cancelled Donations";

            default:
                return "My Donations";
        }
    };

    if (!user || user.role !== "RESTAURANT") {
        return null;
    }

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                <div className="dashboard-container">

                    {/* HEADER */}

                    <div className="dashboard-top">

                        <div>

                            <span className="dashboard-label">
                                RESTAURANT
                            </span>

                            <h1>
                                {getTitle()}
                            </h1>

                            <p>
                                View and manage your food donations.
                            </p>

                        </div>

                        {/* Only show Create Donation
                            on the main page */}

                        {!selectedStatus && (

                            <button
                                className="dashboard-primary-btn"
                                onClick={() =>
                                    navigate(
                                        "/restaurant/create-donation"
                                    )
                                }
                            >
                                + Create Donation
                            </button>

                        )}

                    </div>

                    {/* BACK TO DASHBOARD */}

                    <button
                        className="profile-back-btn"
                        onClick={goToDashboard}
                    >
                        ← Back to Dashboard
                    </button>

                    {/* FILTER BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            margin: "20px 0",
                            flexWrap: "wrap"
                        }}
                    >

                        <button
                            className="table-view-btn"
                            onClick={showAll}
                        >
                            All
                        </button>

                        <button
                            className="table-view-btn"
                            onClick={() =>
                                navigate(
                                    "/restaurant/donations?status=AVAILABLE"
                                )
                            }
                        >
                            Available
                        </button>

                        <button
                            className="table-view-btn"
                            onClick={() =>
                                navigate(
                                    "/restaurant/donations?status=ACCEPTED"
                                )
                            }
                        >
                            Accepted
                        </button>

                        <button
                            className="table-view-btn"
                            onClick={() =>
                                navigate(
                                    "/restaurant/donations?status=PICKED_UP"
                                )
                            }
                        >
                            Picked Up
                        </button>

                        <button
                            className="table-view-btn"
                            onClick={() =>
                                navigate(
                                    "/restaurant/donations?status=DELIVERED"
                                )
                            }
                        >
                            Delivered
                        </button>

                    </div>

                    {/* DONATIONS */}

                    <div className="dashboard-card">

                        {loading ? (

                            <div className="empty-state">

                                <p>
                                    Loading donations...
                                </p>

                            </div>

                        ) : donations.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    🍲
                                </div>

                                <h3>
                                    No Donations Found
                                </h3>

                                <p>

                                    {selectedStatus
                                        ? `You have no ${selectedStatus
                                            .toLowerCase()
                                            .replace("_", " ")} donations.`
                                        : "You have not created any food donations."
                                    }

                                </p>

                                {selectedStatus && (

                                    <button
                                        className="dashboard-primary-btn"
                                        onClick={showAll}
                                    >
                                        View All Donations
                                    </button>

                                )}

                            </div>

                        ) : (

                            <div className="donation-table-wrapper">

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
                                                Location
                                            </th>

                                            <th>
                                                Date
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

                                        {donations.map(
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

                                                        <span className="table-subtext">
                                                            {
                                                                donation.foodType
                                                            }
                                                        </span>

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
                                                            className={`status-badge status-${String(
                                                                donation.status || ""
                                                            ).toLowerCase()}`}
                                                        >
                                                            {
                                                                donation.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="table-view-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/donation/${donation.id}`
                                                                )
                                                            }
                                                        >
                                                            View
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

                </div>

            </main>
        </>
    );
}

export default MyDonations;