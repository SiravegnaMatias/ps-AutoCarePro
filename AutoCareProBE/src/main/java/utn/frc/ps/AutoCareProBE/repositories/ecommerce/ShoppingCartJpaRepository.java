package utn.frc.ps.AutoCareProBE.repositories.ecommerce;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ShoppingCartEntity;

public interface ShoppingCartJpaRepository extends JpaRepository<ShoppingCartEntity,Long>{  
} 
