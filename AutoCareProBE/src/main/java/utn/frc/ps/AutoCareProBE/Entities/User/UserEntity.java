package utn.frc.ps.AutoCareProBE.Entities.User;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.Entities.vehicles.VehicleEntity;

@Table(name = "users")
@Entity

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private RoleEntity role;
    private String email;
    private String address;

    @NotNull
    private String password;

    @OneToMany(mappedBy = "user")
    private List<VehicleEntity> vehicles;
}
