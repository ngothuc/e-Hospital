package openerp.openerpresourceserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hospital_appointments")

public class Appointment {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    private int patient_id, doctor_id, receptionist_id;

    @CreatedDate
    @Column(name = "time")
    private Date createdDate;

    private  String health_condition, preliminary_diagnosis, definitive_diagnosis;

    private String status;

    private String note;

}
