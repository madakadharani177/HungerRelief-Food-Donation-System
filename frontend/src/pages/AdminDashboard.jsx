import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        try {
            const [dashboard, usersData, donationsData] =
                await Promise.all([
                    api.get("/admin/dashboard"),
                    api.get("/admin/users"),
                    api.get("/admin/donations")
                ]);

            setStats(dashboard.data || {});
            setUsers(usersData.data || []);
            setDonations(donationsData.data || []);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />

            <main className="dashboard-page">

                <div className="dashboard-header">
                    <div>
                        <span className="dashboard-label">
                            ADMIN DASHBOARD
                        </span>

                        <h1>System Overview</h1>

                        <p>
                            Monitor HungerRelief users and donations.
                        </p>
                    </div>
                </div>

                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div>
                            <span>Total Users</span>
                            <strong>{stats.totalUsers || 0}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🍱</div>
                        <div>
                            <span>Total Donations</span>
                            <strong>{stats.totalDonations || 0}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🟢</div>
                        <div>
                            <span>Available</span>
                            <strong>{stats.availableDonations || 0}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">❤️</div>
                        <div>
                            <span>Delivered</span>
                            <strong>{stats.deliveredDonations || 0}</strong>
                        </div>
                    </div>

                </section>

                <section className="dashboard-section-header">
                    <div>
                        <span className="section-small-title">
                            USERS
                        </span>
                        <h2>Registered Users</h2>
                    </div>
                </section>

                <div className="donation-table-card">

                    <div className="table-wrapper">

                        <table className="donation-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <strong>{user.name}</strong>
                                        </td>

                                        <td>{user.email}</td>

                                        <td>
                                            <span className="status-badge status-available">
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                <section className="dashboard-section-header admin-second-section">
                    <div>
                        <span className="section-small-title">
                            DONATIONS
                        </span>
                        <h2>All Donations</h2>
                    </div>
                </section>

                <div className="donation-table-card">

                    <div className="table-wrapper">

                        <table className="donation-table">

                            <thead>
                                <tr>
                                    <th>Food</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {donations.map((donation) => (
                                    <tr key={donation.id}>

                                        <td>
                                            <strong>
                                                {donation.foodName}
                                            </strong>
                                        </td>

                                        <td>
                                            {donation.quantity}
                                        </td>

                                        <td>
                                            {donation.pickupLocation}
                                        </td>

                                        <td>
                                            <span
                                                className={`status-badge status-${donation.status?.toLowerCase()}`}
                                            >
                                                {donation.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>
        </>
    );
}

export default AdminDashboard;