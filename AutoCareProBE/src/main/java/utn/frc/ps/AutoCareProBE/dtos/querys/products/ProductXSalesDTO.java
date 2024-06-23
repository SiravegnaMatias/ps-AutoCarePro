package utn.frc.ps.AutoCareProBE.dtos.querys.products;

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
public class ProductXSalesDTO {
    private String productName;
    private Long salesQuantity;
}
