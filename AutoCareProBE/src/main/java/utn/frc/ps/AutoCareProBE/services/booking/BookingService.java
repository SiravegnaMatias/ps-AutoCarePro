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
import utn.frc.ps.AutoCareProBE.Entities.booking.StatusEntity;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;
import utn.frc.ps.AutoCareProBE.dtos.booking.BookingRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.booking.BookingResponseDTO;
import utn.frc.ps.AutoCareProBE.dtos.booking.DTOService;
import utn.frc.ps.AutoCareProBE.repositories.ServiceJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.BookingDetailJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.BookingJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.StatusJpaRepository;
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
@Autowired
private StatusJpaRepository statusJpaRepository;


    @Transactional
    public BookingResponseDTO newBooking(BookingRequestDTO booking) {
        UserEntity user = userService.findUserEntityById(booking.getUserId());
        VehicleEntity vehicle = vehicleService.getVehicleByEntity(booking.getVehicleId());

        BookingEntity bookingEntity = new BookingEntity();
        bookingEntity.setUser(user);
        bookingEntity.setVehicle(vehicle);
        bookingEntity.setDate(booking.getDate());
        bookingEntity.setAdditionalNotes(booking.getAdditionalNotes());
        bookingEntity.setStatus(getStatusRequested());
        bookingJpaRepository.save(bookingEntity);

    List<ServiceEntity> serviceEntities = getServices(booking.getServices());
    for(ServiceEntity service : serviceEntities){
        BookingDetailEntity bookingDetail = new BookingDetailEntity();
        bookingDetail.setBooking(bookingEntity);
        bookingDetail.setService(service);
        bookingDetailJpaRepository.save(bookingDetail);
    }

        

        return BookingResponseDTO.builder().date(bookingEntity.getDate())
                                        .services(booking.getServices()).
                                        vehicle(bookingEntity.getVehicle().getBrand() + " " + bookingEntity.getVehicle().getModel())
                                        .status(bookingEntity.getStatus().getName())    
                                        .build();
    }

    public List<BookingResponseDTO> findAllBookings() {
        List<BookingEntity> bookings = bookingJpaRepository.findAll();
        List<BookingResponseDTO> bookingResponseDTOs = new ArrayList<>();
        
        
        
        for(BookingEntity booking : bookings){
            List<BookingDetailEntity> bookingDetailEntities =  getBookingDetails(booking);
            List<DTOService> services = getServicesDTOs(bookingDetailEntities);
            
            BookingResponseDTO bookingResponseDTO = BookingResponseDTO.builder()
            .id(booking.getId())
            .date(booking.getDate())
            .vehicle(booking.getVehicle().getBrand() + " " + booking.getVehicle().getModel())
            .status(booking.getStatus().getName())
            .services(services)
            .statusId(booking.getStatus().getId())
            .build();
            bookingResponseDTOs.add(bookingResponseDTO);
        }
        return bookingResponseDTOs;
    }
    
   

    public List<BookingResponseDTO> findAllBookingsByUserId(Long userId) {
        List<BookingEntity> bookings = bookingJpaRepository.findByUserId(userId);
        List<BookingResponseDTO> bookingResponseDTOs = new ArrayList<>();
        for(BookingEntity booking : bookings){
            List<BookingDetailEntity> bookingDetailEntities =  getBookingDetails(booking);
            List<DTOService> services = getServicesDTOs(bookingDetailEntities);
            BookingResponseDTO bookingResponseDTO = BookingResponseDTO.builder()
            .id(booking.getId())
            .date(booking.getDate())
            .vehicle(booking.getVehicle().getBrand() + " " + booking.getVehicle().getModel())
            .status(booking.getStatus().getName())
            .statusId(booking.getStatus().getId())
            .services(services)
            .build();
            bookingResponseDTOs.add(bookingResponseDTO);
        }
        return bookingResponseDTOs;
    }
    
    public BookingResponseDTO findBookingById(Long id) {
        Optional<BookingEntity> booking = bookingJpaRepository.findById(id);
        if(booking.isEmpty()){
            throw new RuntimeException("Booking not found");
        }
        List<BookingDetailEntity> bookingDetailEntities =  getBookingDetails(booking.get());
        List<DTOService> services = getServicesDTOs(bookingDetailEntities);
        return BookingResponseDTO.builder()
        .id(booking.get().getId())
        .date(booking.get().getDate())
        .vehicle(booking.get().getVehicle().getBrand() + " " + booking.get().getVehicle().getModel())
        .status(booking.get().getStatus().getName())
        .statusId(booking.get().getStatus().getId())
        .services(services)
        .build();
    }

    public BookingResponseDTO updateBookingStatus(Long id, Long status) {
        Optional<BookingEntity> booking = bookingJpaRepository.findById(id);
        if(booking.isEmpty()){
            throw new RuntimeException("Booking not found");
        }
        Optional<StatusEntity> statusEntity = statusJpaRepository.findById(status);
        if(statusEntity.isEmpty()){
            throw new RuntimeException("Status not found");
        }
        booking.get().setStatus(statusEntity.get());
        bookingJpaRepository.save(booking.get());

        List<BookingDetailEntity> bookingDetailEntities =  getBookingDetails(booking.get());
        List<DTOService> services = getServicesDTOs(bookingDetailEntities);
        return BookingResponseDTO.builder()
        .id(booking.get().getId())
        .date(booking.get().getDate())
        .vehicle(booking.get().getVehicle().getBrand() + " " + booking.get().getVehicle().getModel())
        .status(booking.get().getStatus().getName())
        .statusId(booking.get().getStatus().getId())
        .services(services)
        .build();
    }
    
    
    //METODOS DE APOYO
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

    private StatusEntity getStatusRequested(){
        Optional<StatusEntity> status = statusJpaRepository.findById(1L);
        if(status.isEmpty()){
            throw new RuntimeException("Status not found");
        }

        return status.get();
    
    }

    private List<DTOService> getServicesDTOs(List<BookingDetailEntity> bookingDetailEntities) {
        List<DTOService> services = new ArrayList<>();
        for(BookingDetailEntity bookingDetail : bookingDetailEntities){
            services.add(DTOService.builder()
                                .name(bookingDetail.getService().getName())
                                .price(bookingDetail.getService().getPrice())
                                .description(bookingDetail.getService().getDescription())
                                .image(bookingDetail.getService().getImage())
                            .build());
        }
        return services;
    }

    private List<BookingDetailEntity> getBookingDetails(BookingEntity booking) {
        return booking.getBookingDetails();
    }

   
}
