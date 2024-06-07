# Smart Brain

The "Smart Brain" project is an advanced web application built with ReactJS that utilizes a face detection API to provide users with an engaging and interactive experience. The application allows users to upload images and detect faces within those images. This project demonstrates my skills in integrating third-party APIs and creating a user-friendly interface.

## Project Overview

### Technologies Used
- **ReactJS**: For building the user interface and managing the application state.
- **Node.js**: For creating the backend server to handle API requests.
- **Express**: To manage routing and middleware on the server-side.
- **Clarifai API**: For face detection capabilities.
- **PostgreSQL**: For user authentication and storing user data.
- **CSS**: For styling the application and ensuring it is responsive.

### Features

#### Face Detection
- Users can upload an image, and the application detects faces within the image using the Clarifai API.
- The detected faces are highlighted with bounding boxes, providing a visual representation of the results.

#### User Authentication
- Users can register for an account and log in to access the face detection feature.
- Authentication is handled using a secure backend with PostgreSQL for storing user credentials and session management.

### Design and Responsiveness
- The application features a clean, modern design that is both intuitive and visually appealing.
- Fully responsive layout that adapts seamlessly to different screen sizes, from desktops to smartphones.

## Key Components

### Image Upload
- An input field where users can enter the URL of an image or upload an image file from their device.
- The uploaded image is displayed in the interface, ready for face detection.

### Face Detection Display
- The application highlights detected faces with bounding boxes on the uploaded image.
- Provides immediate visual feedback to the user.

### User Authentication Forms
- Registration and login forms for user authentication.
