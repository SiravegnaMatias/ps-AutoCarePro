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

   
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

   
    // public AuthResponse login(LoginDto login) {
    //     try {
    //         // Autenticar al usuario
    //         Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
            
    //         // Obtener detalles del usuario autenticado
    //         UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
    //         // Generar token JWT
    //         String token = JwtService.getToken(userDetails);
            
    //         // Devolver la respuesta con el token
    //         return AuthResponse.builder().token(token).build();
    //     } catch (AuthenticationException e) {
    //         logger.error("Error during authentication: {}", e.getMessage());
    //         throw new BadCredentialsException("Invalid username or password");
    //     }
    // }

    public AuthResponse login(LoginDto login) {
        authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())));
        UserDetails userDetails = userJpaRepository.findByEmail(login.getEmail()).get();
        String token = JwtService.getToken(userDetails);
        return AuthResponse.builder().token(token).build();
    }
}
