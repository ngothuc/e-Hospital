package openerp.openerpresourceserver.service;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import openerp.openerpresourceserver.entity.Appointment;
import openerp.openerpresourceserver.repo.AppointmentRepo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Log4j2
@AllArgsConstructor(onConstructor_ = @Autowired)
@Service
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentRepo appointmentRepo;

    @Override
    public List<Appointment> getAllAppointments() {
        List<Appointment> appointments = appointmentRepo.findAll();
        return appointments;
    }

    @Override
    public Appointment getAppointmentById(int id) {
        Optional<Appointment> appointment = appointmentRepo.findById(id);

        if (appointment.isEmpty()) {
            throw new NoSuchElementException("Not exist appointment with id " + id);
        }

        return appointment.get();

    }

    @Override
    public void synchronizeAppointment(int id) {
        Appointment appointment = appointmentRepo.findById(id).orElse(null);

        if (appointment == null) {
            appointmentRepo.save(Appointment.builder()
                    .id(id)
                    .build());
        }
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    @Override
    public Appointment updateAppointment(int id, Appointment appointment) {
        Appointment existingAppointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        existingAppointment.setPatientId(appointment.getPatientId());
        existingAppointment.setDoctorId(appointment.getDoctorId());
        existingAppointment.setReceptionistId(appointment.getReceptionistId());
        existingAppointment.setHealthCondition(appointment.getHealthCondition());
        existingAppointment.setPreliminaryDiagnosis(appointment.getPreliminaryDiagnosis());
        existingAppointment.setDefinitiveDiagnosis(appointment.getDefinitiveDiagnosis());
        existingAppointment.setStatus(appointment.getStatus());
        existingAppointment.setNote(appointment.getNote());

        return appointmentRepo.save(existingAppointment);
    }

    @Override
    public void deleteAppointment(int id) {
        appointmentRepo.deleteById(id);
    }
}
