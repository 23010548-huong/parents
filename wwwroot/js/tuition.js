// tuition.js - Tuition management logic
import { renderList } from './utils.js';
import { t } from './i18n.js';
import { getActiveStudent } from './data.js';

export function renderTuitionPage(student) {
    if (!student) return;

    // Update table headers for i18n
    renderList('tuitionTableBody', student.tuitionInvoices, (inv, idx) => `
        <tr>
            <td><strong>${inv.id}</strong></td>
            <td>${inv.period}</td>
            <td class="fw-bold">${inv.amount}</td>
            <td>${inv.date}</td>
            <td><span class="badge ${inv.statusClass}">${inv.status}</span></td>
            <td>
                <div class="action-cell">
                    <button class="icon-btn" onclick="openPaymentModal('${inv.amount}', '${inv.period}')" title="${t('payNow')}">
                        <i class="fa-solid fa-credit-card"></i>
                    </button>
                    <button class="icon-btn" onclick="window.exportTuitionPdf(${idx})" title="${t('exportPdf')}">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                </div>
            </td>
        </tr>
    `, "Chưa có dữ liệu học phí.");
}

// Payment Modal Logic - Updated with Dynamic VietQR
window.openPaymentModal = function(amount, period) {
    const student = getActiveStudent();
    const modal = document.getElementById('paymentModal');
    const qrContainer = document.getElementById('qrcode');
    const desc = document.getElementById('paymentDesc');
    
    qrContainer.innerHTML = '';
    
    // Clean amount script
    const cleanAmount = amount.replace(/[^\d]/g, '');
    
    desc.innerHTML = `Thanh toán: <strong>${period}</strong><br>Học sinh: <strong>${student.name} (${student.id})</strong><br>Số tiền: <strong>${amount}</strong>`;
    
    // Generate VietQR (Standard VietQR format)
    // Bank: VCB, Acc: 1029384756, Note: student_id period
    const note = encodeURIComponent(`${student.id} ${period}`);
    const qrText = `https://img.vietqr.io/image/vcb-1029384756-compact.png?amount=${cleanAmount}&addInfo=${note}&accountName=Hệ%20thống%20giáo%20dục%20NineEdu`;
    
    const qrImg = document.createElement('img');
    qrImg.src = qrText;
    qrImg.style = "width: 200px; height: 200px; object-fit: contain; border: 1px solid #eee; border-radius: 12px; padding: 10px; background: #fff;";
    qrContainer.appendChild(qrImg);
    
    modal.classList.add('active');
};

window.closePaymentModal = function() {
    document.getElementById('paymentModal').classList.remove('active');
};

