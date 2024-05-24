package utn.frc.ps.AutoCareProBE.repositories.booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.frc.ps.AutoCareProBE.Entities.booking.BookingEntity;

public interface BookingJpaRepository extends JpaRepository<BookingEntity, Long>{  
    List<BookingEntity> findByUserId(Long userId);
    
} 
