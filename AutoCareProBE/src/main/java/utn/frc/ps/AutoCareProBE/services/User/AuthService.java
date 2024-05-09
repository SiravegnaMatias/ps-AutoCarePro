package utn.frc.ps.AutoCareProBE.services.User;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.AuthResponse;
import utn.frc.ps.AutoCareProBE.dtos.user.LoginDto;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;
import utn.frc.ps.AutoCareProBE.services.jwt.JwtService;


@Service
public class AuthService {
    @Autowired
    private UserJpaRepository userJpaRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


   
  

    public AuthResponse login(LoginDto login) {
        authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())));
        UserDetails userDetails = userJpaRepository.findByEmail(login.getEmail()).get();
        UserEntity user = userJpaRepository.findByEmail(login.getEmail()).orElseThrow(() -> new BadCredentialsException("User not found"));
        String token = JwtService.getToken(userDetails);
        return AuthResponse.builder().token(token).id(user.getId()).build();
    }
}
