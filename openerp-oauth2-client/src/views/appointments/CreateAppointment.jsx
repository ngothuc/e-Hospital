import React, { useState } from 'react';
import './CreateAppointment.css';
import { request } from '../../api';
import { use } from 'react';

function CreateAppointment() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    receptionist_id: '',
    createdDate: '',
    health_condition: '',
    preliminary_diagnosis: '',
    definitive_diagnosis: '',
    status: '',
    note: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const updatedFormData = {
      ...formData,
      createdDate: localDate,
      status: 'In Progress',
    };
    // Gửi dữ liệu updatedFormData đến API
    console.log(updatedFormData);

    request(
        'POST',
        '/appointment/create',
        (res) => {
          console.log('Response:', res.data);
          // Xử lý sau khi gửi thành công, ví dụ: hiển thị thông báo, chuyển trang, v.v.
          alert('Tạo phiếu khám thành công');
        },
        {
          onError: (error) => {
            console.error('Error:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
            alert('Có lỗi xảy ra, vui lòng thử lại sau');
          }
        },
        updatedFormData
      );
  };
  

  return (
    <div className="formContainer">
      <h1>Tạo phiếu khám</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>ID bệnh nhân:</label>
          <input type="number" name="patient_id" value={formData.patient_id} onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>ID bác sĩ:</label>
          <input type="number" name="doctor_id" value={formData.doctor_id} onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>ID lễ tân:</label>
          <input type="number" name="receptionist_id" value={formData.receptionist_id} onChange={handleChange} required />
        </div>
        <div className="formGroup" style={ {display: 'none'} }>
          <label>Created Date:</label>
          <input type="date" name="createdDate" value={formData.createdDate} onChange={handleChange} />
        </div>
        <div className="formGroup">
          <label>Tình trạng sức khỏe:</label>
          <textarea name="health_condition" value={formData.health_condition} onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Chẩn đoán sơ bộ:</label>
          <textarea name="preliminary_diagnosis" value={formData.preliminary_diagnosis} onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label>Chẩn đoán cuối cùng:</label>
          <textarea name="definitive_diagnosis" value={formData.definitive_diagnosis} onChange={handleChange} />
        </div>
        <div className="formGroup" style={ {display: 'none'} }>
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} defaultValue={"In Progress"} onChange={handleChange} />
        </div>
        <div className="formGroup">
          <label>Ghi chú:</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </div>
        <button type="submit" className="submitButton">Tạo phiếu khám</button>
      </form>
    </div>
  );
}

export default CreateAppointment;