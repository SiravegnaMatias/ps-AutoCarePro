package utn.frc.ps.AutoCareProBE.controllers.ecommerce;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartRequestDTO;
import utn.frc.ps.AutoCareProBE.services.ecommerce.CartService;


@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:4200")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(@RequestBody CartRequestDTO cartRequestDTO,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addItemToCart(cartRequestDTO, quantity));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.getCartByUser(id));

    }

    
    @DeleteMapping("/remove")
    public ResponseEntity<CartDTO> removeItemFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        CartRequestDTO cartRequestDTO = new CartRequestDTO(userId, productId);
      return ResponseEntity.ok(cartService.removeItemFromCart(cartRequestDTO));
    }

    @PutMapping("update")
    public ResponseEntity<CartDTO> updateQuantity(@RequestBody CartRequestDTO cart,@RequestParam Integer quantity ) {
       return ResponseEntity.ok(cartService.updateQuantityCart(cart, quantity));
    }

    @DeleteMapping("/clear/{id}")
    public ResponseEntity<CartDTO> clearCart(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.clearCart(id));
    }

//faltaria agregar el de modificar cantidad de un item en el carrito

}