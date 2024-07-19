document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;

    if (!date || !content) return;

    const entry = {
        date,
        content
    };

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    document.getElementById('entryForm').reset();
    displayEntries();
});

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-header">
                <strong>${entry.date}</strong>
                <button onclick="deleteEntry(${index})">Delete</button>
            </div>
            <p>${entry.content}</p>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
}

window.onload = displayEntries;
