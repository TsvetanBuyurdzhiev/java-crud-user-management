// Initialize an empty list to store users temporarily (until searched or printed)
let usersData = [];

// Function to create a new user
document.getElementById("create-user-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from reloading the page

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const dateOfBirth = document.getElementById("dob").value;

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth
    };

    // Create the user by sending a POST request
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        alert("User created successfully!");
        usersData.push(data); // Add new user to the local list
    })
    .catch(error => console.error("Error creating user:", error));
});

// Function to get all users
function getAllUsers() {
    fetch('/api/users')  // Fetch from the endpoint that returns all users
        .then(response => response.json())
        .then(data => {
            usersData = data; // Store the fetched data
            displayUsers(usersData); // Display the users in the results section
        })
        .catch(error => console.error("Error fetching users:", error));
}

// Function to search users by first or last name
function searchUsers() {
    const searchTerm = document.getElementById("search-term").value;
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    fetch(`/api/users/search?term=${searchTerm}`)  // Fetch from the search endpoint
        .then(response => response.json())
        .then(data => {
            displayUsers(data); // Display the users in the results section
        })
        .catch(error => console.error("Error searching users:", error));
}

// Helper function to display users in the results section
function displayUsers(users) {
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = '';  // Clear any previous results
    if (users.length === 0) {
        usersList.innerHTML = "No users found.";
    } else {
        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.innerHTML = `
                <strong>${user.firstName} ${user.lastName}</strong><br>
                Email: ${user.email}<br>
                Phone: ${user.phoneNumber}<br>
                Date of Birth: ${user.dateOfBirth}<br>
                <hr>
            `;
            usersList.appendChild(userDiv);
        });
    }
}