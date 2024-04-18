package utn.frc.ps.AutoCareProBE.models;

import java.math.BigDecimal;

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
public class ServiceModel {
    private String name;
    private String description;
    private String image;
    private BigDecimal price;
}
