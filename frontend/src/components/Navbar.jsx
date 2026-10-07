import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-container">

                <Link to="/" className="logo">
                    <span className="logo-icon">♥</span>
                    HungerRelief
                </Link>

                <div className="nav-links">

                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>

                    {user ? (
                        <div className="profile-menu">

                            <Link
                                to="/profile"
                                className="profile-mini"
                            >
                                <span className="profile-mini-avatar">
                                    {user.name?.charAt(0)?.toUpperCase()}
                                </span>

                                <span className="profile-mini-name">
                                    {user.name}
                                </span>
                            </Link>

                            <button
                                className="mini-logout"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="nav-login"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-register"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;