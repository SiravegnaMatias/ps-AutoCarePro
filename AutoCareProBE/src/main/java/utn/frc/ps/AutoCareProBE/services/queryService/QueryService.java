package utn.frc.ps.AutoCareProBE.services.queryService;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.Entities.User.UserEntity;
import utn.frc.ps.AutoCareProBE.Entities.ecommerce.ProductEntity;
import utn.frc.ps.AutoCareProBE.dtos.querys.clientsQueries.ClientXVehiclesDTO;
import utn.frc.ps.AutoCareProBE.dtos.querys.products.ProductXSalesDTO;
import utn.frc.ps.AutoCareProBE.dtos.querys.serviceQueries.ServiceRequestedDTO;
import utn.frc.ps.AutoCareProBE.repositories.User.UserJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.booking.BookingDetailJpaRepository;
import utn.frc.ps.AutoCareProBE.repositories.ecommerce.orders.OrderDetailEntityJpaRepository;

@Service
public class QueryService {
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private OrderDetailEntityJpaRepository orderDetailEntityJpaRepository;
    @Autowired
    private BookingDetailJpaRepository bookingDetailJpaRepository;

    public List<ClientXVehiclesDTO> getUserVehicleCounts(){
        List<Object[]> results = userJpaRepository.findUserVehicleCounts();
        List<ClientXVehiclesDTO> userVehicleCounts = new ArrayList<>();
        for (Object[] result : results) {
            String firstName = (String) result[0];
            String lastName = (String) result[1];
            Long vehicleCountLong  = (Long) result[2];
            String name = firstName + ' ' + lastName;
            Integer vehicleCount = vehicleCountLong.intValue();
            userVehicleCounts.add(new ClientXVehiclesDTO(name, vehicleCount));
        }
        return userVehicleCounts;
    }

     public List<ProductXSalesDTO> getProductSalesCount() {
        List<Object[]> results = orderDetailEntityJpaRepository.findProductSalesCount();
        List<ProductXSalesDTO> productSales = new ArrayList<>();

        for (Object[] row : results) {
            ProductEntity product = (ProductEntity) row[0];
            Long cantidad_vendida = (Long) row[1];

            ProductXSalesDTO dto = ProductXSalesDTO.builder()
                    .productName(product.getName())
                    .salesQuantity(cantidad_vendida)
                    .build();

            productSales.add(dto);
        }

        return productSales;
    }

    public List<ServiceRequestedDTO> getMostRequestedService() {
        List<Object[]> results = bookingDetailJpaRepository.findMostRequestedService();
        List<ServiceRequestedDTO> serviceRequests = new ArrayList<>();
        for (Object[] result : results) {
            String serviceName = (String) result[0];
            Long requestCount = (Long) result[1];
            serviceRequests.add(new ServiceRequestedDTO(serviceName, requestCount));
        }
        return serviceRequests;
    }

}
