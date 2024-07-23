// script.js

document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entryForm');
    const entriesContainer = document.getElementById('entries');
    const searchInput = document.getElementById('search');
    const clearFormButton = document.getElementById('clearForm');
    const clearSearchButton = document.getElementById('clearSearch');
    
    // Handle form submission
    entryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const tags = document.getElementById('tags').value;
        const content = document.getElementById('content').value;
        
        if (date && time && tags && content) {
            const entry = createEntry(date, time, tags, content);
            entriesContainer.prepend(entry);
            entryForm.reset();
        }
    });
    
    // Handle form clear button
    clearFormButton.addEventListener('click', () => {
        entryForm.reset();
    });
    
    // Handle search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filterEntries(query);
    });

    // Handle clear search button
    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        filterEntries('');
    });
    
    // Create a new diary entry
    function createEntry(date, time, tags, content) {
        const entry = document.createElement('div');
        entry.classList.add('entry');
        
        const header = document.createElement('div');
        header.classList.add('entry-header');
        
        const dateTime = document.createElement('strong');
        dateTime.textContent = `${date} ${time}`;
        
        const entryTags = document.createElement('span');
        entryTags.textContent = tags;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('icon-button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteButton.addEventListener('click', () => {
            entry.remove();
        });
        
        header.appendChild(dateTime);
        header.appendChild(entryTags);
        header.appendChild(deleteButton);
        
        const entryContent = document.createElement('p');
        entryContent.textContent = content;
        
        entry.appendChild(header);
        entry.appendChild(entryContent);
        
        return entry;
    }
    
    // Filter entries based on search query
    function filterEntries(query) {
        const entries = entriesContainer.getElementsByClassName('entry');
        Array.from(entries).forEach(entry => {
            const dateTime = entry.querySelector('.entry-header strong').textContent.toLowerCase();
            const tags = entry.querySelector('.entry-header span').textContent.toLowerCase();
            const content = entry.querySelector('p').textContent.toLowerCase();
            
            if (dateTime.includes(query) || tags.includes(query) || content.includes(query)) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }
        });
    }
});
