package utn.frc.ps.AutoCareProBE.Entities.vehicles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "vehicles")
@AllArgsConstructor
@Builder
public class VehicleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    private String brand;
    @Column(name = "\"year\"")
    private String year;
    private String plate;
    private String carType;

    @ManyToOne
    private UserEntity user;
}

