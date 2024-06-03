package utn.frc.ps.AutoCareProBE.repositories.ecommerce;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CategoryEntity;

public interface CategoryJpaRepository extends JpaRepository<CategoryEntity,Long>{
    Optional<CategoryEntity> findByName(String name);
}
