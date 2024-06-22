package utn.frc.ps.AutoCareProBE.services.ecommerce.orderServices;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderDetailEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderStatusEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.PaymentMethod;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderDetailDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderResponseDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderDetailEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderStatusJpaRepository;
import utn.frc.ps.AutoCareProBE.services.User.UserService;

@Service
public class OrderService {

    @Autowired
    private OrderEntityJpaRepository orderJpaRepository;

    @Autowired
    private OrderDetailEntityJpaRepository orderDetailEntityJpaRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductJpaRepository productJpaRepository;
    @Autowired
    private OrderStatusJpaRepository orderStatusJpaRepository;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        UserEntity user = userService.findUserEntityById(orderRequestDTO.getUserId());
        OrderStatusEntity status = orderStatusJpaRepository.findByName("APROBADA");

        // Verificar stock y restar
        for (OrderDetailDTO orderDetailDTO : orderRequestDTO.getOrderDetails()) {
            ProductEntity productEntity = productJpaRepository.findById(orderDetailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            if (productEntity.getStock() < orderDetailDTO.getQuantity()) {
                throw new RuntimeException("Stock not available for product: " + productEntity.getName());
            }
            productEntity.setStock(productEntity.getStock() - orderDetailDTO.getQuantity());
            productJpaRepository.save(productEntity);
        }

        for (OrderDetailDTO detail : orderRequestDTO.getOrderDetails()) {
            ProductEntity product = productJpaRepository.findById(detail.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            product.setStock(product.getStock() - detail.getQuantity());
            productJpaRepository.save(product);
        }

        // Cambiar al implementar mp
        OrderEntity finalOrder = OrderEntity.builder()
                .user(user)
                .orderDate(LocalDate.now())
                .status(status)
                .payment(PaymentMethod.PRESENCIAL)
                .detallesPedido(new ArrayList<>())
                .build();

        orderJpaRepository.save(finalOrder);

        for (OrderDetailDTO detail : orderRequestDTO.getOrderDetails()) {
            ProductEntity product = productJpaRepository.findById(detail.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            OrderDetailEntity orderDetail = OrderDetailEntity.builder()
                    .order(finalOrder)
                    .product(product)
                    .cantidad(detail.getQuantity())
                    .precioUnitario(product.getPrice())
                    .build();
            orderDetailEntityJpaRepository.save(orderDetail);
            finalOrder.getDetallesPedido().add(orderDetail);
        }

        // Actualizar la orden con los detalles
        orderJpaRepository.save(finalOrder);


        return OrderResponseDTO.builder()
        .orderId(finalOrder.getId())
        .username(user.getFirstName()+ " " + user.getLastName())
        .email(user.getEmail())
        .payment(finalOrder.getPayment().name())
        .date(finalOrder.getOrderDate())
        .status(finalOrder.getStatus().getName())
        .build();
        
    }
}

