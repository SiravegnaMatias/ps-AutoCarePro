package utn.frc.ps.AutoCareProBE.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderProductDTO;
import utn.frc.ps.AutoCareProBE.dtos.ecommerce.orders.OrderResponseDTO;

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

    public void sendBookingConfirmationEmail(String toEmail, String bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Confirmación de Reserva - AutoCarePro");
        message.setText("Su reserva ha sido creada y está esperando ser aprobada. Consulte los detalles de su reserva en la seccios Mis Reservas");
        System.out.println("Sending booking confirmation email to: " + toEmail);
        mailSender.send(message);
    }

    public void sendBookingApprovedEmail(String toEmail, String bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Reserva aprobada - AutoCarePro");
        message.setText("Su reserva ha sido aprobada, por favor respete el horario asignado. "+
         "Aquí  los detalles de su reserva:\n" + bookingDetails);
        System.out.println("Sending booking approved email to: " + toEmail);
        mailSender.send(message);
    }

    public void sendBookingCanceled(String toEmail, String bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Su resera ha sido cancelada - AutoCarePro");
        message.setText("Por el momento no podemos concretar esta reserva, por favor intente en otra fecha/horariol:\n" + bookingDetails);
        System.out.println("Sending booking cancelled: " + toEmail);
        mailSender.send(message);
    }

    public void sendReadyForPickupEmail(String toEmail, String bookingDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Listo para Retirar - AutoCarePro");
        message.setText("Su vehículo está listo para ser retirado del taller. Aquí están los detalles de su reserva:\n" + bookingDetails);
        System.out.println("Sending ready for pickup email to: " + toEmail);
        mailSender.send(message);
    }

    public void sendOrderConfirmationEmail(String toEmail, OrderResponseDTO orderResponseDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demomsbiz@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Confirmación de Compra - AutoCarePro");

        StringBuilder text = new StringBuilder();
        text.append("Gracias por comprar en AutoCarePro. Aquí están los detalles de su compra:\n\n");
        text.append("ID de Compra: ").append(orderResponseDTO.getOrderId()).append("\n");
        text.append("Fecha: ").append(orderResponseDTO.getDate()).append("\n");
        text.append("Método de Pago: ").append(orderResponseDTO.getPayment()).append("\n\n");
        text.append("Productos:\n");
        for (OrderProductDTO product : orderResponseDTO.getProducts()) {
            text.append("- ").append(product.getName()).append(": ").append(product.getQuantity()).append(" unidad(es) a $").append(product.getPrice()).append(" c/u\n");
        }
        text.append("\nTotal a Pagar: $").append(orderResponseDTO.getTotal()).append("\n\n");
        text.append("Puede retirar su compra en nuestra sucursal de lunes a sábado de 09:00 a 19:00.\n\n");
        text.append("¡Gracias por confiar en AutoCarePro!");

        message.setText(text.toString());
        System.out.println("Sending order confirmation email to: " + toEmail);
        mailSender.send(message);
    }
}
