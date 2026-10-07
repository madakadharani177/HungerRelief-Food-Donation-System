import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import CreateDonation from "./pages/CreateDonation";
import DonationDetails from "./pages/DonationDetails";
import MyDonations from "./pages/MyDonations";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import PickupRequests from "./pages/PickupRequests";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
                <Route path="/restaurant/create-donation" element={<CreateDonation />} />
                <Route path="/restaurant/donations" element={<MyDonations />} />

                <Route path="/donation/:id" element={<DonationDetails />} />

                <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
                <Route path="/volunteer/pickups" element={<PickupRequests />} />

                <Route path="/ngo/dashboard" element={<NgoDashboard />} />

                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;