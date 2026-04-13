// main.js - Main entry point
import { initializeAppData } from './api.js';
import { injectSidebar, initTheme } from './utils.js';
import { getActiveStudent } from './data.js';
import { t, translatePage } from './i18n.js';

// Page-specific imports
import { renderDashboard } from './dashboard.js';
import { renderTuitionPage } from './tuition.js';
import { renderChatPage } from './chat.js';

document.addEventListener('DOMContentLoaded', async function() {
    // 1. Initialize API Data (Placeholder)
    await initializeAppData();

    // 2. Load UI Components
    injectSidebar();
    initTheme();

    // 3. i18n Support
    translatePage();

    // 4. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 600, once: true, offset: 50 });
    }

    // 5. Initial Render Data
    const student = getActiveStudent();
    dispatchRender(student);

    // 6. Global Action Listeners
    setupGlobalActions();
    setupModalCore();
    
    // 7. Simulated Real-time Notifications
    setupNotificationSimulation();

    // 8. Listen for data changes
    window.addEventListener('studentChanged', (e) => {
        dispatchRender(getActiveStudent());
    });
});

function dispatchRender(student) {
    if (!student) return;
    
    if (document.getElementById('gpaValue')) {
        renderDashboard(student);
        // Setup dashboard-specific features (assuming these are exported functions in dashboard.js)
        import('./dashboard.js').then(m => {
             if (typeof m.setupNotificationModal === 'function') m.setupNotificationModal();
             if (typeof m.setupDashboardActions === 'function') m.setupDashboardActions();
        });

        // PDF Export binding
        const exportBtn = document.getElementById('exportGradesPdf');
        if(exportBtn) {
            exportBtn.onclick = () => {
                import('./report-generator.js').then(rg => rg.exportGradesToPdf());
            };
        }
    }

    
    if (document.getElementById('tuitionTableBody')) {
        renderTuitionPage(student);
    }

    if (document.getElementById('chatContactList')) {
        renderChatPage(student);
    }
}

function setupGlobalActions() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            dispatchRender(getActiveStudent());
        });
    }

    // Bell Notification Click
    const bell = document.getElementById('notificationBtn');
    if (bell) {
        bell.onclick = () => {
            const modal = document.getElementById('noticeModal');
            if (modal) {
                // Focus on summary view for all notices
                document.getElementById('modalTitle').innerText = t('notices');
                const student = getActiveStudent();
                let html = '<div class="notice-list-simple">';
                student.notices.forEach(n => {
                    html += `<div class="notice-item-mini"><strong>${n.title}</strong>: ${n.desc} <br><small>${n.date}</small></div>`;
                });
                html += '</div>';
                document.getElementById('modalDesc').innerHTML = html;
                document.getElementById('modalDate').innerText = "";
                modal.classList.add('active');
            }
        };
    }

    // Settings Gear Click (Assuming it exists, if not we add to sidebar/header)
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.onclick = () => {
            document.getElementById('settingsModal').classList.add('active');
        };
    }
}

function setupModalCore() {
    // Generic Close logic
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            btn.closest('.modal-overlay').classList.remove('active');
        };
    });

    // Leave Form Logic
    const leaveForm = document.getElementById('leaveForm');
    if (leaveForm) {
        leaveForm.onsubmit = (e) => {
            e.preventDefault();
            alert("Đã gửi đơn xin nghỉ phép thành công! Nhà trường sẽ phản hồi sớm nhất.");
            leaveForm.closest('.modal-overlay').classList.remove('active');
            leaveForm.reset();
        };
    }
}

function setupNotificationSimulation() {
    // Simulate a new notification after 15 seconds
    setTimeout(() => {
        const bell = document.getElementById('notificationBtn');
        if(bell) {
            bell.style.position = 'relative';
            const dot = document.createElement('span');
            dot.className = "notif-dot";
            dot.style = "position:absolute; top:8px; right:8px; width:10px; height:10px; background:var(--danger-text); border-radius:50%; border:2px solid var(--card-bg); animation: pulse 2s infinite;";
            bell.appendChild(dot);
            
            // Show Browser Notification if allowed
            if (Notification.permission === "granted") {
                new Notification("NineEdu: Thông báo mới", {
                    body: "Con bạn vừa có điểm kiểm tra mới môn Toán học.",
                    icon: "https://i.pravatar.cc/150?img=11"
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission();
            }
        }
    }, 15000);
}

// Global scope functions for PDF
window.exportTuitionPdf = function(index) {
    import('./report-generator.js').then(m => m.exportTuitionToPdf(index));
};

// Global scope actions for external triggers
window.openSettings = () => document.getElementById('settingsModal').classList.add('active');
window.openLeaveModal = () => document.getElementById('leaveModal').classList.add('active');
window.openPaymentModalGlobal = () => {
    // Trigger quick pay
    const student = getActiveStudent();
    import('./tuition.js').then(m => m.openPaymentModal(student.stats.tuitionBalance, "Học phí hiện tại"));
};

