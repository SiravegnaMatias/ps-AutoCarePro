package utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderEntity;

public interface OrderEntityJpaRepository extends JpaRepository<OrderEntity, Long>{

     @Query("SELECT o FROM OrderEntity o " +
           "JOIN FETCH o.user u " +
           "JOIN FETCH o.status s " +
           "WHERE (:statusName IS NULL OR s.name = :statusName) AND " +
           "(:email IS NULL OR u.email LIKE %:email%) AND " +
           "(:purchaseDate IS NULL OR o.orderDate = :purchaseDate)")
    List<OrderEntity> findOrders(
            @Param("statusName") String statusName,
            @Param("email") String email,
            @Param("purchaseDate") LocalDate purchaseDate);


      List<OrderEntity> findByUserId(Long userId);
} 
