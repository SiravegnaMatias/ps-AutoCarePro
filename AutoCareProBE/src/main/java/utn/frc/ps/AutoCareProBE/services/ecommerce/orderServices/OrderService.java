package utn.frc.ps.AutoCareProBE.services.ecommerce.orderServices;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderDetailEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.OrderStatusEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.orders.PaymentMethod;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderDetailDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderResponseDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderDetailEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderStatusJpaRepository;
import utn.frc.ps.AutoCareProBE.services.User.UserService;
import utn.frc.ps.AutoCareProBE.services.ecommerce.ProductService;

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
    @Autowired 
    private ProductService productService;


    public List<OrderResponseDTO> getAllOrders() {
        List<OrderEntity> orders = orderJpaRepository.findAll();
        List<OrderResponseDTO> response = new ArrayList<>();
        for (OrderEntity order : orders) {
            response.add(getOrderResponseDTO(order));
        }
        return response;
    }

    public OrderResponseDTO getOrderById(Long id) {
        OrderEntity order = orderJpaRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return getOrderResponseDTO(order);
    }

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


        return getOrderResponseDTO(finalOrder);
        
    }

    private OrderResponseDTO getOrderResponseDTO(OrderEntity order) {
        return OrderResponseDTO.builder()
        .orderId(order.getId())
        .user(userService.findUserById(order.getUser().getId()))
        .payment(order.getPayment().name())
        .date(order.getOrderDate())
        .status(order.getStatus().getName())
        .total(getTotalOrder(order.getDetallesPedido()))
        .products(getProductsList(order.getDetallesPedido()))
        .build();
    }

    private List<OrderProductDTO> getProductsList(List<OrderDetailEntity> detallesPedido) {
        List<OrderProductDTO> products = new ArrayList<>();
        for (OrderDetailEntity orderDetailEntity : detallesPedido) {
            products.add(getOrderProductDTO(orderDetailEntity));;
        }
        return products;
    }

    private OrderProductDTO getOrderProductDTO(OrderDetailEntity orderDetailEntity) {
        ProductEntity productEntity = orderDetailEntity.getProduct();
        return OrderProductDTO.builder()
        .id(productEntity.getId())
        .name(productEntity.getName())
        .description(productEntity.getDescription())
        .price(productEntity.getPrice())
        .category(productEntity.getCategory().getName())
        .image(productEntity.getImage())
        .quantity(orderDetailEntity.getCantidad())  
        .build();
    }

    private BigDecimal getTotalOrder(List<OrderDetailEntity> detallesPedido) {
        BigDecimal total = BigDecimal.ZERO;
        for (OrderDetailEntity orderDetailEntity : detallesPedido) {
            total = total.add(orderDetailEntity.getPrecioUnitario().multiply(new BigDecimal(orderDetailEntity.getCantidad())));
        }
        return total;
    }

    

   
}

