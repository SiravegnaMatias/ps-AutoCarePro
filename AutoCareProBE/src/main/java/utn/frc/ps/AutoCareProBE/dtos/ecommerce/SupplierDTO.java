package utn.frc.ps.AutoCareProBE.dtos.ecommerce;

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
public class SupplierDTO {
    private Long id;
    private String name;
    private String contactInfo;
    private String address;
}
