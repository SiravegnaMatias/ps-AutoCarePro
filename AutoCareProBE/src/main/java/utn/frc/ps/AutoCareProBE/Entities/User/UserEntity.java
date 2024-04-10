package utn.frc.ps.AutoCareProBE.Entities.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



    @Table(name = "users")
    @Entity
   
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
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
    }
