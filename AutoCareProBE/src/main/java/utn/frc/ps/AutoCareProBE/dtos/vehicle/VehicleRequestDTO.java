package utn.frc.ps.AutoCareProBE.dtos.vehicle;

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
public class VehicleRequestDTO {
    private String model;
    private String brand;
    private String year;
    private String plate;
    private String carType;
    private Long userId;
}
