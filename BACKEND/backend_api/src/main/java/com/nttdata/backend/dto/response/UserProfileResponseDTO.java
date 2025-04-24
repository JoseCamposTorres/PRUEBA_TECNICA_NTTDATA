package com.nttdata.backend.dto.response;

import com.nttdata.backend.domain.enums.Role;
import lombok.Data;

@Data
public class UserProfileResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
}
