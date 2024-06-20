package utn.frc.ps.AutoCareProBE.services.vehicles;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;
import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleResponseDTO;
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

    public List<VehicleResponseDTO> findByUserId(Integer id) {
        List<VehicleEntity> vehicleEntities = vehicleJpaRepository.findByUserId(id);
        return vehicleEntities.stream().map(vehicleEntity -> VehicleResponseDTO.builder().id(vehicleEntity.getId())
                .brand(vehicleEntity.getBrand())
                .carType(vehicleEntity.getCarType())
                .model(vehicleEntity.getModel())
                .plate(vehicleEntity.getPlate())
                .year(vehicleEntity.getYear())
                .userId(vehicleEntity.getUser().getId())
                .build()).toList();
    }

//get autos supuestamente implementado, ahota habria que testear si funciona para luego hacer la conexion con el front
// despues de eso habria que hacer las validaciones de las dechas que capaz las deje para mas tarde y seguir con otros 
//componentes como la lista de usuarios, reservas hechas(detailers) y editarlas, pulir el front y ver que diije en el jira  

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

    public VehicleEntity getVehicleByEntity(Long id) {
      Optional<VehicleEntity> vehicleEntity = vehicleJpaRepository.findById(id);
        if (vehicleEntity.isEmpty()) {
            throw new EntityNotFoundException("Vehicle not found");
        }

        return vehicleEntity.get();
    }

    public VehicleResponseDTO updateVehicle(Long id,VehicleRequestDTO vehicle) {
        VehicleEntity vehicleEntity = getVehicleByEntity(id);
        vehicleEntity.setBrand(vehicle.getBrand());
        vehicleEntity.setCarType(vehicle.getCarType());
        vehicleEntity.setModel(vehicle.getModel());
        vehicleEntity.setPlate(vehicle.getPlate());
        vehicleEntity.setYear(vehicle.getYear());
        vehicleJpaRepository.save(vehicleEntity);
        return getDto(vehicleEntity);
    }

    public VehicleResponseDTO getCarById(Long id) {

        Optional<VehicleEntity> vehicleEntity = vehicleJpaRepository.findById(id);
        if (vehicleEntity.isEmpty()) {
            throw new EntityNotFoundException("Vehicle not found");
        }

        return getDto(vehicleEntity.get());
    }

    private VehicleResponseDTO getDto(VehicleEntity vehicleEntity) {
        return VehicleResponseDTO.builder().id(vehicleEntity.getId())
                .brand(vehicleEntity.getBrand())
                .carType(vehicleEntity.getCarType())
                .model(vehicleEntity.getModel())
                .plate(vehicleEntity.getPlate())
                .year(vehicleEntity.getYear())
                .userId(vehicleEntity.getUser().getId())
                .build();
    }
}
