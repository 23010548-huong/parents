// api.js - File chuẩn bị cho việc kết nối API thực tế
// Các hàm ở đây sẽ thay thế cho việc lấy dữ liệu cứng trong data.js sau khi backend hoàn thành

const API_BASE_URL = 'http://localhost:5000/api'; // Trỏ tới domain thực tế

export async function fetchStudentProfile(studentId) {
    // TODO: Kết nối API thực tế
    /*
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error("Lỗi khi tải thông tin cá nhân");
    return await response.json();
    */
    console.log(`[API Mock] Đang gọi API lấy thông tin học sinh: ${studentId}...`);
    return null; 
}

export async function fetchStudentGrades(studentId, semester) {
    // TODO: Kết nối API thực tế
    /*
    const response = await fetch(`${API_BASE_URL}/students/${studentId}/grades?semester=${semester}`);
    return await response.json();
    */
    console.log(`[API Mock] Đang gọi API lấy điểm số học sinh: ${studentId}...`);
    return [];
}

export async function fetchTuitionInfo(studentId) {
    // TODO: Kết nối API thực tế
    /*
    const response = await fetch(`${API_BASE_URL}/students/${studentId}/tuition`);
    return await response.json();
    */
    console.log(`[API Mock] Đang gọi API lấy thông tin học phí...`);
    return [];
}

export async function initializeAppData() {
    try {
        console.log("[API Configuration] Chuẩn bị kết nối đến Backend API...");
        // Gọi các API tổng hoặc kiểm tra kết nối tại đây
    } catch (error) {
        console.error("Lỗi cấu hình API:", error);
    }
}
