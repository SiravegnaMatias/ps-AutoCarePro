package utn.frc.ps.AutoCareProBE.controllers.ecommerce;

import lombok.RequiredArgsConstructor;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductRequestDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.ProductService;

import java.net.http.HttpResponse.ResponseInfo;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@CrossOrigin("http://localhost:4200")

public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping()
    public ResponseEntity<List<ProductDTO>> findAll() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> find(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));

    }

    @PostMapping()
    public ResponseEntity<ProductDTO> create(@RequestBody ProductRequestDTO product) {
        return ResponseEntity.ok(productService.newProduct(product));
    }

    @PutMapping()
    public ResponseEntity<ProductDTO> update(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.updateProduct(productDTO));
       
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> delete(@PathVariable Integer id) {
    //     try {
    //         //TODO Implement Your Logic To Destroy Data And Return Result Through ResponseEntity
    //         return new ResponseEntity<>("Destroy Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
