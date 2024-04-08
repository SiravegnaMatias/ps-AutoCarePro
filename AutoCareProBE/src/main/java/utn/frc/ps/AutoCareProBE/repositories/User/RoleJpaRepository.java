package utn.frc.ps.AutoCareProBE.repositories.User;

import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.User.RoleEntity;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface RoleJpaRepository extends JpaRepository<RoleEntity, Long>{   
    RoleEntity findByName(String name);
}