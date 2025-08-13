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
  const validationRules = [
    [ // Submission
      { id: 'changeTitle', message: 'Change Title is required.' },
      { id: 'changeRequester', message: 'Change Requester is required.' },
      { id: 'reasonForChange', message: 'Reason for Change is required.' },
      { id: 'changeType', message: 'Change Type is required.' },
      { id: 'riskLevel', message: 'Risk Level is required.' },
      { id: 'impact', message: 'Impact is required.' },
      { id: 'scheduledStart', message: 'Scheduled Start is required.' },
      { id: 'scheduledEnd', message: 'Scheduled End is required.' }
    ],
    [ // Planning
      { id: 'rolloutPlan', message: 'Rollout Plan is required.' },
      { id: 'backoutPlan', message: 'Backout Plan is required.' },
      { id: 'downtimeDescription', message: 'Downtime Description is required.' },
      { id: 'downtimeStart', message: 'Downtime Start Time is required.' },
      { id: 'downtimeEnd', message: 'Downtime End Time is required.' }
    ],
    [ // Approval
      { id: 'approvedBy1', message: 'At least one approval is required.' }
    ],
    [ // Implementation
      { id: 'taskDetails', message: 'Task Details are required.' }
    ],
    [ // Review
      { id: 'reviewStage', message: 'Review is required.' }
    ],
    [ // Closed
      { id: 'closedStage', message: 'Closure Details are required.' }
    ]
  ];

  sections.forEach((section, idx) => {
    if (idx < sections.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.textContent = 'Next';
      nextBtn.className = 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700';
      nextBtn.onclick = () => {
        if (validateStage(idx)) {
          showStage(idx + 1);
        }
      };
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

  function validateStage(idx) {
    const rules = validationRules[idx];
    let valid = true;
    rules.forEach(rule => {
      const el = document.getElementById(rule.id);
      let errorSpan = el.nextElementSibling;
      if (!errorSpan || !errorSpan.classList.contains('field-error')) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'field-error text-red-600 text-sm block mt-1';
        el.parentNode.insertBefore(errorSpan, el.nextSibling);
      }
      if (el) {
        let isInvalid = false;
        if ((el.type === 'select-one' && !el.value) || (el.type === 'text' && !el.value.trim()) || (el.type === 'textarea' && !el.value.trim()) || (el.type === 'datetime-local' && !el.value) || (el.type === 'time' && !el.value)) {
          isInvalid = true;
        }
        if (isInvalid) {
          errorSpan.textContent = rule.message;
          valid = false;
        } else {
          errorSpan.textContent = '';
        }
      }
    });
    return valid;
  }

  function showStage(idx) {
    currentStage = idx;
      sections.forEach((section, i) => {
        if (i === idx) {
          section.style.display = 'block';
          section.classList.add('animate-fade-in');
          setTimeout(() => section.classList.remove('animate-fade-in'), 500);
        } else {
          section.style.display = 'none';
        }
      });
    updateProgressBar(idx);
  nextBtn.className = 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200';
  prevBtn.className = 'mt-4 mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200';
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

  showStage(0);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let allValid = true;
    for (let i = 0; i < sections.length; i++) {
      if (!validateStage(i)) {
        allValid = false;
        showStage(i);
        break;
      }
    }
    if (allValid) {
      alert('Change request submitted! (Demo)');
      // Add logic to save to localStorage or show a summary
    }
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
