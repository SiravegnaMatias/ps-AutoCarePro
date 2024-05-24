package utn.frc.ps.AutoCareProBE.repositories.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.booking.StatusEntity;

@Repository
public interface StatusJpaRepository extends JpaRepository<StatusEntity, Long>{
}
