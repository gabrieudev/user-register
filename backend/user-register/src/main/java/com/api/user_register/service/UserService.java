package com.api.user_register.service;

import com.api.user_register.exception.UserNotFoundException;
import com.api.user_register.model.User;
import com.api.user_register.repository.UserRepository;
import com.api.user_register.rest.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void create(UserDTO userDTO) {
        userRepository.save(userDTO.toModel());
    }

    public void delete(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        userRepository.delete(user);
    }

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(User::toDto)
                .toList();
    }

}
