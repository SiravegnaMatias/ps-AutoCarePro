package utn.frc.ps.AutoCareProBE.dtos.booking;

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
public class BookingResponseDTO {
    private Long id;
    private String date;
    private String  vehicle;
    private List<DTOService> services;
    private String status;
    private Long statusId;
}
