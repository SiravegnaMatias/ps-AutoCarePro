package utn.frc.ps.AutoCareProBE.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;

@Service
public class EmailSenderService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Bienvenido a AutoCarePro");
        message.setText("Gracias por registrarte en AutoCarePro. Esperamos que disfrutes de nuestros servicios.");
        System.out.println("Sending email to: " + toEmail);
        mailSender.send(message);
    }
}
