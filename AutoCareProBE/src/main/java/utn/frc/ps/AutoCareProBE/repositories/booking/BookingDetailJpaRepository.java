package utn.frc.ps.AutoCareProBE.repositories.booking;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.booking.BookingDetailEntity;

public interface BookingDetailJpaRepository extends JpaRepository<BookingDetailEntity, Long>{
    
}
