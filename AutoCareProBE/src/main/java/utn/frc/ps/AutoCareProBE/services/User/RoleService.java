package utn.frc.ps.AutoCareProBE.services.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.RoleRequest;
import utn.frc.ps.AutoCareProBE.models.Role;
import utn.frc.ps.AutoCareProBE.repositories.User.RoleJpaRepository;

@Service
public class RoleService {

    @Autowired
    private RoleJpaRepository roleJpaRepository;

    public Role newRole(RoleRequest role) {
       RoleEntity roleEntity = new RoleEntity();
       roleEntity.setName(role.getName());
         roleEntity = roleJpaRepository.save(roleEntity);
         return Role.builder().id(roleEntity.getId()).name(roleEntity.getName()).build();
    }

    public Role findRoleById(Long id) {
        RoleEntity roleEntity = roleJpaRepository.findById(id).orElse(null);
        if(roleEntity == null) {
            throw new EntityNotFoundException("Role not found");
        }
        return Role.builder().id(roleEntity.getId()).name(roleEntity.getName()).build();

    }

    public Role findRoleByName(String name) {
        RoleEntity roleEntity = roleJpaRepository.findByName(name);
        if(roleEntity == null) {
            throw new EntityNotFoundException("Role not found");
        }
        return Role.builder().id(roleEntity.getId()).name(roleEntity.getName()).build();
    }

    public List<Role> findAllRoles() {
        List<RoleEntity> roleEntities = roleJpaRepository.findAll();
        return roleEntities.stream().map(roleEntity -> Role.builder().id(roleEntity.getId()).name(roleEntity.getName()).build()).toList();
    }
}
