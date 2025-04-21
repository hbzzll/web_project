# Renting System and Location Query Project

## Project Structure

### Frontend

The frontend is developed using **React** with **TypeScript**, incorporating **Redux Toolkit** for efficient state management. It allows users to:

- Browse, search, and filter rental listings
- View house details with text and 3D model support
- Contact landlords and manage favorite listings
- Publish and manage their own properties

It also features an interactive 3D viewing experience built with **Three.js** for property interiors.

### Backend

The backend is built using **Node.js** with the **Express** framework. It handles:

- User authentication and authorization
- Data querying and property management
- Communication with the **MongoDB** database
- API services for user and admin operations

---

## Technologies Used

### Frontend

- **Framework:** React + TypeScript
- **3D Rendering:** Three.js
- **State Management:** Redux Toolkit
- **Styling:** SCSS + Responsive CSS

### Backend

- **Framework:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JWT-based token system
- **File Handling:** Image and model uploads

---

## Main Features

### User Features

- Register and log in securely
- Search/filter housing listings
- View detailed property information
- View interior space with 3D models
- Add listings to personal favorites
- Contact property owners

### Landlord Features

- Publish rental properties
- Upload property images and models
- Manage property listings

### Admin Features

- Approve, edit, or remove listings
- Moderate published content

---

## Extra Notes

- Each property is connected with a detailed location and map
- 3D models enhance visualization of room layouts
- Profile system allows user information and avatars to be updated
- Redux and `localStorage` are used together to persist essential auth data
