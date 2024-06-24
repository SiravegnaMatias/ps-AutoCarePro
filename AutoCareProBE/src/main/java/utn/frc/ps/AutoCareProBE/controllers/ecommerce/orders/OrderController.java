package utn.frc.ps.AutoCareProBE.controllers.ecommerce.orders;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @GetMapping("/most-sold-product")
public ResponseEntity<List<ProductXSalesDTO>> getMostSoldProductByStatusAndDateRange(
        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
    return ResponseEntity.ok(queryService.getMostSoldProductByStatusAndDateRange(startDate, endDate));
}

    @GetMapping("/filter")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByFilter(
            @RequestParam(required = false) String statusName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate purchaseDate) {
        return ResponseEntity.ok(orderService.getOrdersbyEmailPurchaseStatus(statusName, email, purchaseDate));
    }
}
