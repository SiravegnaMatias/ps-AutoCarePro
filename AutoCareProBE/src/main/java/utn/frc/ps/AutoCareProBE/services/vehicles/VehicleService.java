package utn.frc.ps.AutoCareProBE.services.vehicles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleRequestDTO;
import utn.frc.ps.AutoCareProBE.models.User;
import utn.frc.ps.AutoCareProBE.models.Vehicle;
import utn.frc.ps.AutoCareProBE.repositories.VehicleJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.User.RoleJpaRepository;
import utn.frc.ps.AutoCareProBE.services.User.UserService;

@Service
public class VehicleService {

    @Autowired
    private VehicleJpaRepository vehicleJpaRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleJpaRepository roleJpaRepository;

    public Vehicle createVehicle(VehicleRequestDTO vehicleRequestDTO) {
        UserResponse userFromService = userService.findUserById(vehicleRequestDTO.getUserId());
        User user = getUser(userFromService);
        UserEntity userEntity = getUserEntity(user);
        VehicleEntity vehicleEntity = getVehicleEntity(vehicleRequestDTO, userEntity);
        Vehicle vehicle = getVehicle(vehicleEntity, user);

        vehicleJpaRepository.save(vehicleEntity);
        return vehicle;
        
    }

  

    private Vehicle getVehicle(VehicleEntity vehicleEntity, User user) {
        return Vehicle.builder().brand(vehicleEntity.getBrand())
                .carType(vehicleEntity.getCarType())
                .model(vehicleEntity.getModel())
                .plate(vehicleEntity.getPlate())
                .user(user)
                .year(vehicleEntity.getYear())
                .build();
    }

    private VehicleEntity getVehicleEntity(VehicleRequestDTO vehicleRequestDTO, UserEntity userEntity) {
       return VehicleEntity.builder().brand(vehicleRequestDTO.getBrand())
                .carType(vehicleRequestDTO.getCarType())
                .model(vehicleRequestDTO.getModel())
                .plate(vehicleRequestDTO.getPlate())
                .user(userEntity)
                .year(vehicleRequestDTO.getYear())
                .build();
    }

    private UserEntity getUserEntity(User user) {
        RoleEntity roleEntity = roleJpaRepository.findByName(user.getRole().getName());
       return UserEntity.builder().address(user.getAddress())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .id(user.getId())
                .lastName(user.getLastName())
                .role(roleEntity)
                .build();
    }

    private User getUser(UserResponse user) {
        return User.builder().address(user.getAddress())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .id(user.getId())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
}
