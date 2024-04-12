package utn.frc.ps.AutoCareProBE.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserRequest {
    private String firstName;
    private String lastName;
    private Long idRole;
    @Email(message = "format not valid")
    private String email;
    private String address;
   
    @NotNull(message = "Password is required")
    private String password;
}
