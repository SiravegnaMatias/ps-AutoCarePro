package utn.frc.ps.AutoCareProBE.services.mp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartItemDTO;

@Service
public class MercadoPagoService {

    @Value("${mp.code}")
    private String mpToken;

    public String createPreference(List<CartItemDTO> items) {

        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("Items list cannot be null or empty");
        }

        try {
            MercadoPagoConfig.setAccessToken(mpToken);
            // Remove the unreachable return statement

            // 1. PREFRENCIA DE VENTA
            List<PreferenceItemRequest> itemRequests = new ArrayList<>();

            for (CartItemDTO item : items) {
                PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                        .title(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getProduct().getPrice())
                        .description(item.getProduct().getDescription())
                        .currencyId("ARS")
                        .pictureUrl(item.getProduct().getImage())
                        .build();
                itemRequests.add(itemRequest);
            }

            // 2. Preferencia de control de sucesos
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:4200/success")
                    .failure("http://localhost:4200/failure")
                    .pending("http://localhost:4200/pending")
                    .build();

            // ENSAMBLE DE PREFERENCIA
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(itemRequests)
                    .backUrls(backUrls)
                    .autoReturn("approved")
                    .build();

            // 3. CREO OBJETO CLIENTE PARA COMUNICAR CON MP
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            return preference.getId();

        } catch (MPException | MPApiException e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la preferencia")
                    .toString();
        }
    }
}
