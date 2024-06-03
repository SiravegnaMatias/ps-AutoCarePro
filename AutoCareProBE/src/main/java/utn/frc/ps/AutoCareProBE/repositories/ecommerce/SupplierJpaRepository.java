package utn.frc.ps.AutoCareProBE.repositories.ecommerce;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.SupplierEntity;

public interface SupplierJpaRepository extends JpaRepository<SupplierEntity,Long>{
    Optional<SupplierEntity> findByName(String name);
}
