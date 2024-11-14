class JournalEntry {
    constructor({ text, date, id }) {
        this.text = text;
        this.date = date;
        this.id = id;
    }

    toHTML() {
        return `
        <li class="journal-entry">
            <span class="entry-text">${this.text}</span>
            <span class="entry-date">${this.prettyDate()}</span>
            <button type="button" class="material-icon entry-delete" onclick="deleteEntry(${this.id})">Delete</button>
        </li>
        `;
    }

    prettyDate() {
        const currentDate = new Date(this.date);
        return `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    }
}

let journalEntries = [];

function readStorage() {
    const allEntries = localStorage.getItem('journalEntries');
    if (allEntries) {
        const entriesArray = JSON.parse(allEntries) || [];
        journalEntries = entriesArray.map(entryData => new JournalEntry(entryData));
    }
}

function updateStorage() {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
}

function createEntry(event) {
    event.preventDefault();
    const entryText = document.getElementById('entry-text').value;
    const entryDate = new Date().toISOString();  
    if (!entryText) {
        alert("Please enter text for your journal entry.");
        return;
    }
    const newEntry = new JournalEntry({
        text: entryText,
        date: entryDate,
        id: Date.now()
    });
    journalEntries.push(newEntry);
    updateStorage();
    displayEntries(); 
    document.getElementById('entry-text').value = '';  
}

function displayEntries() {
    const journalListElements = document.querySelectorAll('.journal-list');
    journalListElements.forEach(journalList => {
        journalList.innerHTML = '';  
        journalEntries.forEach(entry => {    
            journalList.innerHTML += entry.toHTML();
        });
    });
}

function deleteEntry(id) {
    journalEntries = journalEntries.filter(entry => entry.id !== id);
    updateStorage();
    displayEntries(); 
}

readStorage();
displayEntries();
