# Airbnb Clone

This is a full-stack pet project that replicates key functionalities of Airbnb, allowing users to browse, search, and view rental listings. Built to showcase skills relevant for a Junior Developer position.

## Live Demo  
[GitHub Pages Deployment](https://aliisherka.github.io/airbnb/)

## Features  
- **Property Listings**: View a collection of rental properties with images, descriptions, and pricing.  
- **Search & Filtering**: Find properties based on city and country. Currently, search validation is limited to Almaty (Kazakhstan) and Czechia due to the availability of listings.  
- **User Authentication**: Registration and login with **JWT-based** authentication. 
- **Multi-language Support**: Available in English, Russian, and Czech. 
- **Responsive Design**: Fully adapted for both desktop and mobile, including swipe gestures on mobile.
- **Interactive UI**: Users can open property details and browse listings smoothly using a card carousel.
- **UX Enhancements**: Visual loading indicator when backend is idle (Render cold start).

## Backend Integration  
This project fetches data from a backend server hosted on **Render.com**, which is built with **MongoDB**, **Express**, and **Node.js**.  
- **Property Listings and User Data**: Stored in **MongoDB Atlas**.  
- **Images**: Hosted on **Cloudinary** for better performance and scalability.

## Known Issues  
- **Server delay**: Since the backend is hosted on Render, there may be a delay of up to 50 seconds for loading property listings if the server is idle.

## Technologies Used  
- **Frontend**: HTML, CSS, JavaScript, React, TypeScript  
- **Styling**: Sass  
- **Deployment**: GitHub Pages

## Installation & Usage  
1. Clone the repository:  
   ```sh  
   git clone https://github.com/Aliisherka/airbnb.git
   ```
2. Navigate to the project directory:  
   ```sh  
   cd airbnb
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the project locally:
   ```sh
   npm start
   ```
5.	Open http://localhost:3000/ in your browser.

## Future Improvements  
- Improve filtering (e.g., by price, number of guests, etc.) 
- Refine the property card page, as it is not fully developed yet.  
- Allow users to add their own property listings.

## Contact  
For any questions or suggestions, feel free to reach out via GitHub issues or pull requests.
