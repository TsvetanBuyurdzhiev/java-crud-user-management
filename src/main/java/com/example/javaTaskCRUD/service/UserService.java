package com.example.javaTaskCRUD.service;

import com.example.javaTaskCRUD.dto.CreateUserDTO;
import com.example.javaTaskCRUD.dto.UpdateUserDTO;
import com.example.javaTaskCRUD.exception.UserAlreadyExistsException;
import com.example.javaTaskCRUD.model.User;
import com.example.javaTaskCRUD.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new UserAlreadyExistsException("A user with this email already exists.");
        }
        if (userRepository.existsByPhoneNumber(createUserDTO.getPhoneNumber())) {
            throw new UserAlreadyExistsException("A user with this phone number already exists.");
        }
        User user = new User();
        user.setFirstName(createUserDTO.getFirstName());
        user.setLastName(createUserDTO.getLastName());
        user.setEmail(createUserDTO.getEmail());
        user.setPhoneNumber(createUserDTO.getPhoneNumber());
        user.setDateOfBirth(createUserDTO.getDateOfBirth());
        return userRepository.save(user);
    }

    public List<User> getAllUsers(String sortField) {
        return userRepository.findAll(Sort.by(Sort.Direction.ASC, sortField));
    }

    public List<User> searchUsers(String term) {
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(term, term);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(Long id, UpdateUserDTO updateUserDTO) {
        User user = getUserById(id);
        if (updateUserDTO.getFirstName() != null) user.setFirstName(updateUserDTO.getFirstName());
        if (updateUserDTO.getLastName() != null) user.setLastName(updateUserDTO.getLastName());
        if (updateUserDTO.getEmail() != null) user.setEmail(updateUserDTO.getEmail());
        if (updateUserDTO.getPhoneNumber() != null) user.setPhoneNumber(updateUserDTO.getPhoneNumber());
        if (updateUserDTO.getDateOfBirth() != null) user.setDateOfBirth(updateUserDTO.getDateOfBirth());
        return userRepository.save(user);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Page<User> getUsersWithPagination(int page, int size) {
        return userRepository.findAll(Pageable.ofSize(size).withPage(page));
    }
}