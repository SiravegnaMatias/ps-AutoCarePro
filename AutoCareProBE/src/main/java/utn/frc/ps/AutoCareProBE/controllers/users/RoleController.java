package utn.frc.ps.AutoCareProBE.controllers.users;

import utn.frc.ps.AutoCareProBE.dtos.user.RoleRequest;
import utn.frc.ps.AutoCareProBE.models.Role;
import utn.frc.ps.AutoCareProBE.services.User.RoleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping()
    public ResponseEntity<List<Role>> findAll() {
        return ResponseEntity.ok(roleService.findAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> find(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.findRoleById(id));
    }

    @PostMapping()
    public ResponseEntity<Role> create(@RequestBody RoleRequest role) {
        return ResponseEntity.ok(roleService.newRole(role));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Role> findByName(@PathVariable String name) {
        return ResponseEntity.ok(roleService.findRoleByName(name));
    }

}
