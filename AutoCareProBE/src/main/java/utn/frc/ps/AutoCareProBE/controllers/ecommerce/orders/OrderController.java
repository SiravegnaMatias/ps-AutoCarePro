package utn.frc.ps.AutoCareProBE.controllers.ecommerce.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderResponseDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.orderServices.OrderService;

@RestController()
@RequestMapping("/orders")
@CrossOrigin("http://localhost:4200")
public class OrderController {
    
     @Autowired
     private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderResponseDTO> addOrder(@RequestBody OrderRequestDTO order) {
        return ResponseEntity.ok(orderService.createOrder(order));   
    }
}
