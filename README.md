# Airbnb Clone

This is a pet project that replicates key functionalities of Airbnb, allowing users to browse, search, and view rental listings.

## Live Demo  
[GitHub Pages Deployment](https://aliisherka.github.io/airbnb/)

## Features  
- **Property Listings**: View a collection of rental properties with images, descriptions, and pricing.  
- **Search & Filtering**: Find properties based on city and country. Currently, search validation is limited to Almaty (Kazakhstan) and Czechia due to the availability of listings.  
- **User Authentication**: Users can register and log in to their accounts.  
- **Multi-language Support**: The application supports 3 languages for a broader user base.  
- **Responsive Design**: Optimized for desktop. Mobile version is still in development.  
- **Interactive UI**: Users can open property details and browse listings smoothly using a card carousel.

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
- Mobile version  
- Refine the property card page, as it is not fully developed yet.  
- Allow users to add their own property listings.

## Contact  
For any questions or suggestions, feel free to reach out via GitHub issues or pull requests.
