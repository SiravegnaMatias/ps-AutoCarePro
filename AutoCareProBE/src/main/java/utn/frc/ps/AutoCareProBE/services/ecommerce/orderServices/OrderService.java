package utn.frc.ps.AutoCareProBE.services.ecommerce.orderServices;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderStatusDTO;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderDetailEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderEntityJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderStatusJpaRepository;
import utn.frc.ps.AutoCareProBE.services.User.UserService;
import utn.frc.ps.AutoCareProBE.services.ecommerce.ProductService;
import utn.frc.ps.AutoCareProBE.services.email.EmailSenderService;

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
    @Autowired
    private EmailSenderService emailSenderService;

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

        //actualizar esto cuando este la pasarela de pago
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

        emailSenderService.sendOrderConfirmationEmail(user.getEmail(), getOrderResponseDTO(finalOrder));

        return getOrderResponseDTO(finalOrder);

    }

    public OrderResponseDTO updateOrderStatus(Long orderId, Long statusId) {
        OrderEntity order = orderJpaRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        OrderStatusEntity status = orderStatusJpaRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Status not found"));
        order.setStatus(status);
        orderJpaRepository.save(order);
       
        return getOrderResponseDTO(order);

    }

    public List<OrderResponseDTO> getOrderByUser(Long id) {
        List<OrderEntity> orders = orderJpaRepository.findByUserId(id);
        List<OrderResponseDTO> response = new ArrayList<>();
        for (OrderEntity order : orders) {
            response.add(getOrderResponseDTO(order));
        }

        return response;
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
            products.add(getOrderProductDTO(orderDetailEntity));
            ;
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
            total = total.add(
                    orderDetailEntity.getPrecioUnitario().multiply(new BigDecimal(orderDetailEntity.getCantidad())));
        }
        return total;
    }

    public List<OrderResponseDTO> getOrdersbyEmailPurchaseStatus(String email, String statusName,
            LocalDate purchaseDate) {
        List<OrderEntity> orders = orderJpaRepository.findOrders(statusName, email, purchaseDate);
        return orders.stream().map(this::getOrderResponseDTO).collect(Collectors.toList());
    }

    public List<OrderStatusDTO> getStatus() {
        List<OrderStatusEntity> status = orderStatusJpaRepository.findAll();
        List<OrderStatusDTO> statusDtos = new ArrayList<>();

        for (OrderStatusEntity order : status) {
            statusDtos.add(OrderStatusDTO.builder()
                    .id(order.getId())
                    .name(order.getName())
                    .build());
        }

        return statusDtos;
    }

}
