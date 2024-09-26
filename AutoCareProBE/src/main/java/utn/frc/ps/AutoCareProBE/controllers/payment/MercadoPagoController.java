package utn.frc.ps.AutoCareProBE.controllers.payment;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

import utn.frc.ps.AutoCareProBE.dtos.ecommerce.CartItemDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.mp.MpResponse;
import utn.frc.ps.AutoCareProBE.services.mp.MercadoPagoService;

@RestController
@CrossOrigin("http://localhost:4200")
public class MercadoPagoController {

    @Autowired
    private MercadoPagoService mercadoPagoService;

    @Value("${mp.code}")
    private String mpToken;

    @RequestMapping(value = "/mp", method = RequestMethod.POST)
    public MpResponse getList(@RequestBody List<CartItemDTO> items) {
       String preference = mercadoPagoService.createPreference(items);
        MpResponse response =  new MpResponse(preference);
        return response;

    }

    // if(userBuyer == null) {throw new IllegalArgumentException("UserBuyer is
    // required");}
    // String title = userBuyer.getTitle();
    // int quantity = userBuyer.getQuantity();
    // int price = userBuyer.getUnit_price();

    // try{
    // MercadoPagoConfig.setAccessToken(mpToken);

    // //1. PREFRENCIA DE VENTA
    // PreferenceItemRequest itemRequest = PreferenceItemRequest.builder().
    // title(title)
    // .quantity(quantity)
    // .unitPrice(new BigDecimal(price))
    // .currencyId("ARS")
    // .build();
    // List<PreferenceItemRequest> items = new ArrayList<>();
    // items.add(itemRequest);

    // //2. Preferencia de control de sucesos
    // PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
    // .success("http://localhost:4200/success")
    // .failure("http://localhost:4200/failure")
    // .pending("http://localhost:4200/pending")
    // .build();

    // //ENSAMBLE DE PREFERENCIA

    // PreferenceRequest preferenceRequest = PreferenceRequest.builder()
    // .items(items)
    // .backUrls(backUrls)
    // .autoReturn("approved")
    // .build();

    // //3. CREO OBJETO CLIENTE PARA COMUNICAR CON MP
    // PreferenceClient client = new PreferenceClient();
    // Preference preference = client.create(preferenceRequest);

    // return preference.getId();
    // }catch(MPException | MPApiException e) { System.out.println(e); return
    // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear
    // la preferencia").toString();

    // }
}
