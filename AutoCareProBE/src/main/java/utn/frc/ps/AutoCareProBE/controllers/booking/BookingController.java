package utn.frc.ps.AutoCareProBE.controllers.booking;

import utn.frc.ps.AutoCareProBE.Entities.booking.BookingEntity;
import utn.frc.ps.AutoCareProBE.dtos.booking.BookingRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.booking.BookingResponseDTO;
import utn.frc.ps.AutoCareProBE.dtos.querys.serviceQueries.ServiceRequestedDTO;
import utn.frc.ps.AutoCareProBE.services.booking.BookingService;
import utn.frc.ps.AutoCareProBE.services.queryService.QueryService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private QueryService queryService;
    
    

    @Autowired
    private BookingService bookingService;


    @GetMapping()
    public ResponseEntity<List<BookingResponseDTO>  > findAll() {
       return ResponseEntity.ok(bookingService.findAllBookings()); 
    }

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDTO>  > findAllByUserId(@PathVariable Long userId) {
       return ResponseEntity.ok(bookingService.findAllBookingsByUserId(userId)); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> find(@PathVariable Long id) {
      return ResponseEntity.ok(bookingService.findBookingById(id));
    }
    @GetMapping("/cancel/{id}")
    public ResponseEntity<BookingResponseDTO> setStatus(@PathVariable Long id) {
      return ResponseEntity.ok(bookingService.setCancelledStatus(id));
    }

    @PostMapping()
    public ResponseEntity<BookingResponseDTO> create(@RequestBody BookingRequestDTO booking) {
        return ResponseEntity.ok(bookingService.newBooking(booking));
    }

 @PatchMapping("/{id}/status")
    public ResponseEntity<BookingResponseDTO> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, Long> update) {
        Long status = update.get("status");
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }

    // @PutMapping()
    // public ResponseEntity<?> update(@RequestBody Dto dto) {
    //     try {
    //         //TODO Implement Your Logic To Update Data And Return Result Through ResponseEntity
    //         return new ResponseEntity<>("Update Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            //TODO Implement Your Logic To Destroy Data And Return Result Through ResponseEntity
            return new ResponseEntity<>("Destroy Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/most-requested-service")
    public ResponseEntity<List<ServiceRequestedDTO>> getMostRequestedService() {
        return ResponseEntity.ok(queryService.getMostRequestedService());
    }
}
