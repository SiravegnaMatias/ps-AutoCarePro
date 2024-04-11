package utn.frc.ps.AutoCareProBE.services.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.dtos.user.LoginDto;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;


@Service
public class AuthService {
    @Autowired
    private UserJpaRepository userJpaRepository;

    public boolean login(LoginDto login) {
      Optional<UserEntity> userEntity = userJpaRepository.findByEmail(login.getEmail());
        
      if (!userEntity.isPresent()) {
            throw new EntityNotFoundException ("User not found");
        }

        return userEntity.get().getPassword().equals(login.getPassword());
    }
}
