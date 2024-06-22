package utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartDTO;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long orderId;
    private String username;
    private String email;
    private String payment;
    private LocalDate date;
    private String status;
    
}
