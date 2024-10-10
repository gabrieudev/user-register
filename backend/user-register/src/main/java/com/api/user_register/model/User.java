package com.api.user_register.model;

import com.api.user_register.rest.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = "id")
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    public UserDTO toDto() {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(this, UserDTO.class);
    }
}
