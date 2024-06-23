package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderDetailEntity;

public interface OrderDetailEntityJpaRepository extends JpaRepository<OrderDetailEntity, Long>{
    @Query("SELECT od.product, SUM(od.cantidad) AS cantidad_vendida " +
           "FROM OrderDetailEntity od " +
           "JOIN od.order o " +
           "WHERE o.status.id = 1 " +
           "GROUP BY od.product")
    List<Object[]> findProductSalesCount();
}
