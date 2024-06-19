package utn.frc.ps.AutoCareProBE.dtos.ecommerce;

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
public class CartItemDTO {
    public Long id;
    public ProductDTO product;
    public Integer quantity;


}
