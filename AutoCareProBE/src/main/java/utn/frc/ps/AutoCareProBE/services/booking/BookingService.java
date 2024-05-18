package utn.frc.ps.AutoCareProBE.services.booking;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import utn.frc.ps.AutoCareProBE.Entities.ServiceEntity;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.booking.BookingDetailEntity;
import utn.frc.ps.AutoCareProBE.Entities.booking.BookingEntity;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;
import utn.frc.ps.AutoCareProBE.dtos.booking.BookingRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.booking.DTOService;
import utn.frc.ps.AutoCareProBE.repositories.ServiceJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.BookingDetailJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.BookingJpaRepository;
import utn.frc.ps.AutoCareProBE.services.User.UserService;
import utn.frc.ps.AutoCareProBE.services.vehicles.VehicleService;

@Service
public class BookingService {
    
@Autowired
private BookingJpaRepository bookingJpaRepository;
@Autowired
private BookingDetailJpaRepository bookingDetailJpaRepository;
@Autowired
private ServiceJpaRepository serviceJpaRepository;
@Autowired
private VehicleService vehicleService;
@Autowired
private UserService userService;

    @Transactional
    public boolean newBooking(BookingRequestDTO booking) {
        UserEntity user = userService.findUserEntityById(booking.getUserId());
        VehicleEntity vehicle = vehicleService.getVehicleByEntity(booking.getVehicleId());

        BookingEntity bookingEntity = new BookingEntity();
        bookingEntity.setUser(user);
        bookingEntity.setVehicle(vehicle);
        bookingEntity.setDate(booking.getDate());
        bookingEntity.setAdditionalNotes(booking.getAdditionalNotes());

        bookingJpaRepository.save(bookingEntity);

    //    List<BookingDetailEntity> bookingDetails = booking.getServices().stream().map(serviceDto -> {
    //         ServiceEntity service = serviceJpaRepository.findByName(serviceDto.getName())
    //             .orElseThrow(() -> new ResourceNotFoundException("Service not found with ID: " + serviceDto.getId()));

    //         BookingDetailEntity bookingDetail = new BookingDetailEntity();
    //         bookingDetail.setBooking(bookingEntity);
    //         bookingDetail.setService(service);
    //         return bookingDetail;
    //     }).collect(Collectors.toList());
    List<ServiceEntity> serviceEntities = getServices(booking.getServices());
    for(ServiceEntity service : serviceEntities){
        BookingDetailEntity bookingDetail = new BookingDetailEntity();
        bookingDetail.setBooking(bookingEntity);
        bookingDetail.setService(service);
        bookingDetailJpaRepository.save(bookingDetail);
    }

        

        return true;
    }

    private List<ServiceEntity> getServices(List<DTOService> services){
        List<ServiceEntity> serviceEntities = new ArrayList<>();
        for(DTOService service : services){
           Optional< ServiceEntity> serviceEntity = serviceJpaRepository.findByName(service.getName());
            if(serviceEntity.isEmpty()){
                throw new RuntimeException("Service not found");
            }
            serviceEntities.add(serviceEntity.get());
        }
        return serviceEntities;
    }


}
