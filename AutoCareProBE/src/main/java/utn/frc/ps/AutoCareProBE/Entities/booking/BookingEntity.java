package utn.frc.ps.AutoCareProBE.Entities.booking;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bookings")
@Entity
@Builder
public class BookingEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private VehicleEntity vehicle;

    private String date;

    private String additionalNotes;
    
     @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<BookingDetailEntity> bookingDetails = new ArrayList<>();
}
