package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import org.springframework.data.jpa.repository.JpaRepository;

import io.jsonwebtoken.security.Jwks.OP;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderStatusEntity;

public interface OrderStatusJpaRepository extends JpaRepository<OrderStatusEntity, Long>{
        
        OrderStatusEntity findByName(String name);
}
