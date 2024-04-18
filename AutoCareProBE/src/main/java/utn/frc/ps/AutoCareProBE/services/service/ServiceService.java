package utn.frc.ps.AutoCareProBE.services.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ServiceEntity;
import utn.frc.ps.AutoCareProBE.models.ServiceModel;
import utn.frc.ps.AutoCareProBE.repositories.ServiceJpaRepository;

@Service
public class ServiceService {
    @Autowired
    private ServiceJpaRepository serviceJpaRepository;

    public ServiceModel createService(ServiceModel service) {
        ServiceEntity serviceEntity = getEntity(service);
        serviceJpaRepository.save(serviceEntity);
        return ServiceModel.builder().name(serviceEntity.getName())
                              .description(serviceEntity.getDescription())
                              .image(serviceEntity.getImage())
                              .price(serviceEntity.getPrice())
                              .build();
    }

    public ServiceModel getService(Long id) {
        ServiceEntity serviceEntity = serviceJpaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Service not found"));
        return ServiceModel.builder().name(serviceEntity.getName())
                              .description(serviceEntity.getDescription())
                              .image(serviceEntity.getImage())
                              .price(serviceEntity.getPrice())
                              .build();
    }

    public List<ServiceModel> getServices(){
        return serviceJpaRepository.findAll().stream().map(serviceEntity -> ServiceModel.builder().name(serviceEntity.getName())
                                                                                          .description(serviceEntity.getDescription())
                                                                                          .image(serviceEntity.getImage())
                                                                                          .price(serviceEntity.getPrice())
                                                                                          .build()).toList();
    }
    private ServiceEntity getEntity(ServiceModel service) {
        //VALIDAR SI EXISTE 
        ServiceEntity serviceEty = serviceJpaRepository.findByName(service.getName());
        if(serviceEty != null){
            throw new EntityExistsException("Service already exists");
        }
          ServiceEntity serviceEntity = new ServiceEntity();
          serviceEntity.setName(service.getName());
          serviceEntity.setDescription(service.getDescription());
          serviceEntity.setImage(service.getImage());
          serviceEntity.setPrice(service.getPrice());

          return serviceEntity;
    }
}
