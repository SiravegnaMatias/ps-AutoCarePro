package utn.frc.ps.AutoCareProBE.repositories.ecommerce;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CartEntity;

@Repository
public interface CartJpaRepository extends JpaRepository<CartEntity,Long>{  
    Optional<CartEntity> findByUserId(Long userId);
} 
