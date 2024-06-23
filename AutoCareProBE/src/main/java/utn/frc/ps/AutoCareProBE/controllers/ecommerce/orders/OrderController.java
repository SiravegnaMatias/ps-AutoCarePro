package utn.frc.ps.AutoCareProBE.controllers.ecommerce.orders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderResponseDTO;
import utn.frc.ps.AutoCareProBE.dtos.querys.products.ProductXSalesDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.orderServices.OrderService;
import utn.frc.ps.AutoCareProBE.services.queryService.QueryService;


@RestController()
@RequestMapping("/orders")
@CrossOrigin("http://localhost:4200")
public class OrderController {
    
     @Autowired
     private OrderService orderService;
     @Autowired
     private QueryService queryService;

    @PostMapping("/add")
    public ResponseEntity<OrderResponseDTO> addOrder(@RequestBody OrderRequestDTO order) {
        return ResponseEntity.ok(orderService.createOrder(order));   
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(){
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/products-sales-count")
    public ResponseEntity<List<ProductXSalesDTO>> getProductSalesCount() {
        return ResponseEntity.ok(queryService.getProductSalesCount());
    }
    
}