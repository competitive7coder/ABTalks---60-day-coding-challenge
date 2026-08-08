
const backendChallenge = {
    challenge_name: "Backend",
    total_day: 60,
    description: "A 60-day backend development challenge focused on Node.js, Express, MongoDB, APIs, authentication, real-time systems, testing, deployment, and building production-ready applications.",
    roadmap: [
        {
            day: 1,
            task: "Build a Basic Express Server",
            description:
                "Create an Express server with a health-check endpoint and proper project structure.",
            difficulty_level: "Easy",
        },
        {
            day: 2,
            task: "Create REST API Routes",
            description:
                "Build GET, POST, PUT, and DELETE routes for a simple resource.",
            difficulty_level: "Easy",
        },
        {
            day: 3,
            task: "Build a CRUD API",
            description:
                "Create a complete CRUD API for managing notes or tasks.",
            difficulty_level: "Easy",
        },
        {
            day: 4,
            task: "Connect MongoDB",
            description:
                "Connect your Express application to MongoDB and store application data.",
            difficulty_level: "Easy",
        },
        {
            day: 5,
            task: "Create Mongoose Models",
            description:
                "Create schemas and models with validation using Mongoose.",
            difficulty_level: "Easy",
        },
        {
            day: 6,
            task: "Build User Registration",
            description:
                "Create a user registration API with validation and duplicate-email handling.",
            difficulty_level: "Medium",
        },
        {
            day: 7,
            task: "Hash User Passwords",
            description:
                "Secure user passwords using bcrypt before storing them in MongoDB.",
            difficulty_level: "Medium",
        },
        {
            day: 8,
            task: "Build Login Authentication",
            description:
                "Create a login API that verifies credentials and authenticates users.",
            difficulty_level: "Medium",
        },
        {
            day: 9,
            task: "Implement JWT Authentication",
            description:
                "Generate and verify JWT access tokens for authenticated users.",
            difficulty_level: "Medium",
        },
        {
            day: 10,
            task: "Create Authentication Middleware",
            description:
                "Protect private routes using JWT authentication middleware.",
            difficulty_level: "Medium",
        },
        {
            day: 11,
            task: "Implement Refresh Tokens",
            description:
                "Add access-token and refresh-token handling for persistent authentication.",
            difficulty_level: "Hard",
        },
        {
            day: 12,
            task: "Build Role-Based Authorization",
            description:
                "Create different permissions for users based on their roles.",
            difficulty_level: "Medium",
        },
        {
            day: 13,
            task: "Build a User Profile API",
            description:
                "Create APIs for viewing and updating a user's profile information.",
            difficulty_level: "Easy",
        },
        {
            day: 14,
            task: "Build an Image Upload API",
            description:
                "Create an API that accepts image uploads and stores them using a cloud storage service.",
            difficulty_level: "Medium",
        },
        {
            day: 15,
            task: "Add API Validation",
            description:
                "Validate request body, parameters, and query values before processing requests.",
            difficulty_level: "Medium",
        },
        {
            day: 16,
            task: "Create Global Error Handling",
            description:
                "Build centralized error-handling middleware for your Express application.",
            difficulty_level: "Medium",
        },
        {
            day: 17,
            task: "Implement API Pagination",
            description:
                "Add pagination to an API that returns a large collection of documents.",
            difficulty_level: "Medium",
        },
        {
            day: 18,
            task: "Implement Search",
            description:
                "Add keyword-based search functionality to your API.",
            difficulty_level: "Medium",
        },
        {
            day: 19,
            task: "Implement Filtering and Sorting",
            description:
                "Allow clients to filter and sort API results using query parameters.",
            difficulty_level: "Medium",
        },
        {
            day: 20,
            task: "Build an Advanced MongoDB Query",
            description:
                "Use MongoDB queries and aggregation to generate useful application data.",
            difficulty_level: "Hard",
        },
        {
            day: 21,
            task: "MongoDB Aggregation Pipeline",
            description:
                "Create an aggregation pipeline to generate statistics from your data.",
            difficulty_level: "Hard",
        },
        {
            day: 22,
            task: "Create MongoDB Relationships",
            description:
                "Design related collections and use references to connect application data.",
            difficulty_level: "Medium",
        },
        {
            day: 23,
            task: "Build a Blogging API",
            description:
                "Create APIs for posts, comments, authors, and post management.",
            difficulty_level: "Medium",
        },
        {
            day: 24,
            task: "Add Authorization to the Blog",
            description:
                "Allow only authorized users to edit or delete their own posts.",
            difficulty_level: "Medium",
        },
        {
            day: 25,
            task: "Build a File Management API",
            description:
                "Create an API for uploading, retrieving, and deleting files.",
            difficulty_level: "Hard",
        },
        {
            day: 26,
            task: "Send Emails from Node.js",
            description:
                "Create an email service for sending transactional emails.",
            difficulty_level: "Medium",
        },
        {
            day: 27,
            task: "Build Password Reset",
            description:
                "Implement a secure forgot-password and password-reset workflow.",
            difficulty_level: "Hard",
        },
        {
            day: 28,
            task: "Add Rate Limiting",
            description:
                "Protect authentication and public APIs from excessive requests.",
            difficulty_level: "Medium",
        },
        {
            day: 29,
            task: "Secure Your Express API",
            description:
                "Add security headers, CORS configuration, input sanitization, and secure cookies.",
            difficulty_level: "Medium",
        },
        {
            day: 30,
            task: "Build API Documentation",
            description:
                "Document your API endpoints, request bodies, responses, and authentication.",
            difficulty_level: "Easy",
        },
        {
            day: 31,
            task: "Build a Real-Time Chat Server",
            description:
                "Create a real-time messaging server using Socket.io.",
            difficulty_level: "Hard",
        },
        {
            day: 32,
            task: "Create Chat Rooms",
            description:
                "Allow users to join rooms and send messages to room members.",
            difficulty_level: "Hard",
        },
        {
            day: 33,
            task: "Store Chat Messages",
            description:
                "Persist real-time chat messages in MongoDB.",
            difficulty_level: "Hard",
        },
        {
            day: 34,
            task: "Build Notifications",
            description:
                "Create a notification system for user events.",
            difficulty_level: "Medium",
        },
        {
            day: 35,
            task: "Build an Activity Feed",
            description:
                "Create an API that returns recent activities performed by users.",
            difficulty_level: "Medium",
        },
        {
            day: 36,
            task: "Implement Background Jobs",
            description:
                "Create a background job for processing tasks asynchronously.",
            difficulty_level: "Hard",
        },
        {
            day: 37,
            task: "Add Redis Caching",
            description:
                "Cache frequently requested API data using Redis.",
            difficulty_level: "Hard",
        },
        {
            day: 38,
            task: "Implement API Logging",
            description:
                "Create structured request and error logging for your backend.",
            difficulty_level: "Medium",
        },
        {
            day: 39,
            task: "Create Health Check APIs",
            description:
                "Build health and readiness endpoints for monitoring your application.",
            difficulty_level: "Easy",
        },
        {
            day: 40,
            task: "Optimize Your API",
            description:
                "Identify slow queries and improve API performance.",
            difficulty_level: "Hard",
        },
        {
            day: 41,
            task: "Write Unit Tests",
            description:
                "Write unit tests for important backend functions and services.",
            difficulty_level: "Medium",
        },
        {
            day: 42,
            task: "Write API Integration Tests",
            description:
                "Test your Express endpoints using automated integration tests.",
            difficulty_level: "Hard",
        },
        {
            day: 43,
            task: "Build an API with Transactions",
            description:
                "Use database transactions to safely perform multiple related operations.",
            difficulty_level: "Hard",
        },
        {
            day: 44,
            task: "Implement Soft Delete",
            description:
                "Create a soft-delete mechanism instead of permanently removing records.",
            difficulty_level: "Medium",
        },
        {
            day: 45,
            task: "Build an Admin API",
            description:
                "Create protected administrative endpoints for managing application data.",
            difficulty_level: "Hard",
        },
        {
            day: 46,
            task: "Build Analytics APIs",
            description:
                "Create APIs that return user activity and application statistics.",
            difficulty_level: "Hard",
        },
        {
            day: 47,
            task: "Build a Search API",
            description:
                "Create a more advanced search system with multiple search parameters.",
            difficulty_level: "Hard",
        },
        {
            day: 48,
            task: "Create a Third-Party API Integration",
            description:
                "Integrate an external API into your backend application.",
            difficulty_level: "Medium",
        },
        {
            day: 49,
            task: "Build a Webhook",
            description:
                "Create an endpoint that receives and processes webhook events.",
            difficulty_level: "Hard",
        },
        {
            day: 50,
            task: "Build a Payment API",
            description:
                "Create a mock payment workflow with orders, payment status, and verification.",
            difficulty_level: "Hard",
        },
        {
            day: 51,
            task: "Design a Production-Ready API",
            description:
                "Refactor your backend into controllers, services, models, middleware, and utilities.",
            difficulty_level: "Hard",
        },
        {
            day: 52,
            task: "Add Environment Configuration",
            description:
                "Configure development and production environments using environment variables.",
            difficulty_level: "Easy",
        },
        {
            day: 53,
            task: "Dockerize Your Backend",
            description:
                "Create a Docker configuration for running your backend application.",
            difficulty_level: "Hard",
        },
        {
            day: 54,
            task: "Deploy Your Backend",
            description:
                "Deploy your backend API to a cloud hosting platform.",
            difficulty_level: "Medium",
        },
        {
            day: 55,
            task: "Connect a Production Database",
            description:
                "Connect your deployed backend to a production MongoDB database.",
            difficulty_level: "Medium",
        },
        {
            day: 56,
            task: "Add Production Monitoring",
            description:
                "Add logging and basic monitoring to your deployed application.",
            difficulty_level: "Hard",
        },
        {
            day: 57,
            task: "Build a Complete Backend Project",
            description:
                "Start combining the concepts from the previous days into one application.",
            difficulty_level: "Hard",
        },
        {
            day: 58,
            task: "Complete Your Backend Project",
            description:
                "Finish the main functionality, authentication, validation, and error handling.",
            difficulty_level: "Hard",
        },
        {
            day: 59,
            task: "Deploy and Document Your Project",
            description:
                "Deploy the project and create a professional README with API documentation.",
            difficulty_level: "Hard",
        },
        {
            day: 60,
            task: "Showcase Your 60-Day Project",
            description:
                "Publish your final project, GitHub repository, deployment, and LinkedIn post.",
            difficulty_level: "Hard",
        },
    ],
};


