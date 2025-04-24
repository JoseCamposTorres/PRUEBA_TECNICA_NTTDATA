package com.nttdata.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequestDTO {

    @NotBlank
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @NotNull(message = "Password is mandatory")
    @Size(min = 4)
    private String password;
}
