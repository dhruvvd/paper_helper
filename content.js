const paperBtn = document.getElementById('papers-button');
const notesBtn = document.getElementById('notes-button');
const repaperPage = document.getElementById('id-paper-container');
const notesPage = document.getElementById('id-notes-container');

paperBtn.addEventListener('click', () => {
    repaperPage.style.display = 'flex';
    notesPage.style.display = 'none';
});

notesBtn.addEventListener('click', () => {
    notesPage.style.display = 'flex';
    repaperPage.style.display = 'none';
});

const cancelPaperBtn = document.getElementById('paper-cb');
const cancelNoteBtn = document.getElementById('notes-cb');
const paperPopover = document.getElementById('id-pcc');
const notePopover = document.getElementById('id-ncc');

cancelPaperBtn.addEventListener('click', () => {
    paperPopover.hidePopover();
});

cancelNoteBtn.addEventListener('click', () => {
    notePopover.hidePopover();
});


const addPaperBtn = document.getElementById('paper-ab');

addPaperBtn.addEventListener('click', async () => {

    const titleE = document.getElementById('paper-title');
    const authorE = document.getElementById('paper-auth');
    const otherInfoE = document.getElementById('paper-other');

    const title = titleE ? titleE.value: '';
    const author = authorE ? authorE.value: '';
    const otherInfo = otherInfoE ? otherInfoE.value: '';

    const paper = {
        id: Math.random(),
        title: title,
        author: author,
        other: otherInfo
    };

    /*
    async function savePaper() {

        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        paperCollection.push(paper);

        await chrome.storage.local.set({ papers: paperCollection});
    }

    await savePaper();
    */

    const rePaperDiv = document.createElement('div');
    const bottomCont = document.createElement('div');
    const rePaperTitle = document.createElement('h1');
    const rePaperAuthor = document.createElement('h3');
    const trash = document.createElement('i');

    const popOverBtn = document.getElementById('paper-adder');
    const container = document.getElementById('id-paper-container');

    rePaperTitle.textContent = paper.title;
    rePaperAuthor.textContent = paper.author;

    rePaperDiv.classList.add('po-container');
    rePaperDiv.setAttribute("id", paper.id);
    bottomCont.classList.add('trash-auth-container');
    trash.classList.add('fa-solid');
    trash.classList.add('fa-trash');
    trash.classList.add('fa-2xl');
    trash.setAttribute("id", "trash-id-" + paper.id);

    rePaperDiv.appendChild(rePaperTitle);
    bottomCont.appendChild(rePaperAuthor);
    bottomCont.appendChild(trash);
    rePaperDiv.appendChild(bottomCont);

    container.insertBefore(rePaperDiv, popOverBtn);

    if (titleE) titleE.value = '';
    if (authorE) authorE.value = '';
    if (otherInfoE) otherInfoE.value = '';
});

repaperPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    if (identifier === 'trash') {
        const trashID = elementID;
        const trashNum = Number(trashID.substring(9));
        /*
        async function deletePaper() {
            try {
                const result = await chrome.storage.local.get('papers');
                const paperCollection = result.papers || [];

                const updatedPapers = paperCollection.filter(paper => paper.id !== trashNum);
                await chrome.storage.local.set({ papers: updatedPapers});
            } catch (error) {
                throw error;
            };
        }
        */
        const container = document.getElementById('id-paper-container');
        const paperContainer = document.getElementById(trashNum);
        try {
            //await deletePaper();
            container.removeChild(paperContainer);
        } catch (error) {
            console.error("Failed to complete paper deletion:", error);
        };
    };
});

const addNoteBtn = document.getElementById('notes-ab');

addNoteBtn.addEventListener('click', async () => {
    const noteName = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');

    const name = noteName ? noteName.value: '';
    const content = noteContent ? noteContent.value: '';

    const note = {
        id: Math.random(),
        name: name,
        content: content
    }

    /*
    async function saveNote() {

        const result = await chrome.storage.local.get('notes');
        const noteCollection = result.notes || [];

        noteCollection.push(note);

        await chrome.storage.local.set({ notes: noteCollection});
    }

    await savePaper();
    */

    const noteDiv = document.createElement('div');
    const noteNameEle = document.createElement('h1');
    const trashCont = document.createElement('div');
    const trash = document.createElement('i');

    const popOverBtn = document.getElementById('note-adder');
    const container = document.getElementById('id-notes-container');

    noteNameEle.textContent = note.name;

    noteDiv.classList.add('no-container');
    noteDiv.setAttribute("id", note.id);
    trashCont.classList.add('trash-note-container');
    trash.classList.add('fa-solid');
    trash.classList.add('fa-trash');
    trash.classList.add('fa-2xl');
    trash.setAttribute("id", "trash-id-" + note.id);

    noteDiv.appendChild(noteNameEle);
    noteDiv.appendChild(trashCont);
    trashCont.appendChild(trash);

    container.insertBefore(noteDiv, popOverBtn);

    if (noteName) noteName.value = '';
    if (noteContent) noteContent.value = '';
})

notesPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    if (identifier === 'trash') {
        const trashID = elementID;
        const trashNum = Number(trashID.substring(9));
        /*
        async function deleteNote() {
            try {
                const result = await chrome.storage.local.get('notes');
                const pnoteCollection = result.notes || [];

                const updatedNotes = noteCollection.filter(note => note.id !== trashNum);
                await chrome.storage.local.set({ notes: updatedNotes});
            } catch (error) {
                throw error;
            };
        }
        */
        const container = document.getElementById('id-notes-container');
        const noteContainer = document.getElementById(trashNum);
        try {
            //await deleteNote();
            container.removeChild(noteContainer);
        } catch (error) {
            console.error("Failed to complete note deletion:", error);
        };
    };
})
