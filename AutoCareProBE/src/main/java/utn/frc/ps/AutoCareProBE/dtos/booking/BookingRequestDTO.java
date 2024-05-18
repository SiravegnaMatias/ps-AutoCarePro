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
public class BookingRequestDTO {
    private Long userId;
    private String date;
    private Long vehicleId;
    private String additionalNotes;
    private List<DTOService> services;
}
