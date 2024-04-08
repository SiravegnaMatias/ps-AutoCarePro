package utn.frc.ps.AutoCareProBE.services.User;

import javax.management.relation.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.repositories.User.RoleJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;

@Service
public class UserService {
    @Autowired
    private RoleJpaRepository roleJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;

    // public UserResponse newUser(UserRequest user) {
    //    UserEntity userEntity = new UserEntity();
    //    userEntity.setEmail(user.getEmail());
    //    userEntity.setFirstName(user.getFirstName());
    //    userEntity.setLastName(user.getLastName());
    //    RoleEntity roleEntity = roleJpaRepository.findByName(user.getRole().name());
    //    userEntity.setRole(roleEntity);
    //      userJpaRepository.save(userEntity);

    //      return UserResponse.builder()
    //             .id(userEntity.getId())
    //             .email(userEntity.getEmail())
    //             .firstName(userEntity.getFirstName())
    //             .lastName(userEntity.getLastName())
    //             .build();

    //             //CREAR EL CRUD DE ROLE
    // }
}
