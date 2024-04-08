package utn.frc.ps.AutoCareProBE.repositories.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, Long>{
    
} 