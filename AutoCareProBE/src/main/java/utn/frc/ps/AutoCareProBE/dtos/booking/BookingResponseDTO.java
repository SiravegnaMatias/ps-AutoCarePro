package utn.frc.ps.AutoCareProBE.dtos.booking;

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
public class BookingResponseDTO {
    private Long id;
    private String date;
    private String  vehicle;
    private DTOService[] services;
    private String status;
}
