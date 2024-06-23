package utn.frc.ps.AutoCareProBE.dtos.querys.clientsQueries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ClientXVehiclesDTO {
    private String name;
    private Integer vehiclesCount;
}