package utn.frc.ps.AutoCareProBE.services.ecommerce;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CategoryEntity;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CategoryDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.CategoryJpaRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryJpaRepository categoryJpaRepository;

    public List<CategoryDTO> findAllCategories() {
        return categoryJpaRepository.findAll().stream()
                                .map(categoryEntity ->
                                 CategoryDTO.builder()
                                 .id(categoryEntity.getId())
                                 .name(categoryEntity.getName())
                                 .description(categoryEntity.getDescription())
                                 .build()).toList();
    }

    public CategoryDTO findCategoryById(Long id) {
       Optional< CategoryEntity> categoryEntityOptional = categoryJpaRepository.findById(id);
       if(categoryEntityOptional.isEmpty()){
            throw new EntityNotFoundException("Category not found");
       }

       CategoryEntity categoryEntity = categoryEntityOptional.get();

       return CategoryDTO.builder().id(categoryEntity.getId()).name(categoryEntity.getName()).description(categoryEntity.getDescription()).build();
    }
    
}
