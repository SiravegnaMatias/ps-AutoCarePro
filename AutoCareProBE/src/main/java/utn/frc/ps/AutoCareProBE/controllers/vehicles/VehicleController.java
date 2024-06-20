package utn.frc.ps.AutoCareProBE.controllers.vehicles;

import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleResponseDTO;
import utn.frc.ps.AutoCareProBE.models.Vehicle;
import utn.frc.ps.AutoCareProBE.services.vehicles.VehicleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

   

    @GetMapping("/{id}")
    public ResponseEntity<List<VehicleResponseDTO>> findByUserId(@PathVariable Integer id) {
        return ResponseEntity.ok(vehicleService.findByUserId(id));
    }

    @PostMapping()
    public ResponseEntity<Vehicle> create(@RequestBody VehicleRequestDTO vehicle) {
      return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<VehicleResponseDTO> getCar(@PathVariable Long id) {
       return ResponseEntity.ok(vehicleService.getCarById(id));
    }
    
    @PutMapping("/edit/{id}")
    public ResponseEntity<VehicleResponseDTO> update(@PathVariable Long id, @RequestBody VehicleRequestDTO vehicle) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicle));
    }

    
}
