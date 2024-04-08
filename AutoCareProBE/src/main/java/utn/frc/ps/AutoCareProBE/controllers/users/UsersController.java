package utn.frc.ps.AutoCareProBE.controllers.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.services.User.UserService;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService userService;

    // @PostMapping
    // public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest user) {
    //    return ResponseEntity.ok(userService.newUser(user));
    // }
}
