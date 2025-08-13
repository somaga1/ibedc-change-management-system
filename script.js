// IBEDC Change Management System Automation
// This script automates workflow, validation, and PDF export for the form


// Stage navigation logic
const stages = [
  'Submission Stage',
  'Planning Stage',
  'Approval Stage',
  'Implementation Stage',
  'Review Stage',
  'Closed Stage'
];

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('changeForm');
  const sections = form.querySelectorAll('section');
  let currentStage = 0;

  // Add navigation buttons to each section except last
  sections.forEach((section, idx) => {
    if (idx < sections.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.textContent = 'Next';
      nextBtn.className = 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700';
      nextBtn.onclick = () => showStage(idx + 1);
      section.appendChild(nextBtn);
    }
    if (idx > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.textContent = 'Previous';
      prevBtn.className = 'mt-4 mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400';
      prevBtn.onclick = () => showStage(idx - 1);
      section.appendChild(prevBtn);
    }
  });

  function showStage(idx) {
    currentStage = idx;
    sections.forEach((section, i) => {
      section.style.display = i === idx ? 'block' : 'none';
    });
    updateProgressBar(idx);
  }

  function updateProgressBar(idx) {
    for (let i = 1; i <= stages.length; i++) {
      const step = document.getElementById(`step-${i}`);
      if (step) {
        if (i - 1 === idx) {
          step.classList.remove('bg-gray-300', 'text-gray-600');
          step.classList.add('bg-blue-600', 'text-white');
        } else {
          step.classList.remove('bg-blue-600', 'text-white');
          step.classList.add('bg-gray-300', 'text-gray-600');
        }
      }
    }
  }

  // Show first stage on load
  showStage(0);

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
