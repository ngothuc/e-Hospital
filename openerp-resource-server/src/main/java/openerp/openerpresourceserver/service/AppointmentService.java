package openerp.openerpresourceserver.service;

import openerp.openerpresourceserver.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(int id);

    void synchronizeAppointment(int id, String note);

    Appointment createAppointment(Appointment appointment);

    Appointment updateAppointment(Appointment appointment);

    void deleteAppointment(int id);
}
