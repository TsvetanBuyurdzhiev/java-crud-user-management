// Show Create User Form
function showCreateForm() {
  document.getElementById('initial-page').style.display = 'none';
  document.getElementById('create-user-section').style.display = 'block';
}

// Show Edit User Form
function showEditForm() {
  document.getElementById('initial-page').style.display = 'none';
  document.getElementById('edit-user-section').style.display = 'block';
}

// Cancel Action and Return to Initial Page
function cancelAction() {
  document.getElementById('create-user-section').style.display = 'none';
  document.getElementById('edit-user-section').style.display = 'none';
  document.getElementById('initial-page').style.display = 'block';
}

// Create User
function createUser(event) {
  event.preventDefault();

  const user = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    phoneNumber: document.getElementById('phone-number').value,
    dateOfBirth: document.getElementById('dob').value,
  };

  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        alert('User created successfully!');
        cancelAction(); // Return to Initial Page
        return response.json();
      }
      throw new Error('Failed to create user');
    })
    .catch((error) => console.error(error));
}

// Edit User
function editUser(event) {
  event.preventDefault();

  const userId = document.getElementById('user-id').value;

  const updatedUser = {
    firstName: document.getElementById('edit-first-name').value,
    lastName: document.getElementById('edit-last-name').value,
    email: document.getElementById('edit-email').value,
    phoneNumber: document.getElementById('edit-phone-number').value,
    dateOfBirth: document.getElementById('edit-dob').value,
  };

  fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (response.ok) {
        alert('User updated successfully!');
        cancelAction(); // Return to Initial Page
        return response.json();
      }
      throw new Error('Failed to update user');
    })
    .catch((error) => console.error(error));
}

// Search Users
function searchUsers() {
  const term = document.getElementById('search-term').value;

  fetch(`/api/users/search?term=${term}`)
    .then((response) => response.json())
    .then((users) => displayUsers(users))
    .catch((error) => console.error(error));
}

// Get All Users
function getAllUsers() {
  fetch('/api/users')
    .then((response) => response.json())
    .then((users) => displayUsers(users))
    .catch((error) => console.error(error));
}

// Display Users
function displayUsers(users) {
  const usersList = document.getElementById('users-list');
  usersList.innerHTML = '';

  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.textContent = `ID: ${user.id}, Name: ${user.firstName} ${user.lastName}, Email: ${user.email}`;
    usersList.appendChild(userDiv);
  });
//Page pagination
  function getUsersWithPagination(page = 0, size = 10) {
      fetch(`/api/users/paginated?page=${page}&size=${size}`)
          .then(response => response.json())
          .then(data => {
              const usersList = document.getElementById("users-list");
              usersList.innerHTML = ""; // Clear previous results
              data.content.forEach(user => {
                  const userItem = document.createElement("div");
                  userItem.textContent = `${user.firstName} ${user.lastName}`;
                  usersList.appendChild(userItem);
              });
              console.log(`Total Pages: ${data.totalPages}, Total Users: ${data.totalElements}`);
          })
          .catch(error => console.error("Error fetching users:", error));
  }
}