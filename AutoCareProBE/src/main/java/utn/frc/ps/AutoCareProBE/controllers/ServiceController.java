package utn.frc.ps.AutoCareProBE.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.frc.ps.AutoCareProBE.models.ServiceModel;
import utn.frc.ps.AutoCareProBE.services.service.ServiceService;

@RestController
@RequestMapping("/services")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping()
    public ResponseEntity<List<ServiceModel>> findAll() {
       return ResponseEntity.ok(serviceService.getServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceModel> find(@PathVariable Long id) {
       return ResponseEntity.ok(serviceService.getService(id));
    }

    @PostMapping()
    public ResponseEntity<ServiceModel> create(@RequestBody ServiceModel srv) {
        return ResponseEntity.ok(serviceService.createService(srv));
    }

}
