document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tags = document.getElementById('tags').value;
    const content = document.getElementById('content').value;

    if (!date || !time || !content || !tags) return;

    const entry = {
        date,
        time,
        tags: tags.split(',').map(tag => tag.trim()),
        content,
        completed: false
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

document.getElementById('clearForm').addEventListener('click', function() {
    document.getElementById('entryForm').reset();
});

function displayEntries() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    entries.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));

    entries.forEach((entry, index) => {
        if (entry.date.toLowerCase().includes(searchQuery) || entry.time.toLowerCase().includes(searchQuery) || entry.content.toLowerCase().includes(searchQuery) || entry.tags.some(tag => tag.toLowerCase().includes(searchQuery))) {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = `
                <div class="entry-header">
                    <strong>${entry.date} ${entry.time}</strong>
                    <span>${entry.tags.join(', ')}</span>
                    <div>
                        <button class="icon-button" onclick="editEntry(${index})"><i class="fas fa-edit"></i>Edit</button>
                        <button class="icon-button" onclick="deleteEntry(${index})"><i class="fas fa-trash-alt"></i>Delete</button>
                        <button class="icon-button" onclick="toggleComplete(${index})"><i class="${entry.completed ? 'fas fa-check-square' : 'far fa-square'}"></i>Complete</button>
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
    document.getElementById('time').value = entry.time;
    document.getElementById('tags').value = entry.tags.join(', ');
    document.getElementById('content').value = entry.content;

    deleteEntry(index);
}

function toggleComplete(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries[index].completed = !entries[index].completed;
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
}

window.onload = displayEntries;
