package utn.frc.ps.AutoCareProBE.controllers.users;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import utn.frc.ps.AutoCareProBE.dtos.user.AuthResponse;
import utn.frc.ps.AutoCareProBE.dtos.user.LoginDto;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.services.User.AuthService;
import utn.frc.ps.AutoCareProBE.services.User.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDto credentials) {
        return ResponseEntity.ok(authService.login(credentials));
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> createUser(@RequestBody @Valid UserRequest user) {
       return ResponseEntity.ok(userService.newUser(user));
    }
    
   
}
