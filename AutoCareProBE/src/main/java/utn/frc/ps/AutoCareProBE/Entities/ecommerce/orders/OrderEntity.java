package utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@Builder

public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    //@Enumerated(EnumType.STRING) esto se agrega con el enum que hay que hacer
    private String estado; // Enum for order status

    @Column(nullable = false)
    private String metodoPago;

    //agregar columna de opcion de retiro en local


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetailEntity> detallesPedido;

}
