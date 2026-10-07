import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function PickupRequests() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [pickups, setPickups] = useState([]);
    const [message, setMessage] = useState("");

    const selectedStatus =
        searchParams.get("status") || "ALL";

    useEffect(() => {
        if (!user || user.role !== "VOLUNTEER") {
            navigate(
                user?.role === "RESTAURANT"
                    ? "/restaurant/dashboard"
                    : user?.role === "NGO"
                    ? "/ngo/dashboard"
                    : user?.role === "ADMIN"
                    ? "/admin/dashboard"
                    : "/login"
            );
            return;
        }

        loadPickups();
    }, []);

    const loadPickups = async () => {

        try {

            const response = await api.get(
                `/volunteers/${user?.id}/pickups`
            );

            setPickups(response.data || []);

        } catch (error) {

            console.error(
                "Unable to load pickup requests:",
                error
            );

        }
    };

    const filteredPickups =
        selectedStatus === "ALL"
            ? pickups
            : pickups.filter(
                  (pickup) =>
                      pickup.status === selectedStatus
              );

    const updateStatus = async (
        pickupId,
        status
    ) => {

        try {

            await api.put(
                `/volunteers/pickup/${pickupId}/status`,
                {
                    status: status
                }
            );

            setMessage(
                `Pickup status updated to ${status}.`
            );

            setTimeout(() => {
                navigate("/volunteer/dashboard");
            }, 800);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Unable to update status."
            );

        }
    };

    const getTitle = () => {

        switch (selectedStatus) {

            case "ACCEPTED":
                return "Accepted Pickups";

            case "PICKED_UP":
                return "Picked Up Donations";

            case "DELIVERED":
                return "Delivered Donations";

            default:
                return "My Pickup Requests";
        }
    };

    if (!user || user.role !== "VOLUNTEER") {
        return null;
    }

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                <div className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            VOLUNTEER
                        </span>

                        <h1>
                            {getTitle()}
                        </h1>

                        <p>
                            Track the donations you have accepted.
                        </p>

                    </div>

                    <button
                        className="dashboard-primary-btn"
                        onClick={() =>
                            navigate(
                                "/volunteer/dashboard"
                            )
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                <div className="donation-table-card">

                    {filteredPickups.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                🚚
                            </div>

                            <h3>
                                No pickup requests
                            </h3>

                            <p>
                                No pickup records are available
                                in this category.
                            </p>

                        </div>

                    ) : (

                        <div className="table-wrapper">

                            <table className="donation-table">

                                <thead>

                                    <tr>
                                        <th>Donation</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredPickups.map(
                                        (pickup) => (

                                            <tr
                                                key={pickup.id}
                                            >

                                                <td>

                                                    <strong>
                                                        {pickup.donation?.foodName ||
                                                            `Donation #${
                                                                pickup.donation?.id ||
                                                                ""
                                                            }`}
                                                    </strong>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`status-badge status-${pickup.status?.toLowerCase()}`}
                                                    >
                                                        {pickup.status}
                                                    </span>

                                                </td>

                                                <td>

                                                    {pickup.status ===
                                                        "ACCEPTED" && (

                                                        <button
                                                            className="small-action-btn"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    pickup.id,
                                                                    "PICKED_UP"
                                                                )
                                                            }
                                                        >
                                                            Mark Picked Up
                                                        </button>

                                                    )}

                                                    {pickup.status ===
                                                        "PICKED_UP" && (

                                                        <button
                                                            className="small-action-btn"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    pickup.id,
                                                                    "DELIVERED"
                                                                )
                                                            }
                                                        >
                                                            Mark Delivered
                                                        </button>

                                                    )}

                                                    {pickup.status ===
                                                        "DELIVERED" && (

                                                        <span className="completed-text">
                                                            Completed ✓
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>
        </>
    );
}

export default PickupRequests;