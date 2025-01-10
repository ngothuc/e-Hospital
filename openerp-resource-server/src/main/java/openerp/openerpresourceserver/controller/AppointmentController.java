package openerp.openerpresourceserver.controller;

import lombok.AllArgsConstructor;
import openerp.openerpresourceserver.entity.Appointment;
import openerp.openerpresourceserver.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        Appointment createdAppointment = appointmentService.createAppointment(appointment);
        return ResponseEntity.ok().body(createdAppointment);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
        Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
        return ResponseEntity.ok().body(updatedAppointment);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().body("Appointment deleted successfully");
    }

}
