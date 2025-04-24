package com.nttdata.backend.controller;

import com.nttdata.backend.dto.request.AuthRequestDTO;
import com.nttdata.backend.dto.request.SignupRequestDTO;
import com.nttdata.backend.dto.response.AuthResponseDTO;
import com.nttdata.backend.dto.response.UserProfileResponseDTO;
import com.nttdata.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponseDTO> signIn(@RequestBody AuthRequestDTO authRequest) {
        AuthResponseDTO authResponse = userService.signIn(authRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<UserProfileResponseDTO> register(@RequestBody @Validated SignupRequestDTO signupRequestDTO) {
        UserProfileResponseDTO userProfileResponseDTO = userService.signup(signupRequestDTO);
        return new ResponseEntity<>(userProfileResponseDTO, HttpStatus.CREATED);
    }
}