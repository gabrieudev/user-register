package com.api.user_register.rest.dto;

import com.api.user_register.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private String id;

    @NotBlank(message = "Username cannot be blank")
    private String username;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    public User toModel() {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(this, User.class);
    }
}
