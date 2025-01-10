
export const appointment = {
    id: "MENU_APPOINTMENT",
    icon: "Schedule",
    text: "Phiếu khám",
    child: [
        {
            id: "MENU_APPOINTMENT.ALL_APPOINTMENT",
            path: "/appointments-list-view",
            isPublic: true,
            text: "Danh sách phiếu khám",
            child: [],
        },
        {
            id: "MENU_APPOINTMENT.CREATE_APPOINTMENT",
            path: "/appointment-create",
            isPublic: true,
            text: "Tạo phiếu khám",
            child: [],
        },
        {
        },
    ],
};