const frontendChallenge = {
    challenge_name: "Frontend",
    total_day: 60,
    description: "A 60-day frontend development challenge focused on HTML, CSS, JavaScript, responsive design, React, state management, APIs, performance, accessibility, testing, and building production-ready interfaces.",

    roadmap: [
        {
            day: 1,
            task: "Build a Personal Profile Page",
            description:
                "Create a simple personal profile page using semantic HTML with sections for your introduction, skills, and contact information.",
            difficulty_level: "Easy",
        },
        {
            day: 2,
            task: "Create a Responsive Landing Page",
            description:
                "Build a mobile-first landing page with a hero section, call-to-action, and responsive layout.",
            difficulty_level: "Easy",
        },
        {
            day: 3,
            task: "Build a Navigation Bar",
            description:
                "Create a responsive navigation bar that works across mobile, tablet, and desktop screens.",
            difficulty_level: "Easy",
        },
        {
            day: 4,
            task: "Create a Login Form",
            description:
                "Build a responsive login form with proper labels, input validation, and accessible form controls.",
            difficulty_level: "Easy",
        },
        {
            day: 5,
            task: "Build a Registration Form",
            description:
                "Create a registration form with password confirmation and client-side validation.",
            difficulty_level: "Easy",
        },
        {
            day: 6,
            task: "Build a Pricing Section",
            description:
                "Create a responsive pricing section with multiple plans and a highlighted recommended plan.",
            difficulty_level: "Easy",
        },
        {
            day: 7,
            task: "Build a Responsive Dashboard",
            description:
                "Create a dashboard layout with sidebar navigation, cards, statistics, and responsive behavior.",
            difficulty_level: "Medium",
        },
        {
            day: 8,
            task: "Create a Modal Component",
            description:
                "Build a reusable modal component with open, close, overlay, and keyboard interaction.",
            difficulty_level: "Easy",
        },
        {
            day: 9,
            task: "Build a Dropdown Menu",
            description:
                "Create an accessible dropdown menu that opens and closes based on user interaction.",
            difficulty_level: "Easy",
        },
        {
            day: 10,
            task: "Build a Toast Notification System",
            description:
                "Create reusable success, error, warning, and information toast notifications.",
            difficulty_level: "Medium",
        },
        {
            day: 11,
            task: "Build a JavaScript Calculator",
            description:
                "Create a functional calculator using JavaScript with support for basic arithmetic operations.",
            difficulty_level: "Easy",
        },
        {
            day: 12,
            task: "Build a Todo Application",
            description:
                "Create a todo application that supports adding, editing, completing, and deleting tasks.",
            difficulty_level: "Medium",
        },
        {
            day: 13,
            task: "Build a Notes Application",
            description:
                "Create a notes application with create, edit, delete, and search functionality.",
            difficulty_level: "Medium",
        },
        {
            day: 14,
            task: "Build a Weather Application",
            description:
                "Fetch weather information from a public API and display current weather conditions.",
            difficulty_level: "Medium",
        },
        {
            day: 15,
            task: "Build a Search Interface",
            description:
                "Create a search interface with debounced input and dynamic search results.",
            difficulty_level: "Medium",
        },
        {
            day: 16,
            task: "Build a Product Card System",
            description:
                "Create reusable product cards displaying images, prices, ratings, and actions.",
            difficulty_level: "Easy",
        },
        {
            day: 17,
            task: "Build a Product Listing Page",
            description:
                "Create a product listing interface with responsive grid layouts.",
            difficulty_level: "Medium",
        },
        {
            day: 18,
            task: "Add Product Filtering",
            description:
                "Allow users to filter products by category, price, rating, or other properties.",
            difficulty_level: "Medium",
        },
        {
            day: 19,
            task: "Add Product Sorting",
            description:
                "Implement sorting by price, rating, popularity, and newest products.",
            difficulty_level: "Medium",
        },
        {
            day: 20,
            task: "Build a Shopping Cart",
            description:
                "Create a shopping cart where users can add, remove, and update product quantities.",
            difficulty_level: "Medium",
        },
        {
            day: 21,
            task: "Build a Multi-Step Form",
            description:
                "Create a form divided into multiple steps with validation and progress indication.",
            difficulty_level: "Medium",
        },
        {
            day: 22,
            task: "Build an Image Gallery",
            description:
                "Create an image gallery with thumbnails, a large preview, and navigation controls.",
            difficulty_level: "Easy",
        },
        {
            day: 23,
            task: "Build an Image Carousel",
            description:
                "Create a reusable image carousel with next, previous, and automatic sliding functionality.",
            difficulty_level: "Medium",
        },
        {
            day: 24,
            task: "Build an Accordion Component",
            description:
                "Create a reusable accordion component that expands and collapses content.",
            difficulty_level: "Easy",
        },
        {
            day: 25,
            task: "Build a Tabs Component",
            description:
                "Create reusable tabs for switching between different content sections.",
            difficulty_level: "Easy",
        },
        {
            day: 26,
            task: "Build a React Application",
            description:
                "Create your first React application using reusable components and proper project structure.",
            difficulty_level: "Easy",
        },
        {
            day: 27,
            task: "Build a React Todo App",
            description:
                "Rebuild your Todo application using React state and reusable components.",
            difficulty_level: "Medium",
        },
        {
            day: 28,
            task: "Learn React Props and State",
            description:
                "Build a small application demonstrating communication between parent and child components.",
            difficulty_level: "Easy",
        },
        {
            day: 29,
            task: "Build a React Form",
            description:
                "Create a controlled React form with validation and error messages.",
            difficulty_level: "Medium",
        },
        {
            day: 30,
            task: "Build a React Dashboard",
            description:
                "Create a complete responsive dashboard using reusable React components.",
            difficulty_level: "Medium",
        },
        {
            day: 31,
            task: "Learn React Router",
            description:
                "Build a multi-page React application using React Router.",
            difficulty_level: "Medium",
        },
        {
            day: 32,
            task: "Create Protected Routes",
            description:
                "Create protected frontend routes that require an authenticated user.",
            difficulty_level: "Medium",
        },
        {
            day: 33,
            task: "Fetch Data from an API",
            description:
                "Create a React application that fetches and displays data from a REST API.",
            difficulty_level: "Medium",
        },
        {
            day: 34,
            task: "Build Loading and Error States",
            description:
                "Handle loading, error, empty, and successful states when fetching API data.",
            difficulty_level: "Medium",
        },
        {
            day: 35,
            task: "Build a Searchable Data Table",
            description:
                "Create a table with search, sorting, filtering, and pagination.",
            difficulty_level: "Hard",
        },
        {
            day: 36,
            task: "Learn React Context",
            description:
                "Create a global state using React Context and use it across multiple components.",
            difficulty_level: "Medium",
        },
        {
            day: 37,
            task: "Build a Theme Switcher",
            description:
                "Create light and dark themes using React state or Context.",
            difficulty_level: "Easy",
        },
        {
            day: 38,
            task: "Build a Shopping Cart with Context",
            description:
                "Manage shopping cart state globally using React Context.",
            difficulty_level: "Medium",
        },
        {
            day: 39,
            task: "Learn Redux Toolkit",
            description:
                "Create a Redux store and manage application state using Redux Toolkit.",
            difficulty_level: "Medium",
        },
        {
            day: 40,
            task: "Build a Redux-Powered Dashboard",
            description:
                "Create a dashboard that uses Redux Toolkit for managing global application state.",
            difficulty_level: "Hard",
        },
        {
            day: 41,
            task: "Build a Real-Time Chat UI",
            description:
                "Create a chat interface with message lists, typing indicators, and online status.",
            difficulty_level: "Hard",
        },
        {
            day: 42,
            task: "Connect Frontend to Socket.io",
            description:
                "Connect your React application to a Socket.io server and display real-time messages.",
            difficulty_level: "Hard",
        },
        {
            day: 43,
            task: "Build Infinite Scrolling",
            description:
                "Implement infinite scrolling to load additional content as the user reaches the bottom.",
            difficulty_level: "Hard",
        },
        {
            day: 44,
            task: "Optimize React Components",
            description:
                "Improve rendering performance using memoization and appropriate component structure.",
            difficulty_level: "Hard",
        },
        {
            day: 45,
            task: "Implement Lazy Loading",
            description:
                "Add lazy loading for routes and large application components.",
            difficulty_level: "Medium",
        },
        {
            day: 46,
            task: "Build an Accessible Web Page",
            description:
                "Improve keyboard navigation, semantic HTML, labels, focus management, and screen-reader support.",
            difficulty_level: "Medium",
        },
        {
            day: 47,
            task: "Build a Responsive Portfolio",
            description:
                "Create a polished personal portfolio that works across mobile, tablet, and desktop.",
            difficulty_level: "Medium",
        },
        {
            day: 48,
            task: "Build a Data Visualization Dashboard",
            description:
                "Create an interactive dashboard with charts and meaningful data visualizations.",
            difficulty_level: "Hard",
        },
        {
            day: 49,
            task: "Build a Drag-and-Drop Interface",
            description:
                "Create a drag-and-drop interface for organizing cards or tasks.",
            difficulty_level: "Hard",
        },
        {
            day: 50,
            task: "Build a Kanban Board",
            description:
                "Create a Trello-style Kanban board with columns and draggable tasks.",
            difficulty_level: "Hard",
        },
        {
            day: 51,
            task: "Write Frontend Tests",
            description:
                "Write component and interaction tests for important parts of your application.",
            difficulty_level: "Medium",
        },
        {
            day: 52,
            task: "Build a Production-Ready React App",
            description:
                "Organize your application into reusable components, hooks, utilities, and services.",
            difficulty_level: "Hard",
        },
        {
            day: 53,
            task: "Improve Frontend Performance",
            description:
                "Identify performance issues and optimize images, rendering, bundles, and API requests.",
            difficulty_level: "Hard",
        },
        {
            day: 54,
            task: "Add SEO and Metadata",
            description:
                "Add meaningful page titles, descriptions, metadata, and social sharing information.",
            difficulty_level: "Medium",
        },
        {
            day: 55,
            task: "Add Progressive Web Features",
            description:
                "Explore installable web-app behavior and offline-friendly frontend features.",
            difficulty_level: "Hard",
        },
        {
            day: 56,
            task: "Deploy Your Frontend",
            description:
                "Deploy your frontend application and configure environment variables.",
            difficulty_level: "Medium",
        },
        {
            day: 57,
            task: "Start Your Final Frontend Project",
            description:
                "Plan and begin a complete frontend application using the skills learned during the challenge.",
            difficulty_level: "Hard",
        },
        {
            day: 58,
            task: "Complete Your Final Project",
            description:
                "Finish the main functionality, responsive design, accessibility, and error handling.",
            difficulty_level: "Hard",
        },
        {
            day: 59,
            task: "Deploy and Document Your Project",
            description:
                "Deploy your final project and create a professional README with screenshots and project details.",
            difficulty_level: "Hard",
        },
        {
            day: 60,
            task: "Showcase Your Frontend Project",
            description:
                "Publish your final project, GitHub repository, live deployment, and LinkedIn post.",
            difficulty_level: "Hard",
        },
    ],
};


