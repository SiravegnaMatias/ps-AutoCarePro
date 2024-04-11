package utn.frc.ps.AutoCareProBE.controllers.users;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.frc.ps.AutoCareProBE.dtos.user.LoginDto;
import utn.frc.ps.AutoCareProBE.services.User.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping()
    public ResponseEntity<Boolean> login(@RequestBody LoginDto credentials) {
        return ResponseEntity.ok(authService.login(credentials));
    }
    
}
