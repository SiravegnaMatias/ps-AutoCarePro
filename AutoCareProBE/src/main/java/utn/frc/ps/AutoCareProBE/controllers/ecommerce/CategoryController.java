package utn.frc.ps.AutoCareProBE.controllers.ecommerce;

import lombok.RequiredArgsConstructor;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CategoryDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.CategoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categorycontroller")
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping()
    public ResponseEntity<List<CategoryDTO>> findAll() {
        return ResponseEntity.ok(categoryService.findAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> find(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findCategoryById(id));
    }

  
}
