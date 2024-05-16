package utn.frc.ps.AutoCareProBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;

@Repository
public interface VehicleJpaRepository extends JpaRepository<VehicleEntity, Long>{   
    List<VehicleEntity> findByUserId(Integer id);
}
