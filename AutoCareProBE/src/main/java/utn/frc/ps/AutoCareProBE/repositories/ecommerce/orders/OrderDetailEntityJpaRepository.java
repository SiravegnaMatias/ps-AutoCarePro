package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderDetailEntity;

public interface OrderDetailEntityJpaRepository extends JpaRepository<OrderDetailEntity, Long>{
    @Query("SELECT od.product, SUM(od.cantidad) AS cantidad_vendida " +
           "FROM OrderDetailEntity od " +
           "JOIN od.order o " +
           "WHERE o.status.id = 1 " +
           "GROUP BY od.product")
    List<Object[]> findProductSalesCount();


    @Query("SELECT od.product.name, SUM(od.cantidad) FROM OrderDetailEntity od " +
           "JOIN od.order o WHERE o.status.id = 1 AND o.orderDate BETWEEN :startDate AND :endDate " +
           "GROUP BY od.product.name ORDER BY SUM(od.cantidad) DESC")
    List<Object[]> findMostSoldProductByOrderStatusAndDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
