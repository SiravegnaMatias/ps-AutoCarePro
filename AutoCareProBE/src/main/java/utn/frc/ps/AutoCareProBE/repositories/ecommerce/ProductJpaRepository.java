package utn.frc.ps.AutoCareProBE.repositories.ecommerce;


import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;

public interface ProductJpaRepository extends JpaRepository<ProductEntity,Long>{
}
