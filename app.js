const form = document.getElementById('changeForm');
const requestList = document.getElementById('requestList');
const settingsBtn = document.getElementById('settingsBtn');
const settingsSection = document.getElementById('settingsSection');
const darkModeToggle = document.getElementById('darkModeToggle');

let requests = [];

// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  if (title && description) {
    const request = {
      id: Date.now(),
      title,
      description,
      status: 'Pending'
    };
    requests.push(request);
    renderRequests();
    form.reset();
  }
});

// Render requests list
function renderRequests() {
  requestList.innerHTML = '';
  requests.forEach(req => {
    const li = document.createElement('li');
    li.className = "p-4 bg-white rounded shadow flex justify-between items-center";
    li.innerHTML = `
      <div>
        <strong>${req.title}</strong>
        <p>${req.description}</p>
        <span class="text-sm text-gray-500">Status: ${req.status}</span>
      </div>
      ${req.status === 'Pending' ? `<button class="approveBtn px-3 py-1 bg-blue-500 text-white rounded" data-id="${req.id}">Approve</button>` : ''}
    `;
    requestList.appendChild(li);
  });
  // Add approve button listeners
  document.querySelectorAll('.approveBtn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = Number(this.getAttribute('data-id'));
      approveRequest(id);
    });
  });
}

// Approve workflow automation
function approveRequest(id) {
  requests = requests.map(req =>
    req.id === id ? { ...req, status: 'Approved' } : req
  );
  renderRequests();
}

// Settings toggle
settingsBtn.addEventListener('click', () => {
  settingsSection.classList.toggle('hidden');
});

// Dark mode toggle
darkModeToggle.addEventListener('change', function() {
  document.body.classList.toggle('dark', this.checked);
});

// Initial render
renderRequests();