package utn.frc.ps.AutoCareProBE.Entities.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



    @Table(name = "users")
    @Entity
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class UserEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String firstName;
        private String lastName;
        @ManyToOne
        private RoleEntity role;
        private String email;
    }
