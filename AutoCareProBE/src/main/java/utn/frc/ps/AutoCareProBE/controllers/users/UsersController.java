package utn.frc.ps.AutoCareProBE.controllers.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.frc.ps.AutoCareProBE.dtos.querys.clientsQueries.ClientXVehiclesDTO;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.dtos.user.UserUpdateRequest;
import utn.frc.ps.AutoCareProBE.services.User.UserService;
import utn.frc.ps.AutoCareProBE.services.queryService.QueryService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private QueryService queryService;


    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody UserUpdateRequest user) {
        return ResponseEntity.ok(userService.updateUser(id,user));
    }

    @GetMapping("/vehicle-counts")
    public ResponseEntity<List<ClientXVehiclesDTO>> getUserVehicleCounts() {
        return ResponseEntity.ok(queryService.getUserVehicleCounts());
    }
}
