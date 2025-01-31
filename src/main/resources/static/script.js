document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("create-user-section").style.display = "none";
    document.getElementById("edit-user-section").style.display = "none";
});

// Show Create User Form
function showCreateForm() {
    document.getElementById("create-user-section").style.display = "block";
    document.getElementById("edit-user-section").style.display = "none";
    document.getElementById("initial-page").style.display = "none";
}

// Show Edit User Form
function showEditForm() {
    document.getElementById("edit-user-section").style.display = "block";
    document.getElementById("create-user-section").style.display = "none";
    document.getElementById("initial-page").style.display = "none";
}

// Cancel and Return to Initial Page
function cancelAction() {
    document.getElementById("create-user-section").style.display = "none";
    document.getElementById("edit-user-section").style.display = "none";
    document.getElementById("initial-page").style.display = "block";
}

// Create User using CreateUserDTO
async function createUser(event) {
    event.preventDefault();

    const userDTO = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone-number").value,
        dateOfBirth: document.getElementById("dob").value
    };

    const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDTO)
    });

    if (response.ok) {
        alert("User created successfully!");
        cancelAction(); // Return to initial page
       // document.getElementById("create-user-form").reset();
    } else {
         const errorData = await response.json();
         showValidationErrors(errorData);
        //alert("Failed to create user.");
    }
    // Function to Display Validation Errors in the Form
    function showValidationErrors(errors) {
        let errorMessage = "Validation Errors:\n";
        for (const field in errors) {
            errorMessage += `${field}: ${errors[field]}\n`;
        }
        alert(errorMessage);
    }
}

// Edit User using UpdateUserDTO
async function editUser(event) {
    event.preventDefault();

    const userId = document.getElementById("user-id").value;
    const updatedUserDTO = {
        firstName: document.getElementById("edit-first-name").value,
        lastName: document.getElementById("edit-last-name").value,
        email: document.getElementById("edit-email").value,
        phoneNumber: document.getElementById("edit-phone-number").value,
        dateOfBirth: document.getElementById("edit-dob").value
    };

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserDTO)
    });

    if (response.ok) {
        alert("User updated successfully!");
        cancelAction(); // Return to initial page
        document.getElementById("edit-user-form").reset();
    } else {
        alert("Failed to update user.");
    }
}

// Search Users
async function searchUsers() {
    const term = document.getElementById("search-term").value;
    const response = await fetch(`http://localhost:8080/api/users/search?term=${term}`);

    if (response.ok) {
        const users = await response.json();
        displayUsers(users);
    } else {
        alert("Failed to fetch users.");
    }
}

// Get All Users
async function getAllUsers() {
    const response = await fetch("http://localhost:8080/api/users");

    if (response.ok) {
        const users = await response.json();
        displayUsers(users);
    } else {
        alert("Failed to fetch users.");
    }
}

// Display Users in Results Section
function displayUsers(users) {
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = "";

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.innerHTML = `<strong>${user.firstName} ${user.lastName}</strong> - ${user.email}`;
        usersList.appendChild(userDiv);
    });
}