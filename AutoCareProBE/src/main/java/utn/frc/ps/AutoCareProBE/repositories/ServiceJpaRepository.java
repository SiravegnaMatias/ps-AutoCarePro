package utn.frc.ps.AutoCareProBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.ServiceEntity;


@Repository
public interface ServiceJpaRepository extends JpaRepository<ServiceEntity, Long>{
    ServiceEntity findByName(String name);
}
