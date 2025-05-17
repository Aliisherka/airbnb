# Airbnb Clone

This is a full-stack pet project that replicates key functionalities of Airbnb, allowing users to browse, search, and view rental listings. Built to showcase skills relevant for a Junior Developer position.

## Live Demo  
[GitHub Pages Deployment](https://aliisherka.github.io/airbnb/)

## Features  
- **Property Listings**: View a collection of rental properties with images, descriptions, and pricing.  
- **Advanced Search & Filtering**:  
  - Search by **country** and **city**  
  - Filter by **available dates** (calendar)
  - Filter by **number of guests**, **children**, **infants**, and **pets**Czechia due to the availability of listings.  
- **User Authentication**: Registration and login with **JWT-based** authentication. 
- **Multi-language Support**: Available in English, Russian, and Czech. 
- **Responsive Design**: Fully adapted for both desktop and mobile, including swipe gestures on mobile.
- **Interactive UI**: Users can open property details and browse listings smoothly using a card carousel.
- **UX Enhancements**: Visual loading indicator when backend is idle (Render cold start).
- **CI/CD Integration**:  
  - Automated testing pipeline runs on **push** and **pull request**  
  - Includes **unit tests**, **integration tests**, and **end-to-end (E2E) tests**  
  - Automatic **deployment to GitHub Pages** on successful builds

## Backend Integration  
This project fetches data from a backend server hosted on **Render.com**, which is built with **MongoDB**, **Express**, and **Node.js**.  
- **Property Listings and User Data**: Stored in **MongoDB Atlas**.  
- **Images**: Hosted on **Cloudinary** for better performance and scalability.

## Known Issues  
- **Server delay**: Since the backend is hosted on Render, there may be a delay of up to 50 seconds for loading property listings if the server is idle.

## Technologies Used  
- **Frontend**: HTML, CSS, JavaScript, React, TypeScript  
- **Styling**: Sass
- **Testing**: Vitest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions (tests + deployment pipeline) 
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
   npm run dev
   ```
5.	Open http://localhost:5173/ in your browser.

## Future Improvements  
- **Improve mobile search form**: Extend functionality by adding filtering by dates and number of guests. Currently, it only submits country/city.
- **User-linked listings**: Bind property listings to the user who created them for future edit/delete features.
- **Enhance property cards on homepage**: Show price, date range, and brief description directly on each card.
- **Allow users to create listings**: Build a UI to let authenticated users submit new properties.
- **Add price filtering**: Extend existing search filters with a price range selector.
- **Improve property details page**: Finalize layout, polish UI, and add missing information.

## Contact  
For any questions or suggestions, feel free to reach out via GitHub issues or pull requests.
