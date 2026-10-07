# 🍲 HungerRelief – Food Donation & Distribution Management System

HungerRelief is a full-stack food donation and distribution management system designed to connect restaurants, NGOs, and volunteers to reduce food waste and help communities in need.

The platform allows restaurants to create food donations, NGOs to request available donations, and volunteers to coordinate food pickup and delivery. It also provides role-based dashboards for managing and monitoring the donation process.

---

## 🎯 Project Objective

Every day, restaurants, hotels, canteens, and other food providers may have surplus food that could be useful to people in need.

HungerRelief provides a simple digital platform to manage this process by connecting:

- 🍽️ Restaurants providing surplus food
- 🤝 NGOs receiving food donations
- 🚚 Volunteers handling pickup and delivery
- 🛠️ Administrators monitoring the platform

The main goal is to reduce food wastage and make food donation and distribution easier to manage.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Logout
- Role-based access
- BCrypt password encryption
- Role-specific registration fields
- Login validation
- Duplicate email handling

### 🍽️ Restaurant

Restaurants can:

- Create food donations
- View their donations
- View donation details
- Track donation status
- View available donations
- View accepted donations
- View picked-up donations
- View delivered donations
- Manage their profile

### 🤝 NGO

NGOs can:

- View available food donations
- View donation details
- Accept/request available donations
- Track accepted donation requests
- Monitor donation progress

### 🚚 Volunteer

Volunteers can:

- View donations requested by NGOs
- Accept pickup assignments
- View their pickup requests
- Mark food as picked up
- Mark food as delivered
- Track completed deliveries

### 👨‍💼 Admin

Administrators can:

- View users
- View restaurants
- View volunteers
- View NGOs
- View donations
- Monitor donation status
- View dashboard statistics
- Manage platform records

---

## 🔄 Donation Workflow

The main donation workflow is:

```text
Restaurant
    ↓
Create Donation
    ↓
AVAILABLE
    ↓
NGO accepts/request donation
    ↓
ACCEPTED
    ↓
Volunteer accepts pickup
    ↓
Volunteer picks up food
    ↓
PICKED_UP
    ↓
Volunteer delivers food to NGO
    ↓
DELIVERED
