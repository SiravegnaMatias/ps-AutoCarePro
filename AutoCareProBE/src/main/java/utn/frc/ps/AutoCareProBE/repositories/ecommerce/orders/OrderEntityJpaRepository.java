package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderEntity;

public interface OrderEntityJpaRepository extends JpaRepository<OrderEntity, Long>{

    
} 
