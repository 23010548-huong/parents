// data.js - Centralized student data and accessors
export const studentsData = [
    {
        id: "AD1256589",
        name: "Khuất Thanh Thảo",
        avatar: "https://i.pravatar.cc/150?img=11",
        classInfo: "Lớp 10A1 (2026-27)",
        division: "Tự nhiên",
        gender: "Nữ giới",
        dob: "15 Tháng Năm 2011",
        stats: {
            tuitionBalance: "5.000.000đ",
            tuitionTrend: { type: "success", text: "Hạn: 15/11/2026" },
            gpa: 8.5,
            gpaTrend: { type: "success", text: "+0.4 học kỳ này" },
            attendanceRate: "98%",
            attendanceTrend: { type: "success", text: "115/117 buổi" },
            rank: "Top 5",
            rankTrend: { type: "neutral", text: "Giữ vững vị trí" }
        },
        chartData: {
            yearly: {
                labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
                gpa: [7.5, 7.8, 8.2, 8.0, 8.5, 8.4, 8.7, 8.9, 9.0],
                attendance: [100, 98, 95, 100, 98, 96, 100, 98, 99]
            },
            semester1: {
                labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                gpa: [7.5, 7.8, 8.2, 8.0, 8.5],
                attendance: [100, 98, 95, 100, 98]
            }
        },
        radarData: {
            current: [9.0, 8.5, 7.0, 9.5, 7.5, 8.0],
            target: [8.5, 8.5, 8.0, 9.0, 8.0, 8.5]
        },
        classesToday: [
            { subject: "Toán học", time: "07:00 - 08:30", status: "Đã điểm danh", statusClass: "badge-success" },
            { subject: "Ngữ văn", time: "08:45 - 10:15", status: "Đã điểm danh", statusClass: "badge-success" },
            { subject: "Ngoại khóa Tiếng Anh", time: "14:00 - 16:00", status: "Chưa bắt đầu", statusClass: "badge-warning" }
        ],
        weeklySchedule: {
            morning: [
                ["Toán học", "Ngữ Văn", "Hóa học", "Vật lý", "Tiếng Anh"], // Mon
                ["Ngữ Văn", "Toán học", "Lịch sử", "Tin học", "Vật lý"], // Tue
                ["Hóa học", "Tiếng Anh", "Toán học", "Sinh học", "Địa lý"], // Wed
                ["Toán học", "Vật lý", "Tin học", "Công Nghệ", "GDCD"], // Thu
                ["Tiếng Anh", "Ngữ Văn", "Sinh học", "Toán học", "Hóa học"]  // Fri
            ],
            afternoon: [
                ["Mỹ thuật", "SHLL", "", "", ""],
                ["", "Kỹ năng sống", "", "", ""],
                ["Âm nhạc", "", "", "", ""],
                ["Thể dục", "", "", "", ""],
                ["SHLL", "", "", "", ""]
            ]
        },
        notices: [
            { type: "GV", color: "bg-blue", title: "Giáo viên chủ nhiệm", desc: "Nhà trường tổ chức tiêm phòng định kỳ vào thứ 6 tuần này.", date: "25 Tháng Mười 2026", isRead: false },
            { type: "QT", color: "bg-purple", title: "Quản trị viên", desc: "Nhắc nhở đóng học phí học kỳ 2 trước ngày 15/11.", date: "24 Tháng Mười 2026", isRead: true }
        ],
        grades: [
            { code: "AD52365", exam: "Kiểm tra 15 phút", subject: "Toán học", score: "8.5", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52365", exam: "Giữa kỳ 1", subject: "Hóa học", score: "7.0", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52365", exam: "Khảo sát chất lượng", subject: "Vật lý", score: "4.5", semester: 1, status: "Không thành công", statusClass: "badge-danger" },
            { code: "AD52365", exam: "Kiểm tra 1 tiết", subject: "Tiếng Anh", score: "9.0", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52366", exam: "Kiểm tra 15 phút", subject: "Ngữ văn", score: "8.0", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52367", exam: "Kiểm tra 15 phút", subject: "Sinh học", score: "7.5", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52368", exam: "Giữa kỳ 1", subject: "Toán học", score: "9.0", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52369", exam: "Kiểm tra 1 tiết", subject: "Hóa học", score: "8.5", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52370", exam: "Cuối học kỳ 1", subject: "Toán học", score: "9.5", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52371", exam: "Cuối học kỳ 1", subject: "Ngữ văn", score: "8.0", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD52372", exam: "Lớp 10 Kỳ 2", subject: "Toán học", score: "8.5", semester: 2, status: "Vượt qua", statusClass: "badge-success" }
        ],
        events: [
            { color: "event-orange", time: "09:00 - 11:00 SÁNG", title: "Họp phụ huynh giữa kỳ", desc: "Dẫn dắt bởi GVCN Nguyễn Thị B" },
            { color: "event-blue", time: "14:00 - 16:30 CHIỀU", title: "Lễ hội thể thao trường", desc: "Tham gia tại Sân vận động" },
            { color: "event-green", time: "08:00 - 09:30 SÁNG", title: "Ngoại khóa: Kỹ năng sống", desc: "Tại hội trường lớn" }
        ],
        attendanceCalendar: [
            { day: 1, type: "present" }, { day: 2, type: "present" }, { day: 3, type: "absent" }, { day: 4, type: "present" }, { day: 5, type: "present" },
            { day: 8, type: "late" }, { day: 9, type: "present" }, { day: 10, type: "present" }, { day: 11, type: "present" }, { day: 12, type: "present" }
        ],
        tuitionInvoices: [
            { id: "INV-1025", period: "Học kỳ 1 (2026-27)", amount: "5.000.000đ", amountNum: 5000000, date: "10/08/2026", status: "Chưa đóng", statusClass: "badge-warning" },
            { id: "INV-0988", period: "Học kỳ 2 (2025-26)", amount: "4.500.000đ", amountNum: 4500000, date: "12/01/2026", status: "Đã đóng", statusClass: "badge-success" }
        ],
        teachers: [
            { id: "T1", type: "GV", color: "bg-blue", name: "Cô Nguyễn Thị B", role: "GVCN Lớp 10A1", lastActive: "Vừa mới truy cập", avatar: "GV" },
            { id: "T2", type: "QT", color: "bg-purple", name: "Phòng Hành Chính", role: "Hỗ trợ học phí...", lastActive: "2 giờ trước", avatar: "QT" }
        ],
        chatHistory: {
            "T1": [
                { type: "sys", text: "Hôm qua 09:30 AM" },
                { type: "receive", text: "Dạ chào anh/chị, em thấy cháu An dạo này học Toán rất tập trung và tiến bộ." },
                { type: "send", text: "Cảm ơn cô nhé. Nhờ cô quan tâm nhắc nhở cháu thêm." },
                { type: "sys", text: "10:15 AM" },
                { type: "receive", text: "Vâng, tuần sau trường có lịch tiêm phòng, anh/chị nhớ dặn cháu ăn sáng đầy đủ nhé." }
            ],
            "T2": [
                { type: "sys", text: "2 ngày trước" },
                { type: "receive", text: "Xin thông báo, biên lai học phí HK2 đã được xuất phần mềm. Phụ huynh vui lòng kiểm tra mục Học phí." }
            ]
        }
    }, {
        id: "AD9876543",
        name: "Lê Thị Thanh Hường",
        avatar: "https://i.pravatar.cc/150?img=5",
        classInfo: "Lớp 6A3 (2026-27)",
        division: "Cơ bản",
        gender: "Nữ giới",
        dob: "20 Tháng Mười 2015",
        stats: {
            tuitionBalance: "0đ",
            tuitionTrend: { type: "neutral", text: "Đã hoàn thành học kỳ này" },
            gpa: 9.2,
            gpaTrend: { type: "success", text: "+0.1 học kỳ này" },
            attendanceRate: "100%",
            attendanceTrend: { type: "success", text: "117/117 buổi" },
            rank: "Top 2",
            rankTrend: { type: "success", text: "Tăng 1 hạng" }
        },
        chartData: {
            yearly: {
                labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
                gpa: [8.5, 8.8, 9.0, 9.1, 9.2, 9.2, 9.3, 9.4, 9.5],
                attendance: [100, 100, 100, 100, 100, 100, 100, 100, 100]
            },
            semester1: {
                labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                gpa: [8.5, 8.8, 9.0, 9.1, 9.2],
                attendance: [100, 100, 100, 100, 100]
            }
        },
        radarData: {
            current: [9.5, 8.0, 8.5, 9.0, 9.5, 9.0],
            target: [9.0, 8.5, 8.5, 9.0, 9.0, 9.0]
        },
        classesToday: [
            { subject: "Âm nhạc", time: "08:00 - 09:30", status: "Đã điểm danh", statusClass: "badge-success" }
        ],
        weeklySchedule: {
            morning: [
                ["Toán học", "Ngữ Văn", "Tiếng Anh", "Lịch sử", "Âm nhạc"],
                ["Địa lý", "Toán học", "Tiếng Anh", "Mỹ thuật", "Tự nhiên"],
                ["Toán học", "Ngữ Văn", "Tự nhiên", "Tiếng Anh", "Lịch sử"],
                ["Mỹ thuật", "Tự nhiên", "Toán học", "Tin học", "Sinh hoạt"],
                ["Lịch sử", "Địa lý", "Tiếng Anh", "Toán học", "SHLL"]
            ],
            afternoon: [
                ["NGOẠI KHÓA", "", "", "", ""],
                ["", "", "", "", ""],
                ["THỂ DỤC", "", "", "", ""],
                ["", "", "", "", ""],
                ["SHLL", "", "", "", ""]
            ]
        },
        notices: [
            { type: "TD", color: "bg-teal", title: "Giáo viên thể dục", desc: "Học sinh mang giày thể thao cho tiết học ngày mai.", date: "26 Tháng Mười 2026", isRead: false }
        ],
        grades: [
            { code: "AD98765", exam: "Giữa kỳ 1", subject: "Toán", score: "9.5", semester: 1, status: "Vượt qua", statusClass: "badge-success" },
            { code: "AD98766", exam: "Kiểm tra 15 phút", subject: "Âm nhạc", score: "10", semester: 1, status: "Vượt qua", statusClass: "badge-success" }
        ],
        events: [
            { color: "event-blue", time: "14:00 - 15:30 CHIỀU", title: "Giao lưu câu lạc bộ mĩ thuật", desc: "Tầng 3 nhà B" }
        ],
        attendanceCalendar: [
            { day: 1, type: "present" }, { day: 2, type: "present" }, { day: 3, type: "present" }, { day: 4, type: "present" }, { day: 5, type: "present" }
        ],
        tuitionInvoices: [
            { id: "INV-1033", period: "Ngoại khóa Tiếng Anh", amount: "1.200.000đ", amountNum: 1200000, date: "15/09/2026", status: "Quá hạn", statusClass: "badge-danger" },
            { id: "INV-1026", period: "Học kỳ 1 (2026-27)", amount: "4.000.000đ", amountNum: 4000000, date: "05/08/2026", status: "Đã đóng", statusClass: "badge-success" }
        ],
        teachers: [
            { id: "T3", type: "TD", color: "bg-teal", name: "Thầy Lê Văn C", role: "GV Thể dục", lastActive: "Hoạt động 5p trước", avatar: "TD" }
        ],
        chatHistory: {
            "T3": [
                { type: "sys", text: "15:00 Hôm nay" },
                { type: "receive", text: "Chào phụ huynh, Bé có biểu hiện đau chân trong tiết thể dục. Gia đình lưu ý kiểm tra giúp nhé." }
            ]
        }
    }
];

// Determine active student
export function getActiveStudent() {
    let studentId = localStorage.getItem("activeStudentId");
    if (!studentId) {
        studentId = studentsData[0].id;
        localStorage.setItem("activeStudentId", studentId);
    }
    return studentsData.find(s => s.id === studentId) || studentsData[0];
}

export function setActiveStudent(id) {
    localStorage.setItem("activeStudentId", id);
    // Use an event or callback to trigger re-renders if needed
    window.dispatchEvent(new CustomEvent('studentChanged', { detail: { id } }));
}

