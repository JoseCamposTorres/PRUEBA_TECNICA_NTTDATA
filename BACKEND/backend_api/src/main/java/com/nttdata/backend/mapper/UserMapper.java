package com.nttdata.backend.mapper;


import com.nttdata.backend.domain.entity.User;
import com.nttdata.backend.dto.request.SignupRequestDTO;
import com.nttdata.backend.dto.response.AuthResponseDTO;
import com.nttdata.backend.dto.response.UserProfileResponseDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper {
    private final ModelMapper modelMapper;

    public User toUser(SignupRequestDTO signupRequestDTO){
        return modelMapper.map(signupRequestDTO, User.class);
    }

    public UserProfileResponseDTO toUserProfileResponseDTO(User user){
        return modelMapper.map(user, UserProfileResponseDTO.class);
    }

    public AuthResponseDTO toAuthResponseDTO(String token,UserProfileResponseDTO userProfile){
        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(token);
        authResponseDTO.setUser(userProfile);
        return authResponseDTO;
    }
}
