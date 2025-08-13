// IBEDC Change Management System Automation
// This script automates workflow, validation, and PDF export for the form

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('changeForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Change request submitted! (Demo)');
    // Here you could add logic to save to localStorage or show a summary
  });
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(16);
  doc.text('IBEDC Change Management Request', 10, y);
  y += 10;
  const fields = [
    ['Change Title', 'changeTitle'],
    ['Change Requester', 'changeRequester'],
    ['Reason for Change', 'reasonForChange'],
    ['Change Type', 'changeType'],
    ['Risk Level', 'riskLevel'],
    ['Impact', 'impact'],
    ['Scheduled Start', 'scheduledStart'],
    ['Scheduled End', 'scheduledEnd'],
    ['Rollout Plan', 'rolloutPlan'],
    ['Backout Plan', 'backoutPlan'],
    ['Downtime Description', 'downtimeDescription'],
    ['Downtime Start Time', 'downtimeStart'],
    ['Downtime End Time', 'downtimeEnd'],
    ['Approved By', 'approvedBy1'],
    ['Approved By (2)', 'approvedBy2'],
    ['Task Details', 'taskDetails'],
    ['Review', 'reviewStage'],
    ['Closure Details', 'closedStage'],
  ];
  fields.forEach(([label, id]) => {
    const el = document.getElementById(id);
    let value = el ? (el.value || el.options?.[el.selectedIndex]?.text || '') : '';
    doc.setFontSize(12);
    doc.text(`${label}: ${value}`, 10, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });
  doc.save('change-request.pdf');
}
