// report-generator.js - PDF report generation using jsPDF
import { getActiveStudent } from './data.js';

export function exportGradesToPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const student = getActiveStudent();

    // Header
    doc.setFontSize(22);
    doc.text("NINEEDU REPORT CARD", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Student: ${student.name}`, 20, 40);
    doc.text(`ID: ${student.id}`, 20, 50);
    doc.text(`Class: ${student.classInfo}`, 20, 60);
    doc.text(`GPA: ${student.stats.gpa}`, 20, 70);

    // Table
    const head = [['Code', 'Exam', 'Subject', 'Score', 'Status']];
    const data = student.grades.map(g => [g.code, g.exam, g.subject, g.score, g.status]);

    doc.autoTable({
        head: head,
        body: data,
        startY: 80,
        theme: 'grid',
        headStyles: { fillStyle: '#4285f4', textColor: 255 },
    });

    const finalY = doc.lastAutoTable.finalY || 80;
    doc.text(`Date of Release: ${new Date().toLocaleDateString()}`, 20, finalY + 20);

    doc.save(`Report_${student.id}.pdf`);
}

export function exportTuitionToPdf(invoiceIndex) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const student = getActiveStudent();
    const inv = student.tuitionInvoices[invoiceIndex];

    doc.setFontSize(22);
    doc.text("NINEEDU INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Invoice ID: ${inv.id}`, 20, 40);
    doc.text(`Date: ${inv.date}`, 20, 50);
    doc.text(`Student: ${student.name} (${student.id})`, 20, 70);
    doc.text(`Period: ${inv.period}`, 20, 80);
    
    doc.setFontSize(18);
    doc.setTextColor('#1e8e3e');
    doc.text(`TOTAL AMOUNT: ${inv.amount}`, 20, 100);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text("Status: " + inv.status, 20, 115);
    doc.text("Notes: Please present this invoice for banking reference.", 20, 130);

    doc.setDrawColor(200);
    doc.line(20, 150, 190, 150);
    
    doc.text("Authorized by NineEdu Financial Services", 105, 170, { align: "center" });

    doc.save(`Invoice_${inv.id}.pdf`);
}

