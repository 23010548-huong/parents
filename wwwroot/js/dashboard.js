// dashboard.js - Dashboard core logic
import { t } from './i18n.js';
import { renderList, setText, setTrend } from './utils.js';

let gradePage = 1;
const gradesPerPage = 5;
let filteredGrades = [];

export function renderDashboard(student) {
    if (!student) return;

    // 1. Stats Cards
    setText('tuitionBalance', student.stats.tuitionBalance);
    setTrend('tuitionTrend', student.stats.tuitionTrend);
    setText('gpaValue', student.stats.gpa);
    setTrend('gpaTrend', student.stats.gpaTrend);
    setText('attendanceRate', student.stats.attendanceRate);
    setTrend('attendanceTrend', student.stats.attendanceTrend);
    setText('rankValue', student.stats.rank);
    setTrend('rankTrend', student.stats.rankTrend);

    // Profile Details
    setText('profileName', student.name);
    setText('profileId', `: ${student.id}`);
    setText('profileClass', `: ${student.classInfo}`);
    setText('profileGvcn', `: ${student.gvcn}`);
    setText('profileDob', `: ${student.dob}`);

    // 2. Charts
    renderCharts(student);

    // 3. Classes Today
    renderList('classList', student.classesToday, (c) => `
        <div class="list-item">
            <div class="item-details">
                <h4>${c.subject}</h4>
                <p><i class="fa-regular fa-clock"></i> ${c.time}</p>
            </div>
            <span class="badge ${c.statusClass}">${c.status}</span>
        </div>
    `, "Không có môn học nào hôm nay.");

    // 4. Notices
    renderList('noticeList', student.notices, (notice, i) => `
        <div class="notice-item" style="cursor: pointer;" onclick="openNoticeModal(${i})">
            <div class="avatar-sm ${notice.color}">${notice.avatar || notice.type}</div>
            <div class="notice-content" style="flex:1;">
                <h4>${notice.title}</h4>
                <p>${notice.desc}</p>
                <div class="date">${notice.date}</div>
            </div>
            <div style="display:flex; align-items:center;">
                ${!notice.isRead ? '<span style="display:inline-block; width:8px; height:8px; background:var(--danger-text); border-radius:50%; margin-left:8px;"></span>' : ''}
            </div>
        </div>
    `, "Không có thông báo mới.");

    // 4. Grades with Pagination
    filteredGrades = [...student.grades];
    renderGradesTable();

    // 5. Events
    renderList('eventTimeline', student.events, (event) => `
        <div class="timeline-item">
            <div class="timeline-marker ${event.color}"></div>
            <div class="timeline-content">
                <p class="time">${event.time}</p>
                <p class="title">${event.title}</p>
                <p class="desc">${event.desc}</p>
            </div>
        </div>
    `, "Không có sự kiện sắp tới.");
}

function renderGradesTable() {
    const start = (gradePage - 1) * gradesPerPage;
    const end = start + gradesPerPage;
    const pageItems = filteredGrades.slice(start, end);

    const container = document.getElementById('gradesTableBody');
    if (!container) return;

    container.innerHTML = pageItems.map(g => `
        <tr>
            <td><strong>${g.code}</strong></td>
            <td>${g.exam}</td>
            <td>${g.subject}</td>
            <td class="fw-bold">${g.score}</td>
            <td><span class="badge ${g.statusClass}">${g.status}</span></td>
        </tr>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredGrades.length / gradesPerPage);
    const paginationContainer = document.getElementById('gradePagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = `
        <div class="pagination-info">${t('showing')} ${filteredGrades.length > 0 ? (gradePage - 1) * gradesPerPage + 1 : 0} - ${Math.min(gradePage * gradesPerPage, filteredGrades.length)} ${t('of')} ${filteredGrades.length}</div>
        <div class="pagination-btns">
            <button class="btn-icon" ${gradePage === 1 ? 'disabled' : ''} onclick="changeGradePage(${gradePage - 1})"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="page-num">${gradePage}</span>
            <button class="btn-icon" ${gradePage >= totalPages ? 'disabled' : ''} onclick="changeGradePage(${gradePage + 1})"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    `;
}

window.changeGradePage = function(page) {
    gradePage = page;
    renderGradesTable();
};

function renderCharts(student) {
    const lineCtx = document.getElementById('lineChart')?.getContext('2d');
    if (lineCtx) {
        if (window.lineChartInstance) window.lineChartInstance.destroy();
        window.lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: student.chartData.yearly.labels,
                datasets: [{
                    label: t('gpa'),
                    data: student.chartData.yearly.gpa,
                    borderColor: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#4285f4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { min: 0, max: 10, ticks: { stepSize: 1 } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const radarCtx = document.getElementById('radarChart')?.getContext('2d');
    if (radarCtx && student.radarData) {
        if (window.radarChartInstance) window.radarChartInstance.destroy();
        window.radarChartInstance = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh'],
                datasets: [{
                    label: t('currentCapability') || 'Năng lực hiện tại',
                    data: student.radarData.current,
                    borderColor: '#9c27b0',
                    backgroundColor: 'rgba(156, 39, 176, 0.2)',
                    pointBackgroundColor: '#9c27b0',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#9c27b0'
                }, {
                    label: t('targetCapability') || 'Mục tiêu',
                    data: student.radarData.target,
                    borderColor: '#a3aed1',
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#a3aed1',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#a3aed1',
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: {
                            font: { size: 12, family: "'Inter', sans-serif" }
                        },
                        ticks: { display: false, min: 5, max: 10 }
                    }
                }
            }
        });
    }
}

// Modal Handlers
export function setupNotificationModal() {
    const modal = document.getElementById('noticeModal');
    const closeBtns = document.querySelectorAll('.close-modal');
    closeBtns.forEach(btn => btn.onclick = () => modal.classList.remove('active'));
}

window.openNoticeModal = function(index) {
    import('./data.js').then(m => {
        const student = m.getActiveStudent();
        const notice = student.notices[index];
        document.getElementById('modalTitle').innerText = notice.title;
        document.getElementById('modalDesc').innerText = notice.desc;
        document.getElementById('modalDate').innerText = notice.date;
        document.getElementById('noticeModal').classList.add('active');
    });
};

export function setupDashboardActions() {
    // Quick Chat with Teacher
    const msgBtn = document.getElementById('msgGvcnBtn');
    if (msgBtn) {
        msgBtn.onclick = () => {
             window.location.href = "/Home/Chat";
        };
    }

    // Leave Request
    const leaveBtn = document.getElementById('requestLeaveBtn');
    if (leaveBtn) {
        leaveBtn.onclick = () => {
             if (typeof window.openLeaveModal === 'function') window.openLeaveModal();
        };
    }

    // Quick Payment (Dashboard)
    const payBtn = document.getElementById('quickPayBtn');
    if (payBtn) {
        payBtn.onclick = () => {
             if (typeof window.openPaymentModalGlobal === 'function') window.openPaymentModalGlobal();
        };
    }
}

