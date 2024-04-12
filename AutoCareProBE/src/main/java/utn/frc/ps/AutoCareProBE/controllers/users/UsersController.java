package utn.frc.ps.AutoCareProBE.controllers.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.services.User.UserService;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest user) {
       return ResponseEntity.ok(userService.newUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findUserById(Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }
}
