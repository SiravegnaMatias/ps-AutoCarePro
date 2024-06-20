package utn.frc.ps.AutoCareProBE.services.ecommerce;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CartEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CartItemEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartItemDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartRequestDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.ProductDTO;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.CartItemJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.CartJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.ProductJpaRepository;


@Service
public class CartService {

    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private ProductJpaRepository productJpaRepository;
    @Autowired
    private CartJpaRepository cartJpaRepository;
    @Autowired
    private CartItemJpaRepository cartItemJpaRepository;


    public CartDTO addItemToCart(CartRequestDTO cartRequestDTO, Integer quantity) {
    Optional<UserEntity> userOptional = userJpaRepository.findById(cartRequestDTO.getUserId());
    Optional<ProductEntity> productOptional = productJpaRepository.findById(cartRequestDTO.getProductId());

    if (userOptional.isEmpty() || productOptional.isEmpty()) {
        throw new RuntimeException("User or Product not found");
    }

    UserEntity user = userOptional.get();
    ProductEntity product = productOptional.get();

    CartEntity cart = cartJpaRepository.findByUserId(cartRequestDTO.getUserId()).orElseGet(() -> {
        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        newCart.setItems(new ArrayList<>());
        return newCart;
    });

    // Guardar el carrito si es nuevo
    if (cart.getId() == null) {
        cartJpaRepository.save(cart);
    }

    CartItemEntity item = cart.getItems()
            .stream()
            .filter(itemCart -> itemCart.getProduct().getId().equals(cartRequestDTO.getProductId()))
            .findFirst()
            .orElseGet(() -> {
                CartItemEntity newItem = new CartItemEntity();
                newItem.setCart(cart);
                newItem.setQuantity(0); // Inicializa la cantidad en 0
                return newItem;
            });

    item.setProduct(product);
    item.setQuantity(item.getQuantity() + quantity);

    cartItemJpaRepository.save(item);

    if (!cart.getItems().contains(item)) {
        cart.getItems().add(item);
    }
   CartEntity saved =  cartJpaRepository.save(cart);

    return getCartDTO(saved);
}

public CartDTO getCartByUser(Long id) {
    UserEntity user = userJpaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));

    CartEntity cart = cartJpaRepository.findByUserId(id).orElseGet(() -> {
        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        newCart.setItems(new ArrayList<>());
        return newCart;
    });
     return getCartDTO(cartJpaRepository.save(cart));

  
}

 

    public CartDTO removeItemFromCart(CartRequestDTO cartRequestDTO) {
       CartEntity cart = getCartByUserId(cartRequestDTO.getUserId());
       CartEntity saved = null;
        if (cart != null) {
            CartItemEntity cartItem = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(cartRequestDTO.getProductId()))
                    .findFirst()
                    .orElse(null);

            if (cartItem != null) {
                cart.getItems().remove(cartItem);
                cartItemJpaRepository.delete(cartItem);
               saved = cartJpaRepository.save(cart);
            }
        } else{
            throw new EntityNotFoundException("Cart not found");
        }
        return getCartDTO(saved);
    }

    
    public CartDTO updateQuantityCart(CartRequestDTO cart, Integer quantity) {
        CartEntity cartEntity = getCartByUserId(cart.getUserId());
        CartEntity saved = null;
        if (cartEntity != null) {
            CartItemEntity cartItem = cartEntity.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(cart.getProductId()))
                    .findFirst()
                    .orElse(null);

            if (cartItem != null) {
                cartItem.setQuantity(quantity);
                cartItemJpaRepository.save(cartItem);
                saved = cartJpaRepository.save(cartEntity);
            }
        } else{
            throw new EntityNotFoundException("Cart not found");
        }
        return getCartDTO(saved);
    }

    public CartEntity getCartByUserId(Long id){
        return cartJpaRepository.findByUserId(id).orElse(null);
    }

    private CartDTO getCartDTO(CartEntity cart){
        List<CartItemDTO> items = cart.getItems()
                .stream().map(itemCartS -> CartItemDTO.builder()
                        .id(itemCartS.getId())
                        .product(getCartProductDTO(itemCartS.getProduct()))
                        .quantity(itemCartS.getQuantity()).build())
                .toList();

        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .items(items)
                .build();
    }

    private ProductDTO getCartProductDTO(ProductEntity product) {
       
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .build();
    }
}
