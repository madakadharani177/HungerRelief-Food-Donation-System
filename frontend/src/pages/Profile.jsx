import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const goToDashboard = () => {
        if (user?.role === "RESTAURANT") {
            navigate("/restaurant/dashboard");
        } else if (user?.role === "VOLUNTEER") {
            navigate("/volunteer/dashboard");
        } else if (user?.role === "NGO") {
            navigate("/ngo/dashboard");
        } else if (user?.role === "ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />

                <div className="empty-state">
                    <h2>Please login first</h2>

                    <button
                        className="dashboard-primary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="profile-page">

                <div className="profile-card">

                    {/* Back Button */}
                    <button
                        className="profile-back-btn"
                        onClick={goToDashboard}
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="profile-top">

                        <div className="profile-avatar">
                            {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                            <span className="dashboard-label">
                                MY PROFILE
                            </span>

                            <h1>{user.name}</h1>

                            <p>
                                HungerRelief account
                            </p>
                        </div>

                    </div>

                    <div className="profile-details">

                        <div className="profile-item">
                            <span>Full Name</span>
                            <strong>{user.name}</strong>
                        </div>

                        <div className="profile-item">
                            <span>Email Address</span>
                            <strong>{user.email}</strong>
                        </div>

                        <div className="profile-item">
                            <span>Role</span>
                            <strong>{user.role}</strong>
                        </div>

                        <div className="profile-item">
                            <span>User ID</span>
                            <strong>#{user.id}</strong>
                        </div>

                    </div>

                    <div className="profile-actions">

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Profile;