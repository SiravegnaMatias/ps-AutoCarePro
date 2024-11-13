package utn.frc.ps.AutoCareProBE.services.booking;

import java.util.ArrayList;
import java.util.Comparator;
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
import utn.frc.ps.AutoCareProBE.services.email.EmailSenderService;
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

@Autowired
private EmailSenderService emailSenderService;


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

    bookingEntity = bookingJpaRepository.findById(bookingEntity.getId()).orElseThrow(() -> new RuntimeException("Booking not found"));

   String bookingDetails = getBookingDetailsForMail(bookingEntity,vehicle);

    

     emailSenderService.sendBookingConfirmationEmail(user.getEmail(), bookingDetails);


        return BookingResponseDTO.builder().date(bookingEntity.getDate())
                                        .services(booking.getServices()).
                                        vehicle(bookingEntity.getVehicle().getBrand() + " " + bookingEntity.getVehicle().getModel())
                                        .status(bookingEntity.getStatus().getName())    
                                        .build();
    }

    public List<BookingResponseDTO> findAllBookings() {
        List<BookingEntity> bookings = bookingJpaRepository.findAll();
        bookings.sort(Comparator.comparing(BookingEntity::getId).reversed());
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
        bookings.sort(Comparator.comparing(BookingEntity::getId).reversed());

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

        String email = booking.get().getUser().getEmail();
        
        if(status == 2){
            emailSenderService.sendBookingApprovedEmail(email, getBookingDetailsForMail(booking.get(), booking.get().getVehicle()));
        }

        if(status == 4){
            emailSenderService.sendReadyForPickupEmail(email, getBookingDetailsForMail(booking.get(), booking.get().getVehicle()));
        }
        
        if(status == 5){
            emailSenderService.sendReadyForPickupEmail(email, getBookingDetailsForMail(booking.get(), booking.get().getVehicle()));
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

    
    public BookingResponseDTO setCancelledStatus(Long id) {
       Optional<BookingEntity> bookingEntityOptional = bookingJpaRepository.findById(id);
       if (bookingEntityOptional.isEmpty()) {
           throw new RuntimeException("Booking not found");
       }
       BookingEntity bookingEntity = bookingEntityOptional.get();
       StatusEntity statusEntity = statusJpaRepository.findById(5L).get();
       bookingEntity.setStatus(statusEntity);

         bookingJpaRepository.save(bookingEntity);

        List<BookingDetailEntity> bookingDetailEntities =  getBookingDetails(bookingEntity);
        List<DTOService> services = getServicesDTOs(bookingDetailEntities);
        return BookingResponseDTO.builder()
        .id(bookingEntity.getId())
        .date(bookingEntity.getDate())
        .vehicle(bookingEntity.getVehicle().getBrand() + " " + bookingEntity.getVehicle().getModel())
        .status(bookingEntity.getStatus().getName())
        .statusId(bookingEntity.getStatus().getId())
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

    private List<String> getStringDetails(BookingEntity booking) {
        List<String> serviceDetails = new ArrayList<>();
        for (BookingDetailEntity bookingDetailEntity : booking.getBookingDetails()) {
            ServiceEntity service = bookingDetailEntity.getService();
            String serviceDetail = "Servicio: " + service.getName() + " - Precio: $" + service.getPrice();
            serviceDetails.add(serviceDetail);
        }
        return serviceDetails;
    }

    private String getBookingDetailsForMail(BookingEntity bookingEntity,VehicleEntity vehicle){
        List<String> serviceDetails = getStringDetails(bookingEntity);
        String bookingDetails = "ID de Reserva: " + bookingEntity.getId() + "\n" +
                            "Fecha: " + bookingEntity.getDate() + "\n" +
                            "Vehículo: " + vehicle.getBrand() + " " + vehicle.getModel() + "\n" +
                            "Estado: " + bookingEntity.getStatus().getName() + "\n" +
                            "Servicios: \n" + String.join("\n", serviceDetails);

        return bookingDetails;
    }
   
}
