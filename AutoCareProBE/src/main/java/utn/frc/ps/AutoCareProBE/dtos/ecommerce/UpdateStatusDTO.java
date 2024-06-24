package utn.frc.ps.AutoCareProBE.dtos.ecommerce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStatusDTO {
 private Long orderId;
 private Long statusId;   
}
