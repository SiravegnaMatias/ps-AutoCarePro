package utn.frc.ps.AutoCareProBE.dtos.booking;

import java.math.BigDecimal;

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
public class DTOService {
    private String name;
    private String description;
    private BigDecimal price;
    private String image;
}
