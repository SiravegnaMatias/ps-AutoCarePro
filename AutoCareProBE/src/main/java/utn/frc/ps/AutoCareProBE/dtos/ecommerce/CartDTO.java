package utn.frc.ps.AutoCareProBE.dtos.ecommerce;

import java.util.List;

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
public class CartDTO {
    public Long id;
    public Long userId;
    public List<CartItemDTO> items;
}
