package utn.frc.ps.AutoCareProBE.controllers.ecommerce;

import lombok.RequiredArgsConstructor;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.SupplierDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.SupplierRequestDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.SupplierService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/suppliercontroller")
@CrossOrigin("http://localhost:4200")

public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping()
    public ResponseEntity<List<SupplierDTO>> findAll() {
       return ResponseEntity.ok(supplierService.findAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> find(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.findSupplierById(id));
    }

    @PostMapping()
    public ResponseEntity<SupplierDTO> create(@RequestBody SupplierRequestDTO supplier) {
       return ResponseEntity.ok(supplierService.newSupplier(supplier));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody SupplierRequestDTO dto) {
       return ResponseEntity.ok(supplierService.updateSupplier(dto));
    }

  
}
