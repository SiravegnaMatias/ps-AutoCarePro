package utn.frc.ps.AutoCareProBE.dtos.booking;

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
public class StatusDTO {
    private Long id;
    private String name;
}
