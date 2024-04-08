package utn.frc.ps.AutoCareProBE.controllers.ping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PingController {
    
    @GetMapping("/ping")
    public String ping() {
        return "Pong";
    }
    

}
