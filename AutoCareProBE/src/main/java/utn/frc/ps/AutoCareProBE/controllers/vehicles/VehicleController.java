package utn.frc.ps.AutoCareProBE.controllers.vehicles;

import lombok.RequiredArgsConstructor;
import utn.frc.ps.AutoCareProBE.dtos.vehicle.VehicleRequestDTO;
import utn.frc.ps.AutoCareProBE.models.Vehicle;
import utn.frc.ps.AutoCareProBE.services.vehicles.VehicleService;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        try {
            //TODO Implement Your Logic To Get Data From Service Layer Or Directly From Repository Layer
            return new ResponseEntity<>("GetAll Results", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> find(@PathVariable Integer id) {
        try {
            //TODO Implement Your Logic To Get Data From Service Layer Or Directly From Repository Layer
            return new ResponseEntity<>("GetOne Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<Vehicle> create(@RequestBody VehicleRequestDTO vehicle) {
      return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }

    
}
