package com.example.javaTaskCRUD.controller;

import com.example.javaTaskCRUD.dto.CreateUserDTO;
import com.example.javaTaskCRUD.dto.UpdateUserDTO;
import com.example.javaTaskCRUD.dto.UserDTO;
import com.example.javaTaskCRUD.model.User;
import com.example.javaTaskCRUD.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "Operations related to user management")
@Validated
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Create a new user", description = "Create a user with the provided details")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @Parameter(description = "User details for the new user") @Valid @RequestBody CreateUserDTO createUserDTO) {
        User newUser = userService.createUser(createUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToUserDTO(newUser));
    }

    @Operation(summary = "Get a user by ID", description = "Retrieve user details by their unique ID")
    @ApiResponses({
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(
            @Parameter(description = "ID of the user to be retrieved") @PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(convertToUserDTO(user));
    }

    @Operation(summary = "Get all users", description = "Retrieve a list of all users with optional sorting")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(
            @RequestParam(defaultValue = "lastName") String sortField) {
        List<UserDTO> users = userService.getAllUsers(sortField)
                .stream()
                .map(this::convertToUserDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Search users by term", description = "Search users by first or last name")
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(
            @Parameter(description = "Search term to filter users", required = true) @RequestParam String term) {
        List<UserDTO> users = userService.searchUsers(term)
                .stream()
                .map(this::convertToUserDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Update an existing user", description = "Update the details of an existing user")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @Parameter(description = "ID of the user to be updated") @PathVariable Long id,
            @Parameter(description = "Updated user details")@Valid @RequestBody UpdateUserDTO updateUserDTO) {
        User updatedUser = userService.updateUser(id, updateUserDTO);
        return ResponseEntity.ok(convertToUserDTO(updatedUser));
    }

    @Operation(summary = "Delete a user", description = "Delete a user by their unique ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "ID of the user to be deleted") @PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get users with pagination", description = "Retrieve a paginated list of users")
    @GetMapping("/paginated")
    public ResponseEntity<Page<UserDTO>> getUsersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserDTO> usersPage = userService.getUsersWithPagination(page, size)
                .map(this::convertToUserDTO);
        return ResponseEntity.ok(usersPage);
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setDateOfBirth(user.getDateOfBirth());
        return dto;
    }
}