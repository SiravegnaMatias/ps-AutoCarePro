package utn.frc.ps.AutoCareProBE.models;

import java.time.LocalDateTime;

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
public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private Role role;
    private String email;

    //Ver si creo el campo aca o lo pongo automaticamente en la bd
    //private LocalDateTime createdAt;
}
