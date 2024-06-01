package utn.frc.ps.AutoCareProBE.services.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.dtos.booking.StatusDTO;
import utn.frc.ps.AutoCareProBE.repositories.booking.StatusJpaRepository;

@Service
public class StatusServices {

    @Autowired
    private StatusJpaRepository statusJpaRepository;
    
    public List<StatusDTO> getAllStatus() {
        return statusJpaRepository.findAll().stream().map(status -> StatusDTO.builder()
                .id(status.getId())
                .name(status.getName())
                .build()).toList();
    }
}
