package utn.frc.ps.AutoCareProBE.controllers.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.frc.ps.AutoCareProBE.dtos.booking.StatusDTO;
import utn.frc.ps.AutoCareProBE.services.booking.StatusServices;

@RestController
@RequestMapping("/status")
@CrossOrigin(origins = "*")
public class StatusController {
    
    @Autowired
    private StatusServices statusServices;

    @GetMapping
    public ResponseEntity<List<StatusDTO>> getAll() {
        return  ResponseEntity.ok(statusServices.getAllStatus());
    }

    
}
