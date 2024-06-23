package utn.frc.ps.AutoCareProBE.dtos.querys.serviceQueries;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestedDTO{
    private String serviceName;
    private Long requestCount;
}
