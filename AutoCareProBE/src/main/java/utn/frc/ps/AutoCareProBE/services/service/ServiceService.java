package utn.frc.ps.AutoCareProBE.services.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.ServiceEntity;
import utn.frc.ps.AutoCareProBE.dtos.servicesDTO.ServiceUpdateDTO;
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

    public ServiceModel getServiceByName(String name) {
        Optional<ServiceEntity> serviceEntity = serviceJpaRepository.findByName(name);
        if (serviceEntity.isEmpty()) {
            throw new EntityNotFoundException("Service not found");
        }
        return ServiceModel.builder().name(serviceEntity.get().getName())
                              .description(serviceEntity.get().getDescription())
                              .image(serviceEntity.get().getImage())
                              .price(serviceEntity.get().getPrice())
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

        Optional<ServiceEntity> serviceEty = serviceJpaRepository.findByName(service.getName());
        if(serviceEty.isPresent()){
            throw new EntityExistsException("Service already exists");
        }
          ServiceEntity serviceEntity = new ServiceEntity();
          serviceEntity.setName(service.getName());
          serviceEntity.setDescription(service.getDescription());
          serviceEntity.setImage(service.getImage());
          serviceEntity.setPrice(service.getPrice());

          return serviceEntity;
    }

    public ServiceModel updateService(ServiceUpdateDTO service) {
       Optional<ServiceEntity> serviceEntityOptional = serviceJpaRepository.findByName(service.getName());
        if(serviceEntityOptional.isEmpty()){
            throw new EntityNotFoundException("Service not found");
        }

        ServiceEntity serviceEntity = serviceEntityOptional.get();
       
        if(Objects.nonNull(service.getDescription())){
            serviceEntity.setDescription(service.getDescription());
        }
        if(Objects.nonNull(service.getPrice())){
            serviceEntity.setPrice(service.getPrice());
        }
        serviceJpaRepository.save(serviceEntity);
        return ServiceModel.builder().name(serviceEntity.getName())
                              .description(serviceEntity.getDescription())
                              .image(serviceEntity.getImage())
                              .price(serviceEntity.getPrice())
                              .build();
    }
}
