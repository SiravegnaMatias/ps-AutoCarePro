package utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders;

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
public class OrderStatusDTO {
    private Long id;
    private String name;
}
