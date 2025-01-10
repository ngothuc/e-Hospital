import React, {useEffect, useState} from "react";
import {request} from "../../api";
import {StandardTable} from "erp-hust/lib/StandardTable";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AppointmentListView() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        request("get", "/appointment/get-all", (res) => {
            setAppointments(res.data);
        }).then();
    }, [])

    const columns = [
        {
            title: "Mã phiếu khám",
            field: "id",
        },
        {
            title: "Mã bệnh nhân",
            field: "patient_id",
        },
        {
            title: "Mã bác sĩ",
            field: "doctor_id",
        },
        {
            title: "Thời gian",
            field: "time",
        }
    ];

    console.log(appointments);

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
        </div>
    );

}

export default AppointmentListView;