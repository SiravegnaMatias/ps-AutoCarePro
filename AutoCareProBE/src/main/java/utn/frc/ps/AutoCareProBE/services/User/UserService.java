package utn.frc.ps.AutoCareProBE.services.User;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.models.Role;
import utn.frc.ps.AutoCareProBE.repositories.User.RoleJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;
import utn.frc.ps.AutoCareProBE.services.email.EmailSenderService;

@Service
public class UserService {
    @Autowired
    private RoleJpaRepository roleJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private EmailSenderService emailSenderService;

    public UserResponse newUser(UserRequest user) {
       UserEntity userEntity = new UserEntity();
       userEntity.setEmail(user.getEmail());
       userEntity.setFirstName(user.getFirstName());
       userEntity.setLastName(user.getLastName());
       userEntity.setAddress(user.getAddress());
       userEntity.setPassword(user.getPassword());
      Optional<RoleEntity> roleEntity = roleJpaRepository.findById(user.getIdRole());
     
      if(roleEntity.isEmpty()){
        throw new EntityNotFoundException("Role not found");
      }
      Role role = Role.builder().id(roleEntity.get().getId()).name(roleEntity.get().getName()).build();
       userEntity.setRole(roleEntity.get());
       userEntity = userJpaRepository.save(userEntity);
      emailSenderService.sendRegistrationEmail(userEntity.getEmail());
       return UserResponse.builder().id(userEntity.getId())
                                    .email(userEntity.getEmail())
                                    .firstName(userEntity.getFirstName())
                                    .lastName(userEntity.getLastName())
                                    .role(role)
                                    .address(userEntity.getAddress())
                                    
                                    .build();
      }

      public UserResponse findUserById(Long id) {
        UserEntity userEntity = userJpaRepository.findById(id).orElse(null);
        if(userEntity == null) {
            throw new EntityNotFoundException("User not found");
        }
        Role role = Role.builder().id(userEntity.getRole().getId()).name(userEntity.getRole().getName()).build();
        return UserResponse.builder()
                          .id(userEntity.getId())
                          .email(userEntity.getEmail())
                          .firstName(userEntity.getFirstName())
                          .lastName(userEntity.getLastName())
                          .role(role)
                          .address(userEntity.getAddress())
                          .build();
      }
      
}
