package utn.frc.ps.AutoCareProBE.repositories.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;


@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByEmail(String email);

     @Query("SELECT u.firstName, u.lastName, COUNT(v) FROM UserEntity u JOIN u.vehicles v GROUP BY u.id")
     List<Object[]> findUserVehicleCounts();
    } 