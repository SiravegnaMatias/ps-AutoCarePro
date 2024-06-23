package utn.frc.ps.AutoCareProBE.repositories.booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import utn.frc.ps.AutoCareProBE.Entities.booking.BookingDetailEntity;

public interface BookingDetailJpaRepository extends JpaRepository<BookingDetailEntity, Long>{
      @Query("SELECT bd.service.name, COUNT(bd) FROM BookingDetailEntity bd " +
           "JOIN bd.booking b WHERE b.status.id = 4 GROUP BY bd.service.name ORDER BY COUNT(bd) DESC")
    List<Object[]> findMostRequestedService();
}
