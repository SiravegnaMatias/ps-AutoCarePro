package utn.frc.ps.AutoCareProBE.dtos.ecommerce.userBuyer;

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
public class UserBuyerDTO {
    private String title;
    private int quantity;
    private int unit_price;
}
