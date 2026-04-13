// i18n.js - Multi-language support (i18n)

const translations = {
    vi: {
        // Menu
        dashboard: "Tổng quan",
        tuition: "Học phí",
        schedule: "Lịch học",
        chat: "Liên hệ",
        logout: "Đăng xuất",
        
        // Header
        standardAccount: "Tài khoản Standard",
        childSelector: "Chọn học sinh",
        
        // Stats
        tuitionBalance: "Học phí cần đóng",
        gpa: "Điểm trung bình",
        attendance: "Chuyên cần",
        rank: "Hạng lớp",
        
        // Sections
        recentGrades: "Bảng điểm gần đây",
        notices: "Thông báo mới",
        events: "Sự kiện sắp tới",
        news: "Bản tin NineEdu",
        performanceAnalysis: "Phân tích Năng lực",
        gpaChart: "Biểu đồ Điểm số",
        attendanceChart: "Biểu đồ Chuyên cần",
        
        // Buttons
        exportPdf: "Xuất PDF",
        readMore: "Xem thêm",
        payNow: "Thanh toán",
        download: "Tải xuống",
        
        // Forms & Tables
        subject: "Môn học",
        score: "Điểm số",
        status: "Trạng thái",
        exam: "Kỳ thi",
        period: "Kỳ học",
        amount: "Số tiền",
        invoiceId: "Mã hóa đơn",
        noData: "Chưa có dữ liệu.",
        showing: "Hiển thị",
        of: "của",
        results: "kết quả"
    },
    en: {
        // Menu
        dashboard: "Dashboard",
        tuition: "Tuition",
        schedule: "Schedule",
        chat: "Messages",
        logout: "Logout",
        
        // Header
        standardAccount: "Standard Account",
        childSelector: "Select Student",
        
        // Stats
        tuitionBalance: "Tuition Balance",
        gpa: "Term GPA",
        attendance: "Attendance",
        rank: "Class Rank",
        
        // Sections
        recentGrades: "Recent Grades",
        notices: "New Notices",
        events: "Upcoming Events",
        news: "NineEdu News",
        performanceAnalysis: "Performance Analysis",
        gpaChart: "GPA Analytics",
        attendanceChart: "Attendance Stats",
        
        // Buttons
        exportPdf: "Export PDF",
        readMore: "Read more",
        payNow: "Pay now",
        download: "Download",
        
        // Forms & Tables
        subject: "Subject",
        score: "Score",
        status: "Status",
        exam: "Exam",
        period: "Period",
        amount: "Amount",
        invoiceId: "Invoice ID",
        noData: "No data available.",
        showing: "Showing",
        of: "of",
        results: "results"
    }
};

export function getLang() {
    return localStorage.getItem('lang') || 'vi';
}

export function setLang(lang) {
    localStorage.setItem('lang', lang);
    window.location.reload();
}

export function t(key) {
    const lang = getLang();
    return translations[lang][key] || key;
}

export function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = t(key);
    });
}

