import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function DonationDetails() {
    const { id } = useParams();

    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDonation();
    }, [id]);

    const loadDonation = async () => {
        try {
            const response = await api.get(`/donations/${id}`);
            setDonation(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="empty-state">
                    Loading donation...
                </div>
            </>
        );
    }

    if (!donation) {
        return (
            <>
                <Navbar />
                <div className="empty-state">
                    <h3>Donation not found</h3>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                <div className="details-card">

                    <div className="details-header">
                        <div>
                            <span className="dashboard-label">
                                DONATION DETAILS
                            </span>

                            <h1>{donation.foodName}</h1>

                            <p>{donation.description}</p>
                        </div>

                        <span
                            className={`status-badge status-${donation.status?.toLowerCase()}`}
                        >
                            {donation.status}
                        </span>
                    </div>

                    <div className="details-grid">

                        <div>
                            <span>Quantity</span>
                            <strong>{donation.quantity}</strong>
                        </div>

                        <div>
                            <span>Food Type</span>
                            <strong>{donation.foodType}</strong>
                        </div>

                        <div>
                            <span>Pickup Location</span>
                            <strong>{donation.pickupLocation}</strong>
                        </div>

                        <div>
                            <span>Pickup Date</span>
                            <strong>{donation.pickupDate}</strong>
                        </div>

                        <div>
                            <span>Pickup Time</span>
                            <strong>{donation.pickupTime}</strong>
                        </div>

                        <div>
                            <span>Expiry Time</span>
                            <strong>{donation.expiryTime}</strong>
                        </div>

                    </div>

                    <Link
                        to="/restaurant/donations"
                        className="cancel-btn"
                    >
                        ← Back to Donations
                    </Link>

                </div>

            </main>
        </>
    );
}

export default DonationDetails;