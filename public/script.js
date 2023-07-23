// public/scripts.js
// public/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveButton');
  const showButton = document.getElementById('showButton');
  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById('password');
  const dataContainer = document.getElementById('dataContainer');

  // Function to save data
  saveButton.addEventListener('click', async () => {
    const name = nameInput.value;
    const password = passwordInput.value;

    if (!name || !password) {
      alert('Name and password are required!');
      return;
    }

    try {
      await fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });

      alert('Data saved successfully!');
      nameInput.value = '';
      passwordInput.value = '';
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  });

  // Function to show data
  showButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/retrieve');
      const data = await response.json();

      let html = '';
      data.forEach(item => {
        html += `<div class="bg-gray-200 p-2 mb-2">${item.name} - ${item.password}</div>`;
      });

      dataContainer.innerHTML = html;
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    }
  });
});
