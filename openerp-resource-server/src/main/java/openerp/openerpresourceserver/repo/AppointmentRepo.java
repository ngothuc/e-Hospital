package openerp.openerpresourceserver.repo;

import openerp.openerpresourceserver.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
}
