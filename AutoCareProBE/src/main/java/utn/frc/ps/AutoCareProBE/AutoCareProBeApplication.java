package utn.frc.ps.AutoCareProBE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class AutoCareProBeApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(AutoCareProBeApplication.class, args);
	}

}
	   		