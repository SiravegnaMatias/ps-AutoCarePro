package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderDetailEntity;

public interface OrderDetailEntityJpaRepository extends JpaRepository<OrderDetailEntity, Long>{
    
}
