package utn.frc.ps.AutoCareProBE.services.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.AuthResponse;
import utn.frc.ps.AutoCareProBE.dtos.user.UserRequest;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.models.Role;
import utn.frc.ps.AutoCareProBE.repositories.User.RoleJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;
import utn.frc.ps.AutoCareProBE.services.email.EmailSenderService;
import utn.frc.ps.AutoCareProBE.services.jwt.JwtService;

@Service
public class UserService {
  @Autowired
  private RoleJpaRepository roleJpaRepository;
  @Autowired
  private UserJpaRepository userJpaRepository;
  @Autowired
  private EmailSenderService emailSenderService;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private PasswordEncoder passwordEncoder;

  // VALIDAR SI YA EXISTE EL EMAIL

  public AuthResponse newUser(UserRequest user) {
    UserEntity userEntity = getEntity(user);
    Optional<RoleEntity> roleEntity = roleJpaRepository.findById(user.getIdRole());

    if (roleEntity.isEmpty()) {
      throw new EntityNotFoundException("Role not found");
    }
    Role role = Role.builder().id(roleEntity.get().getId()).name(roleEntity.get().getName()).build();
    userEntity.setRole(roleEntity.get());
    userEntity = userJpaRepository.save(userEntity);
  //  emailSenderService.sendRegistrationEmail(userEntity.getEmail());
    // return UserResponse.builder().id(userEntity.getId())
    //     .email(userEntity.getEmail())
    //     .firstName(userEntity.getFirstName())
    //     .lastName(userEntity.getLastName())
    //     .role(role)
    //     .address(userEntity.getAddress())

    //     .build();

    return AuthResponse.builder().token(JwtService.getToken(userEntity)).id(userEntity.getId()).build();
  }

  public UserResponse findUserById(Long id)  {
    UserEntity userEntity = userJpaRepository.findById(id).orElse(null);
    if (userEntity == null) {
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

  public List<UserResponse> findAll() {
    List<UserEntity> users = userJpaRepository.findAll();
    List<UserResponse> userResponses = new ArrayList<>();
    users.forEach(userEntity -> {
      Role role = Role.builder().id(userEntity.getRole().getId()).name(userEntity.getRole().getName()).build();
      userResponses.add(UserResponse.builder()
          .id(userEntity.getId())
          .email(userEntity.getEmail())
          .firstName(userEntity.getFirstName())
          .lastName(userEntity.getLastName())
          .role(role)
          .address(userEntity.getAddress())
          .build());
    });
    return userResponses;
  }

  private UserEntity getEntity(UserRequest user) {
    Optional<UserEntity> existingUser = userJpaRepository.findByEmail(user.getEmail());
    existingUser.ifPresent(nullUser -> {
      throw new EntityNotFoundException("User with this mail already exists");
    });

    UserEntity userEntity = new UserEntity();
    userEntity.setEmail(user.getEmail());
    userEntity.setFirstName(user.getFirstName());
    userEntity.setLastName(user.getLastName());
    userEntity.setAddress(user.getAddress());
    userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
    return userEntity;
  }

  public UserEntity findUserEntityById(Long id) {
    Optional<UserEntity> user =  userJpaRepository.findById(id);
    if (user.isEmpty()) {
      throw new EntityNotFoundException("User not found");
    }
    return user.get();
  }

}