# Product Search Autocomplete

## Overview

Product Search Autocomplete is a React-based application that offers a rich, feature-packed search input field with autocomplete suggestions. It fetches product data from the Fake Store API with infinite scrolling pagination and displays detailed product information when a suggestion is selected. 

## Features

- **Search Input Field:**  
  Displays autocomplete suggestions as the user types, including an initial "Popular Searches" state before input begins.

- **API Integration & Infinite Scrolling:**  
  Fetches product data from the [Fake Store API](http://fakestoreapi.in/api/products?limit=15) with a limit of 15 products per request and implements infinite scrolling for seamless pagination.

- **Debouncing & Request Cancellation:**  
  Uses a 300ms debounce mechanism to prevent excessive API calls and cancels ongoing requests when a new query is initiated.


## Technologies Used

- **Vite React:** Fast development server and build tool.
- **React:** For building interactive user interfaces.
- **TanStack Query (React Query):** For API caching and efficient state management.
- **Axios** For data fetching.
- **Lodash Debounce** For debouncing user input.

## Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/amalrajsr/Products.git
   cd Products
   ```

2. **Install dependencies**
   ```bash
    npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
## Live link
https://67e444fc3ccd9129300a3582--stupendous-swan-bf7c14.netlify.app/