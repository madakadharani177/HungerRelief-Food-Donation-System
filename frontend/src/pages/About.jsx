import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function About() {
    return (
        <>
            <Navbar />

            <section className="about-hero">
                <div className="about-container">

                    <div className="about-content">
                        <span className="section-label">ABOUT HUNGERRELIEF</span>

                        <h1>
                            Technology with a
                            <span> Purpose.</span>
                        </h1>

                        <p>
                            HungerRelief is a food donation and distribution
                            management system designed to reduce food waste
                            and connect surplus food with people in need.
                        </p>

                        <p>
                            Restaurants and individuals can donate surplus food,
                            volunteers can coordinate pickups, and NGOs can
                            manage distribution efficiently.
                        </p>

                        <Link to="/register" className="primary-btn">
                            Join HungerRelief
                        </Link>
                    </div>

                    <div className="about-card">
                        <div className="about-icon">♥</div>
                        <h2>Our Mission</h2>
                        <p>
                            Reduce food waste. Connect communities. Create impact.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}

export default About;