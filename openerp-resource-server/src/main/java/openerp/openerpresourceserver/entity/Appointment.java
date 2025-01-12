package openerp.openerpresourceserver.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(name = "patient_id")
    private int patientId;

    @Column(name = "doctor_id")
    private int doctorId;

    @Column(name = "receptionist_id")
    private int receptionistId;

    @CreatedDate
    @Column(name = "time")
    private Date createdDate;

    @Column(name = "health_condition")
    private String healthCondition;

    @Column(name = "preliminary_diagnosis")
    private String  preliminaryDiagnosis;

    @Column(name = "definitive_diagnosis")
    private String definitiveDiagnosis;

    @Column(name = "status")
    private String status;

    @Column(name = "note")
    private String note;

}
