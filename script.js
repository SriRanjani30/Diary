document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const tags = document.getElementById('tags').value;
    const content = document.getElementById('content').value;

    if (!date || !content || !tags) return;

    const entry = {
        date,
        tags: tags.split(',').map(tag => tag.trim()),
        content
    };

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    document.getElementById('entryForm').reset();
    displayEntries();
});

document.getElementById('search').addEventListener('input', displayEntries);
document.getElementById('clearSearch').addEventListener('click', function() {
    document.getElementById('search').value = '';
    displayEntries();
});

function displayEntries() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    entries.forEach((entry, index) => {
        if (entry.content.toLowerCase().includes(searchQuery) || entry.tags.some(tag => tag.toLowerCase().includes(searchQuery))) {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = `
                <div class="entry-header">
                    <strong>${entry.date}</strong>
                    <span>${entry.tags.join(', ')}</span>
                    <div>
                        <button onclick="editEntry(${index})">Edit</button>
                        <button onclick="deleteEntry(${index})">Delete</button>
                    </div>
                </div>
                <p>${entry.content}</p>
            `;
            entriesDiv.appendChild(entryDiv);
        }
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entry = entries[index];

    document.getElementById('date').value = entry.date;
    document.getElementById('tags').value = entry.tags.join(', ');
    document.getElementById('content').value = entry.content;

    deleteEntry(index);
}

window.onload = displayEntries;
