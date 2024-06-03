package utn.frc.ps.AutoCareProBE.services.ecommerce;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.SupplierEntity;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.SupplierDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.SupplierRequestDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.SupplierJpaRepository;

@Service
public class SupplierService {

    @Autowired
    private SupplierJpaRepository supplierJpaRepository;

    public List<SupplierDTO> findAllSuppliers() {
        return supplierJpaRepository.findAll().stream().map(supplierEntity 
                                        -> SupplierDTO.builder()
                                        .id(supplierEntity.getId())
                                        .name(supplierEntity.getName())
                                        .contactInfo(supplierEntity.getContactInfo())
                                        .address(supplierEntity.getAddress())
                                        .build()).toList();
    }

    public SupplierDTO findSupplierById(Long id) {
        Optional<SupplierEntity> supplierEntityOptional = supplierJpaRepository.findById(id);
        if(supplierEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Supplier not found");
        }

        return SupplierDTO.builder()
                            .id(supplierEntityOptional.get().getId())
                            .name(supplierEntityOptional.get().getName())
                            .contactInfo(supplierEntityOptional.get().getContactInfo())
                            .address(supplierEntityOptional.get().getAddress())
                            .build();
    }

    public SupplierDTO newSupplier(SupplierRequestDTO supplier) {
        SupplierEntity supplierEntity = new SupplierEntity();
        supplierEntity.setName(supplier.getName());
        supplierEntity.setContactInfo(supplier.getContactInfo());
        supplierEntity.setAddress(supplier.getAddress());
        supplierEntity = supplierJpaRepository.save(supplierEntity);

        return SupplierDTO.builder()
                            .id(supplierEntity.getId())
                            .name(supplierEntity.getName())
                            .contactInfo(supplierEntity.getContactInfo())
                            .address(supplierEntity.getAddress())
                            .build();
    }

    public SupplierDTO updateSupplier(SupplierRequestDTO dto) {
        Optional<SupplierEntity> supplierEntityOptional = supplierJpaRepository.findByName(dto.getName());
        if(supplierEntityOptional.isEmpty()) {
            throw new EntityNotFoundException("Supplier not found");
        }

        SupplierEntity supplierEntity = supplierEntityOptional.get();
        supplierEntity.setName(dto.getName());
        supplierEntity.setContactInfo(dto.getContactInfo());
        supplierEntity.setAddress(dto.getAddress());
        supplierEntity = supplierJpaRepository.save(supplierEntity);

        return SupplierDTO.builder()
                            .id(supplierEntity.getId())
                            .name(supplierEntity.getName())
                            .contactInfo(supplierEntity.getContactInfo())
                            .address(supplierEntity.getAddress())
                            .build();
    }
    
}
