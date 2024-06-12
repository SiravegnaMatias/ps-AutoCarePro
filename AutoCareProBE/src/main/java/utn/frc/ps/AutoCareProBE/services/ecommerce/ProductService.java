package utn.frc.ps.AutoCareProBE.services.ecommerce;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CategoryEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.SupplierEntity;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductRequestDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.CategoryJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.SupplierJpaRepository;

@Service
public class ProductService {

    @Autowired
    private ProductJpaRepository productJpaRepository;
    @Autowired
    private CategoryJpaRepository categoryJpaRepository;
    @Autowired
    private SupplierJpaRepository supplierJpaRepository;

    public List<ProductDTO> findAllProducts() {
        return productJpaRepository.findAll().stream()
                .map(productEntity -> ProductDTO.builder()
                        .id(productEntity.getId())
                        .name(productEntity.getName())
                        .description(productEntity.getDescription())
                        .price(productEntity.getPrice())
                        .stock(productEntity.getStock())
                        .category(productEntity.getCategory().getName())
                        .image(productEntity.getImage())
                        .supplier(productEntity.getSupplier().getName())

                        .build())
                .toList();

    }

    public ProductDTO findById(Long id) {
        Optional<ProductEntity> prodOptional = productJpaRepository.findById(id);
        if (prodOptional.isEmpty()) {
            throw new EntityNotFoundException("Product not found");
        }
        ProductEntity productEntity = prodOptional.get();

        return ProductDTO.builder()
                .id(productEntity.getId())
                .name(productEntity.getName())
                .description(productEntity.getDescription())
                .price(productEntity.getPrice())
                .stock(productEntity.getStock())
                .category(productEntity.getCategory().getName())
                .image(productEntity.getImage())
                .supplier(productEntity.getSupplier().getName())

                .build();

    }

    public ProductDTO newProduct(ProductRequestDTO product) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setDescription(product.getDescription());
        productEntity.setPrice(product.getPrice());
        productEntity.setStock(product.getStock());
        productEntity.setImage(product.getImage());
        productEntity.setCategory(getCategoryById(product.getIdCategory()));
        productEntity.setSupplier(getSupplierById(product.getIdSupplier()));
        
        productEntity = productJpaRepository.save(productEntity);

        return ProductDTO.builder().id(productEntity.getId())
                                    .name(productEntity.getName())
                                    .description(productEntity.getDescription())
                                    .price(productEntity.getPrice())
                                    .stock(productEntity.getStock())
                                    .category(productEntity.getCategory().getName())
                                    .supplier(productEntity.getSupplier().getName())
                                .build();
       
    }

    public ProductDTO updateProduct(ProductDTO productDTO) {
        Optional<ProductEntity> productOptional = productJpaRepository.findById(productDTO.getId());
        if (productOptional.isEmpty()) {
            throw new EntityNotFoundException("Product not found");
        }

        ProductEntity productEntity = productOptional.get();
        productEntity.setName(productDTO.getName());
        productEntity.setDescription(productDTO.getDescription());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setStock(productDTO.getStock());
        productEntity.setCategory(getCategory(productDTO.getCategory()));
        productEntity.setSupplier(getSupplierByName(productDTO.getSupplier()));
        productEntity = productJpaRepository.save(productEntity);

        return ProductDTO.builder()
                .id(productEntity.getId())
                .name(productEntity.getName())
                .description(productEntity.getDescription())
                .price(productEntity.getPrice())
                .stock(productEntity.getStock())
                .category(productEntity.getCategory().getName())
                .image(productEntity.getImage())
                .supplier(productEntity.getSupplier().getName())
                
                .build();
    }

    private SupplierEntity getSupplierByName(String supplier) {
        Optional<SupplierEntity> supplierEntOptional = supplierJpaRepository.findByName(supplier);
        if (supplierEntOptional.isEmpty()) {
            throw new EntityNotFoundException("supplier not found");
        }
        return supplierEntOptional.get();
    }

    private CategoryEntity getCategory(String category) {
        Optional<CategoryEntity> categoryEntityOptional = categoryJpaRepository.findByName(category);
        if (categoryEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Category not found");
        }
        return categoryEntityOptional.get();
    }

    private CategoryEntity getCategoryById(Long category) {
        Optional<CategoryEntity> categoryEntityOptional = categoryJpaRepository.findById(category);
        if (categoryEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Category not found");
        }
        return categoryEntityOptional.get();
    }

    private SupplierEntity getSupplierById(Long idSupplier) {
        Optional<SupplierEntity> supplierEntityOptional = supplierJpaRepository.findById(idSupplier);
        if (supplierEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Supplier not found");
        }
        return supplierEntityOptional.get();
    }
}