const fullStackChallenge = {
    challenge_name: "Full Stack",
    total_day: 60,
    description: "A 60-day full-stack development challenge covering frontend development, React, Node.js, Express, MongoDB, authentication, APIs, real-time communication, testing, deployment, and production-ready application development.",

    roadmap: [
        {
            day: 1,
            task: "Build a Personal Profile Page",
            description:
                "Create a responsive personal profile page using semantic HTML and basic CSS.",
            difficulty_level: "Easy",
        },
        {
            day: 2,
            task: "Build a Responsive Landing Page",
            description:
                "Create a mobile-first landing page with a hero section, features, and call-to-action.",
            difficulty_level: "Easy",
        },
        {
            day: 3,
            task: "Build a Navigation System",
            description:
                "Create a responsive navigation bar with mobile and desktop layouts.",
            difficulty_level: "Easy",
        },
        {
            day: 4,
            task: "Build a Registration Form",
            description:
                "Create a registration form with client-side validation and useful error messages.",
            difficulty_level: "Easy",
        },
        {
            day: 5,
            task: "Build a JavaScript Todo App",
            description:
                "Create a todo application with add, edit, delete, and complete functionality.",
            difficulty_level: "Easy",
        },
        {
            day: 6,
            task: "Build a Weather Application",
            description:
                "Fetch weather information from a public API and display it in a responsive interface.",
            difficulty_level: "Medium",
        },
        {
            day: 7,
            task: "Build a Product Listing Page",
            description:
                "Create a responsive product listing interface with reusable product cards.",
            difficulty_level: "Medium",
        },
        {
            day: 8,
            task: "Add Product Search and Filtering",
            description:
                "Implement search, category filtering, and sorting for your product listing.",
            difficulty_level: "Medium",
        },
        {
            day: 9,
            task: "Build a Shopping Cart",
            description:
                "Create a shopping cart with quantity management, item removal, and total calculation.",
            difficulty_level: "Medium",
        },
        {
            day: 10,
            task: "Build a Responsive Dashboard",
            description:
                "Create a dashboard with sidebar navigation, statistics cards, tables, and responsive layouts.",
            difficulty_level: "Medium",
        },
        {
            day: 11,
            task: "Create Your React Application",
            description:
                "Set up a React application and organize it using reusable components.",
            difficulty_level: "Easy",
        },
        {
            day: 12,
            task: "Build a React Todo Application",
            description:
                "Rebuild the Todo application using React components, state, and event handling.",
            difficulty_level: "Medium",
        },
        {
            day: 13,
            task: "Build a React Form",
            description:
                "Create a controlled React form with validation and reusable input components.",
            difficulty_level: "Medium",
        },
        {
            day: 14,
            task: "Build a Multi-Page React App",
            description:
                "Use React Router to create multiple pages and navigation.",
            difficulty_level: "Medium",
        },
        {
            day: 15,
            task: "Build a React API Client",
            description:
                "Create a React application that fetches and displays data from a REST API.",
            difficulty_level: "Medium",
        },
        {
            day: 16,
            task: "Handle Loading and Error States",
            description:
                "Implement proper loading, error, empty, and success states for API requests.",
            difficulty_level: "Medium",
        },
        {
            day: 17,
            task: "Create a Node.js Server",
            description:
                "Set up a Node.js application and create a basic HTTP server.",
            difficulty_level: "Easy",
        },
        {
            day: 18,
            task: "Build an Express API",
            description:
                "Create an Express server with RESTful routes and controllers.",
            difficulty_level: "Easy",
        },
        {
            day: 19,
            task: "Build a CRUD API",
            description:
                "Create complete CRUD endpoints for managing a resource.",
            difficulty_level: "Medium",
        },
        {
            day: 20,
            task: "Connect MongoDB",
            description:
                "Connect your Express application to MongoDB using Mongoose.",
            difficulty_level: "Medium",
        },
        {
            day: 21,
            task: "Create Mongoose Models",
            description:
                "Design MongoDB schemas with validation and appropriate relationships.",
            difficulty_level: "Medium",
        },
        {
            day: 22,
            task: "Build a User Registration API",
            description:
                "Create a secure registration endpoint with validation and duplicate-user handling.",
            difficulty_level: "Medium",
        },
        {
            day: 23,
            task: "Hash User Passwords",
            description:
                "Secure passwords using bcrypt before storing users in the database.",
            difficulty_level: "Medium",
        },
        {
            day: 24,
            task: "Build Login Authentication",
            description:
                "Create a login API that verifies credentials and authenticates users.",
            difficulty_level: "Medium",
        },
        {
            day: 25,
            task: "Implement JWT Authentication",
            description:
                "Generate and verify JWT tokens and create protected API routes.",
            difficulty_level: "Medium",
        },
        {
            day: 26,
            task: "Connect React Authentication",
            description:
                "Connect the React frontend to the authentication APIs and manage login state.",
            difficulty_level: "Hard",
        },
        {
            day: 27,
            task: "Build Protected Frontend Routes",
            description:
                "Create frontend routes that are accessible only to authenticated users.",
            difficulty_level: "Medium",
        },
        {
            day: 28,
            task: "Build a User Profile",
            description:
                "Create frontend and backend functionality for viewing and updating user profiles.",
            difficulty_level: "Medium",
        },
        {
            day: 29,
            task: "Build an Image Upload System",
            description:
                "Allow users to upload profile images and store them using a cloud storage service.",
            difficulty_level: "Hard",
        },
        {
            day: 30,
            task: "Build a Full Stack Notes App",
            description:
                "Create a complete notes application with React, Express, MongoDB, and authentication.",
            difficulty_level: "Hard",
        },
        {
            day: 31,
            task: "Add Search and Pagination",
            description:
                "Implement backend pagination and search and connect them to the frontend.",
            difficulty_level: "Hard",
        },
        {
            day: 32,
            task: "Add Filtering and Sorting",
            description:
                "Implement filtering and sorting on the backend and expose controls in the frontend.",
            difficulty_level: "Medium",
        },
        {
            day: 33,
            task: "Build Role-Based Authorization",
            description:
                "Create different permissions for users based on their roles.",
            difficulty_level: "Hard",
        },
        {
            day: 34,
            task: "Build an Admin Dashboard",
            description:
                "Create a protected admin dashboard for viewing and managing application data.",
            difficulty_level: "Hard",
        },
        {
            day: 35,
            task: "Create Global Error Handling",
            description:
                "Implement centralized backend error handling and meaningful frontend error states.",
            difficulty_level: "Medium",
        },
        {
            day: 36,
            task: "Build a Notification System",
            description:
                "Create notifications that inform users about important application events.",
            difficulty_level: "Medium",
        },
        {
            day: 37,
            task: "Build a Real-Time Chat UI",
            description:
                "Create a responsive chat interface with conversations, messages, and user status.",
            difficulty_level: "Medium",
        },
        {
            day: 38,
            task: "Connect Socket.io",
            description:
                "Connect your React frontend and Node.js backend using Socket.io.",
            difficulty_level: "Hard",
        },
        {
            day: 39,
            task: "Build Real-Time Messaging",
            description:
                "Implement real-time sending and receiving of messages.",
            difficulty_level: "Hard",
        },
        {
            day: 40,
            task: "Persist Chat Messages",
            description:
                "Store chat messages in MongoDB and retrieve previous conversations.",
            difficulty_level: "Hard",
        },
        {
            day: 41,
            task: "Build an Activity Feed",
            description:
                "Create a feed showing recent actions performed by users.",
            difficulty_level: "Medium",
        },
        {
            day: 42,
            task: "Build a Full Stack Search",
            description:
                "Create a search system with backend queries, filtering, pagination, and frontend controls.",
            difficulty_level: "Hard",
        },
        {
            day: 43,
            task: "Add Redis Caching",
            description:
                "Cache frequently accessed backend data using Redis.",
            difficulty_level: "Hard",
        },
        {
            day: 44,
            task: "Build Background Jobs",
            description:
                "Create a background job for processing tasks asynchronously.",
            difficulty_level: "Hard",
        },
        {
            day: 45,
            task: "Build an Analytics Dashboard",
            description:
                "Create backend aggregation APIs and frontend charts to visualize application data.",
            difficulty_level: "Hard",
        },
        {
            day: 46,
            task: "Write Backend Tests",
            description:
                "Write unit and integration tests for important backend functionality.",
            difficulty_level: "Hard",
        },
        {
            day: 47,
            task: "Write Frontend Tests",
            description:
                "Test important React components and user interactions.",
            difficulty_level: "Medium",
        },
        {
            day: 48,
            task: "Improve Application Security",
            description:
                "Add security headers, CORS configuration, rate limiting, input validation, and secure authentication practices.",
            difficulty_level: "Hard",
        },
        {
            day: 49,
            task: "Optimize Full Stack Performance",
            description:
                "Improve frontend rendering, API response time, database queries, and asset loading.",
            difficulty_level: "Hard",
        },
        {
            day: 50,
            task: "Build a Production-Ready Project Structure",
            description:
                "Organize the frontend and backend into maintainable components, services, controllers, models, and utilities.",
            difficulty_level: "Hard",
        },
        {
            day: 51,
            task: "Add API Documentation",
            description:
                "Document your backend APIs, authentication requirements, request bodies, and responses.",
            difficulty_level: "Medium",
        },
        {
            day: 52,
            task: "Configure Environment Variables",
            description:
                "Separate development and production configuration using environment variables.",
            difficulty_level: "Easy",
        },
        {
            day: 53,
            task: "Dockerize Your Full Stack App",
            description:
                "Create Docker configurations for running your frontend and backend application.",
            difficulty_level: "Hard",
        },
        {
            day: 54,
            task: "Deploy Your Backend",
            description:
                "Deploy your backend API and connect it to a production MongoDB database.",
            difficulty_level: "Medium",
        },
        {
            day: 55,
            task: "Deploy Your Frontend",
            description:
                "Deploy your React frontend and connect it to the production backend.",
            difficulty_level: "Medium",
        },
        {
            day: 56,
            task: "Configure Production Environment",
            description:
                "Configure CORS, environment variables, API URLs, cookies, and production settings.",
            difficulty_level: "Hard",
        },
        {
            day: 57,
            task: "Start Your Final Full Stack Project",
            description:
                "Plan and begin a complete full-stack application using the skills learned during the challenge.",
            difficulty_level: "Hard",
        },
        {
            day: 58,
            task: "Complete Your Final Project",
            description:
                "Finish the main features, authentication, database integration, responsive UI, and error handling.",
            difficulty_level: "Hard",
        },
        {
            day: 59,
            task: "Deploy and Document Your Project",
            description:
                "Deploy the complete application and create a professional README with screenshots, features, and setup instructions.",
            difficulty_level: "Hard",
        },
        {
            day: 60,
            task: "Showcase Your Full Stack Project",
            description:
                "Publish your GitHub repository, live deployment, project documentation, and LinkedIn post.",
            difficulty_level: "Hard",
        },
    ],
};


export { frontendChallenge, backendChallenge , fullStackChallenge };