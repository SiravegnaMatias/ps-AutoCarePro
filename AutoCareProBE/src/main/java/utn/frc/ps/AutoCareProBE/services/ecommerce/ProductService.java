package utn.frc.ps.AutoCareProBE.services.ecommerce;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CategoryEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductRequestDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.CategoryJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;

@Service
public class ProductService {

    @Autowired
    private ProductJpaRepository productJpaRepository;
    @Autowired
    private CategoryJpaRepository categoryJpaRepository;

    public List<ProductDTO> findAllProducts() {
        return productJpaRepository.findAll().stream()
                                                .map(productEntity ->
                                                    ProductDTO.builder()
                                                    .id(productEntity.getId())
                                                    .name(productEntity.getName())
                                                    .description(productEntity.getDescription())
                                                    .price(productEntity.getPrice())
                                                    .stock(productEntity.getStock())
                                                    .category(productEntity.getCategory().getName())
                                                    .build()).toList();
        
 
    }

    public ProductDTO findById(Long id) {
       Optional<ProductEntity> prodOptional = productJpaRepository.findById(id);
        if(prodOptional.isEmpty()){
            throw new EntityNotFoundException("Product not found");
        }
        ProductEntity productEntity = prodOptional.get();

        return ProductDTO.builder().id(productEntity.getId())
                                    .name(productEntity.getName())
                                    .description(productEntity.getDescription())
                                    .price(null)
                                    .stock(null)
                                    .category(null)
                                .build();

    }

    public ProductDTO newProduct(ProductRequestDTO product) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setDescription(product.getDescription());
        productEntity.setPrice(product.getPrice());
        productEntity.setStock(product.getStock());
        productEntity = productJpaRepository.save(productEntity);

        return ProductDTO.builder().id(productEntity.getId())
                                    .name(productEntity.getName())
                                    .description(productEntity.getDescription())
                                    .price(productEntity.getPrice())
                                    .stock(productEntity.getStock())
                                    .category(productEntity.getCategory().getName())
                                .build();
       
    }

    public ProductDTO updateProduct(ProductDTO productDTO) {
        Optional<ProductEntity> productOptional = productJpaRepository.findById(productDTO.getId());
        if(productOptional.isEmpty()) {
            throw new EntityNotFoundException("Product not found");
        }

        ProductEntity productEntity = productOptional.get();
        productEntity.setName(productDTO.getName());
        productEntity.setDescription(productDTO.getDescription());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setStock(productDTO.getStock());
        productEntity.setCategory(getCategory(productDTO.getCategory()));
        productEntity = productJpaRepository.save(productEntity);

        return ProductDTO.builder().id(productEntity.getId())
                                    .name(productEntity.getName())
                                    .description(productEntity.getDescription())
                                    .price(productEntity.getPrice())
                                    .stock(productEntity.getStock())
                                    .category(productEntity.getCategory().getName())
                                .build();
    }

    private CategoryEntity getCategory(String category) {
        Optional<CategoryEntity> categoryEntityOptional = categoryJpaRepository.findByName(category);
        if(categoryEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Category not found");
        }
        return categoryEntityOptional.get();
    }
    
}
