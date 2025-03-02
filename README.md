# java-crud-user-management

This project is a CRUD (Create, Read, Update, Delete) application for managing users. It includes sorting, searching, and API documentation via Swagger.

Prerequisites:
1.Java Development Kit (JDK)
-Version: 17 or higher.
2.Apache Maven
-Version: 3.6 or higher.
3.MySQL Database
-Version: 8.0 or higher.
4.IntelliJ IDEA
-Community Edition.
5.Postman (Optional, for testing APIs)

Setup Instructions:
1. Clone or Download the Project
2. Configure MySQL - CREATE DATABASE userdb;
3. Update the database configuration with your MySQL credentials
4. Flyway Migration - The Flyway scripts in "src/main/resources/db/migration" will automatically set up the database schema when the application starts.

How to Run the Application:
1. Build the Project
2. Start the Application
   -Run the JavaTaskCrudApplication class from IntelliJ.

Accessing the API:
1. Swagger API Documentation
   Once the application is running, open your browser and navigate to: "http://localhost:8080/swagger-ui/index.html"
2. Available API Endpoints

Method	Endpoint	Description:
POST /api/users - Create a new user.
GET	/api/users - Retrieve all users (supports sorting).
GET	/api/users/{id} - Retrieve a user by ID.
GET	/api/users/search -	Search for users using a search term.
PUT	/api/users/{id} - Update an existing user's details.
DELETE	/api/users/{id} - Delete a user by ID.

Testing the API with browser can be done at http://localhost:8080/

Testing with Postman:
1. Create a User:
   Endpoint: POST http://localhost:8080//api/users
   Body (JSON):
   {
   "firstName": "Jorge",
   "lastName": "Smith",
   "email": "Jorge.smith@example.com",
   "phoneNumber": "1234567890",
   "dateOfBirth": "1990-01-01"
   }
2. Retrieve All Users:
   Endpoint: GET http://localhost:8080//api/users?sortField=lastName
3. Search for Users
   Endpoint: GET http://localhost:8080//api/users/search?term=Jorge
4. Update a User:
   Endpoint: PUT http://localhost:8080//api/users/{id}
   Body (JSON):
   {
   "firstName": "Johnny",
   "lastName": "Smith",
   "email": "Johnny.smith@example.com",
   "phoneNumber": "0987654321",
   "dateOfBirth": "1992-02-02"
   }
5. Delete a User:
   Endpoint: DELETE http://localhost:8080//api/users/{id}
6. Get pagination:
   GET http://localhost:8080//api/users/paginated

**If port 8080 is already in use, change the port in the application.properties
**Ensure MySQL is running, and the credentials in application.properties are correct.