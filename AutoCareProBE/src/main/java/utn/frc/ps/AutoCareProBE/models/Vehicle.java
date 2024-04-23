package utn.frc.ps.AutoCareProBE.models;

import org.springframework.boot.autoconfigure.batch.BatchDataSource;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Vehicle {
    private String model;
    private String brand;
    private String year;
    private String plate;
    private String carType;
    private User user;
}
