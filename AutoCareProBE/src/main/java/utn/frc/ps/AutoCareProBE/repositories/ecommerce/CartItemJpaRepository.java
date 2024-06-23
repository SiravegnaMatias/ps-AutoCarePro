package utn.frc.ps.AutoCareProBE.repositories.ecommerce;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.frc.ps.AutoCareProBE.Entities.ecommerce.CartItemEntity;

@Repository
public interface CartItemJpaRepository extends JpaRepository<CartItemEntity,Long>{
    void deleteAllByCartId(Long id);
}
