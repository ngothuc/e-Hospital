package openerp.openerpresourceserver.controller;

import lombok.AllArgsConstructor;
import openerp.openerpresourceserver.entity.Appointment;
import openerp.openerpresourceserver.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = @Autowired)
@RequestMapping("/appointment")
public class AppointmentController {

    private AppointmentService appointmentService;

    @GetMapping
    public void syncAppointment(JwtAuthenticationToken token) {
        Jwt principal = (Jwt) token.getPrincipal();
        appointmentService.synchronizeAppointment(
                Integer.parseInt(principal.getClaim("preferred_username")),
                principal.getClaim("note"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable int id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok().body(appointment);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok().body(appointments);
    }

}
