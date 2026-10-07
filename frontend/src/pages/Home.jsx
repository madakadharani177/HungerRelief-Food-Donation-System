import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <section className="hero">
                <div className="hero-container">

                    <div className="hero-content">
                        <div className="hero-badge">
                            Making Every Meal Matter
                        </div>

                        <h1>
                            Share Food.
                            <br />
                            <span>Spread Hope.</span>
                        </h1>

                        <p>
                            HungerRelief connects surplus food from restaurants
                            and communities with volunteers and NGOs to help
                            people in need.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/register" className="primary-btn">
                                Get Started
                            </Link>

                            <Link to="/about" className="secondary-btn">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="hero-card">
                        <div className="food-icon">🍲</div>
                        <h3>Food Should Never Go to Waste</h3>
                        <p>
                            Your extra food can become someone's much-needed meal.
                        </p>

                        <div className="impact-row">
                            <div>
                                <strong>100%</strong>
                                <span>Impact</span>
                            </div>

                            <div>
                                <strong>24/7</strong>
                                <span>Support</span>
                            </div>

                            <div>
                                <strong>∞</strong>
                                <span>Possibilities</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="features">
                <div className="section-heading">
                    <span>HOW IT WORKS</span>
                    <h2>Turning Surplus Into Support</h2>
                    <p>
                        A simple way to connect food donors, volunteers and NGOs.
                    </p>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div className="feature-number">01</div>
                        <h3>Donate Food</h3>
                        <p>
                            Restaurants and food providers can easily report
                            surplus food available for donation.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">02</div>
                        <h3>Volunteer Pickup</h3>
                        <p>
                            Volunteers accept available donations and collect
                            them from the pickup location.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-number">03</div>
                        <h3>Reach People</h3>
                        <p>
                            NGOs receive the food and help distribute it to
                            people who need it.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Home;