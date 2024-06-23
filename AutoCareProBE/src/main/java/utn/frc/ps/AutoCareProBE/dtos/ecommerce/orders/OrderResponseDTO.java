package utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.user.UserResponse;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long orderId;
    private UserResponse user;
    private LocalDate date;
    private BigDecimal total;
    private String payment;
    private String status;
    private List<OrderProductDTO> products;
    
}

/**
 * id
 * User (nombre mail, etc se muestra en el detalle del front)
 * payment
 * date
 * total
 * status 
 */