import React, { useEffect, useState } from "react";
import { request } from "../../api";
import { StandardTable } from "erp-hust/lib/StandardTable";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AppointmentListView() {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    patientId: "",
    doctorId: "",
    receptionistId: "",
    healthCondition: "",
    preliminaryDiagnosis: "",
    definitiveDiagnosis: "",
    status: "",
    note: "",
  });

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    request("get", "/appointment/get-all", (res) => {
      setAppointments(res.data);
    });
  }, []);

  // Mở form edit và đổ dữ liệu vào
  const handleOpen = (rowData) => {
    setEditData(rowData);
    setOpen(true);
  };

  // Đóng form
  const handleClose = () => {
    setOpen(false);
  };

  // Xử lý khi người dùng nhập dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Gửi request PUT để cập nhật dữ liệu
  const handleSubmit = () => {
    request(
      "put", `/appointment/update/${editData.id}`,
      (res) => {
        alert("Cập nhật phiếu khám thành công");
        setOpen(false);

        // Cập nhật danh sách phiếu khám sau khi chỉnh sửa thành công
        setAppointments((prevAppointments) =>
          prevAppointments.map((item) =>
            item.id === editData.id ? res.data : item
          )
        );
      },
      {
        onError: (error) => {
          alert("Có lỗi xảy ra, vui lòng thử lại sau");
        },
      },
      editData
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu khám này không?")) {
      request(
        "delete", `appointment/delete/${id}`,
        (res) => {
          alert("Xóa phiếu khám thành công!");
          // Xóa phiếu khám khỏi danh sách hiện tại
          setAppointments((prevAppointments) =>
            prevAppointments.filter((item) => item.id !== id)
          );
        },
        {
          onError: (error) => {
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
          },
        }
      );
    }
  };

  // Cấu hình các cột cho bảng
  const columns = [
    { title: "Mã phiếu khám", field: "id" },
    { title: "Mã bệnh nhân", field: "patientId" },
    { title: "Mã bác sĩ", field: "doctorId" },
    { title: "Thời gian", field: "createdDate" },
    {
      title: "Hành động",
      render: (rowData) => (
        <div>
          <IconButton onClick={() => handleOpen(rowData)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(rowData.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <StandardTable
        title="Danh sách phiếu khám"
        columns={columns}
        data={appointments}
        options={{
          selection: false,
          pageSize: 20,
          search: true,
          sorting: true,
        }}
      />

      {/* Dialog hiển thị form chỉnh sửa */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa phiếu khám</DialogTitle>
        <DialogContent>
          <TextField
            name="patientId"
            label="Mã bệnh nhân"
            value={editData.patientId}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="doctorId"
            label="Mã bác sĩ"
            value={editData.doctorId}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="receptionistId"
            label="Mã lễ tân"
            value={editData.receptionistId}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="healthCondition"
            label="Tình trạng sức khỏe"
            value={editData.healthCondition}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="preliminaryDiagnosis"
            label="Chẩn đoán sơ bộ"
            value={editData.preliminaryDiagnosis}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="definitiveDiagnosis"
            label="Chẩn đoán cuối cùng"
            value={editData.definitiveDiagnosis}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="status"
            label="Trạng thái"
            value={editData.status}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="note"
            label="Ghi chú"
            value={editData.note}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AppointmentListView;
