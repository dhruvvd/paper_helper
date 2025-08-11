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
const cancelNoteCreateBtn = document.getElementById('notes-create-cb');
const cancelNoteBtn = document.getElementById('notes-cb');
const closeFp = document.getElementById('fp-cb');
const closeSp = document.getElementById('sp-cb');
const closeTp = document.getElementById('tp-cb');

const paperPopover = document.getElementById('id-pcc');
const noteCreatePopover = document.getElementById('id-ncc');
const notePopover = document.getElementById('id-nc');
const fpPopover = document.getElementById('fp-details');
const spPopover = document.getElementById('sp-details');
const tpPopover = document.getElementById('tp-details');

cancelPaperBtn.addEventListener('click', () => {
    paperPopover.hidePopover();
});

cancelNoteCreateBtn.addEventListener('click', () => {
    noteCreatePopover.hidePopover();
});

cancelNoteBtn.addEventListener('click', () => {
    notePopover.hidePopover();
});

closeFp.addEventListener('click', () => {
    fpPopover.hidePopover();
});

closeSp.addEventListener('click', () => {
    spPopover.hidePopover();
}); 

closeTp.addEventListener('click', () => {
    tpPopover.hidePopover();
});


const addPaperBtn = document.getElementById('paper-ab');
const modal = document.querySelector('[data-modal]');
const submitPass = document.getElementById('pass-submit');

let isHovered = false;

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
        other: otherInfo,
        fpData: '',
        spData: '',
        tpData: ''
    };

    
    async function savePaper(paperObject) {

        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        paperCollection.push(paperObject);

        await chrome.storage.local.set({ papers: paperCollection});
    }

    try {
        await savePaper(paper);
    } catch (error) {
        console.error("Failed to save paper:", error);
    }

    const rePaperDiv = document.createElement('div');
    const bottomCont = document.createElement('div');
    const rePaperTitle = document.createElement('h1');
    const rePaperAuthor = document.createElement('h3');
    const trash = document.createElement('img');

    const popOverBtn = document.getElementById('paper-adder');
    const container = document.getElementById('id-paper-container');

    rePaperTitle.textContent = paper.title;
    rePaperAuthor.textContent = paper.author;

    rePaperDiv.classList.add('po-container');
    rePaperDiv.setAttribute("id", "po-id-" + paper.id);
    rePaperTitle.setAttribute('id', 'repaperTitle-' + paper.id);
    rePaperAuthor.classList.add('paper-author');
    bottomCont.classList.add('trash-auth-container');
    bottomCont.setAttribute('id', 'trash-auco-id-' + paper.id);
    trash.classList.add('trash-icon');
    trash.setAttribute("id", "id-trash-" + paper.id);
    trash.setAttribute("src", "images/trash-solid-full.svg");

    rePaperDiv.appendChild(rePaperTitle);
    bottomCont.appendChild(rePaperAuthor);
    bottomCont.appendChild(trash);
    rePaperDiv.appendChild(bottomCont);

    container.insertBefore(rePaperDiv, popOverBtn);

    if (titleE) titleE.value = '';
    if (authorE) authorE.value = '';
    if (otherInfoE) otherInfoE.value = '';

    paperPopover.hidePopover();
});

repaperPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    if (identifier === 'id-tr') {
        const trashID = elementID;
        const trashNum = Number(trashID.substring(9));
        
        async function deletePaper(trashVal) {
            try {
                const result = await chrome.storage.local.get('papers');
                const paperCollection = result.papers || [];

                const updatedPapers = paperCollection.filter(paper => paper.id !== trashVal);
                await chrome.storage.local.set({ papers: updatedPapers});
            } catch (error) {
                throw error;
            };
        }
        
        const container = document.getElementById('id-paper-container');
        const paperContainer = document.getElementById("po-id-" + trashNum);
        try {
            await deletePaper(trashNum);
            container.removeChild(paperContainer);
        } catch (error) {
            console.error("Failed to complete paper deletion:", error);
        };
    };
});

repaperPage.addEventListener('mouseover', (event) => {
    const hoveredElement = event.target;
    const elementID = hoveredElement.id;
    const identifier = elementID.substring(0, 5);

    isHovered = identifier === 'trash' || identifier === 'repap';
});

repaperPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    const paperTitleEle = document.getElementById('paperTitle');
    const paperAOIEle = document.getElementById('id-aoi');

    if (identifier === 'trash' || identifier === 'repap') {
        
        const paperID = identifier === 'repap' ? Number(elementID.substring(13)) : Number(elementID.substring(14));
        
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        const paper = paperCollection.find(p => p.id == paperID);

        paperTitleEle.textContent = paper ? paper.title : '';
        paperAOIEle.textContent = paper ? paper.author + ", " + paper.other : '';
        
        modal.show();
    }
});

notesPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    if (identifier === "no-id") {
        const noteID = Number(elementID.substring(6));
        
        const result = await chrome.storage.local.get('notes');
        const noteCollection = result.notes || [];

        const note = noteCollection.find(n => n.id === noteID);

        const noteNameEle = document.getElementById('note-title');
        const noteContentEle = document.getElementById('note-content');

        if (note) {
            noteNameEle.textContent = note.name || '';
            noteContentEle.value = note.content || '';
        };
        
        notePopover.showPopover();
    }
});

const saveNoteBtn = document.getElementById('notes-sb');

saveNoteBtn.addEventListener('click', async () => {
    const noteNameEle = document.getElementById('note-title');  
    const noteContentEle = document.getElementById('note-content');

    const noteName = noteNameEle ? noteNameEle.textContent : '';
    const noteContent = noteContentEle ? noteContentEle.value : '';

    async function saveNote (noteName, noteContent) {
        const result = await chrome.storage.local.get('notes');
        const noteCollection = result.notes || [];

        const noteObject  = noteCollection.find(n => n.name === noteName);
        if (noteObject) {
            noteObject.content = noteContent;
            await chrome.storage.local.set({ notes: noteCollection });
        } else {
            console.error("Note not found for saving content.");
        }
    }

    try {
        await saveNote(noteName, noteContent);
    } catch (error) {
        console.error("Failed to save note content:", error);
    }

    notePopover.hidePopover();
});

notesPage.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const elementID = clickedElement.id;
    const identifier = elementID.substring(0, 5);

    if (identifier === 'trash') {
        const trashID = elementID;
        const trashNum = Number(trashID.substring(9));
        
        async function deleteNote(trashVal) {
            try {
                const result = await chrome.storage.local.get('notes');
                const noteCollection = result.notes || [];

                const updatedNotes = noteCollection.filter(note => note.id !== trashVal);
                await chrome.storage.local.set({ notes: updatedNotes});
            } catch (error) {
                throw error;
            };
        }
        
        const container = document.getElementById('id-notes-container');
        const noteContainer = document.getElementById("no-id-" + trashNum);
        try {
            await deleteNote(trashNum);
            container.removeChild(noteContainer);
        } catch (error) {
            console.error("Failed to complete note deletion:", error);
        };
    }
});

submitPass.addEventListener('click', () => {
    modal.close();
});

const addNoteBtn = document.getElementById('notes-create-ab');

addNoteBtn.addEventListener('click', async () => {
    const noteName = document.getElementById('note-create-title');
    const noteContent = document.getElementById('note-create-content');

    const name = noteName ? noteName.value: '';
    const content = noteContent ? noteContent.value: '';

    const note = {
        id: Math.random(),
        name: name,
        content: content
    }

    
    async function saveNote(noteObject) {

        const result = await chrome.storage.local.get('notes');
        const noteCollection = result.notes || [];

        noteCollection.push(noteObject);

        await chrome.storage.local.set({ notes: noteCollection});
    }

    try {
        await saveNote(note);
    } catch (error) {
        console.error("Failed to save note:", error);
    }

    const noteDiv = document.createElement('div');
    const noteNameEle = document.createElement('h1');
    const trashCont = document.createElement('div');
    const trash = document.createElement('img');

    const popOverBtn = document.getElementById('note-adder');
    const container = document.getElementById('id-notes-container');

    noteNameEle.textContent = note.name;

    noteDiv.classList.add('no-container');
    noteDiv.setAttribute("id", "no-id-" + note.id);
    trashCont.classList.add('trash-note-container');
    trash.classList.add('trash-icon');
    trash.setAttribute("id", "trash-id-" + note.id);
    trash.setAttribute("src", "images/trash-solid-full.svg");

    noteDiv.appendChild(noteNameEle);
    noteDiv.appendChild(trashCont);
    trashCont.appendChild(trash);

    container.insertBefore(noteDiv, popOverBtn);

    if (noteName) noteName.value = '';
    if (noteContent) noteContent.value = '';

    noteCreatePopover.hidePopover();
});

const fpSaveBtn = document.getElementById('fp-sb');
const spSaveBtn = document.getElementById('sp-sb');
const tpSaveBtn = document.getElementById('tp-sb');

const fpObject = document.getElementById('first-po');
const spObject = document.getElementById('second-po');
const tpObject = document.getElementById('third-po');

fpObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').textContent;
    const paper = paperCollection.find(p => p.title === paperTitle);   

    const fpContentEle = document.getElementById('fp-content');

    if (paper) {
        fpContentEle.value = paper.fpData || '';
    };
});

spObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').textContent;
    const paper = paperCollection.find(p => p.title === paperTitle);   

    const spContentEle = document.getElementById('sp-content');

    if (paper) {
        spContentEle.value = paper.spData || '';
    };
});

tpObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').textContent; 
    const paper = paperCollection.find(p => p.title === paperTitle);    

    const tpContentEle = document.getElementById('tp-content');

    if (paper) {
        tpContentEle.value = paper.tpData || '';
    };
});

fpSaveBtn.addEventListener('click', async () => {
    const fpContentEle = document.getElementById('fp-content');
    const fpContent = fpContentEle ? fpContentEle.value : '';

    const paperTitle = document.getElementById('paperTitle').textContent;

    async function saveFpContent(passContent, paperName) {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];
        const paperObject = paperCollection.find(p => p.title === paperName);

        if (paperObject) {
            paperObject.fpData = passContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving first pass content.");
        };
    }

    try {
        await saveFpContent(fpContent, paperTitle);
    } catch (error) {
        console.error("Failed to save first pass content:", error);
    }

    fpPopover.hidePopover();
});

spSaveBtn.addEventListener('click', async () => {
    const spContentEle = document.getElementById('sp-content');
    const spContent = spContentEle ? spContentEle.value : ''; 

    const paperTitle = document.getElementById('paperTitle').textContent   ;

    async function saveSpContent(passContent, paperName) {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];
        const paperObject = paperCollection.find(p => p.title === paperName);

        if (paperObject) {
            paperObject.spData = passContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving second pass content.");
        };
    }

    try {
        await saveSpContent(spContent, paperTitle);
    } catch (error) {
        console.error("Failed to save second pass content:", error);
    }

    spPopover.hidePopover();
});

tpSaveBtn.addEventListener('click', async () => {
    const tpContentEle = document.getElementById('tp-content');
    const tpContent = tpContentEle ? tpContentEle.value : '';

    const paperTitle = document.getElementById('paperTitle').textContent;

    async function saveTpContent(passContent, paperName) {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];
        const paperObject = paperCollection.find(p => p.title === paperName);

        if (paperObject) {
            paperObject.tpData = passContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving third pass content.");
        };
    }

    try {
        await saveTpContent(tpContent, paperTitle);
    } catch (error) {
        console.error("Failed to save third pass content:", error);
    }

    tpPopover.hidePopover();
});


document.addEventListener('DOMContentLoaded', async () => {
    const paperContainer = document.getElementById('id-paper-container');
    const noteContainer = document.getElementById('id-notes-container');

    const paperAddBtn = document.getElementById('paper-adder');
    const noteAddBtn = document.getElementById('note-adder');

    const resultPaper = await chrome.storage.local.get('papers');
    const paperCollection = resultPaper.papers || [];

    const resultNote = await chrome.storage.local.get('notes');
    const noteCollection = resultNote.notes || [];

    try {
        if (paperCollection) {
            paperCollection.forEach(paper => {
                const rePaperDiv = document.createElement('div');
                const bottomCont = document.createElement('div');
                const rePaperTitle = document.createElement('h1');
                const rePaperAuthor = document.createElement('h3');
                const trash = document.createElement('img');

                rePaperTitle.textContent = paper.title;
                rePaperAuthor.textContent = paper.author;

                rePaperDiv.classList.add('po-container');
                rePaperDiv.setAttribute("id", "po-id-" + paper.id);
                rePaperTitle.setAttribute('id', 'repaperTitle-' + paper.id);
                bottomCont.classList.add('trash-auth-container');
                bottomCont.setAttribute('id', 'trash-auco-id-' + paper.id);
                trash.classList.add('trash-icon');
                trash.setAttribute("id", "id-trash-" + paper.id);
                trash.setAttribute("src", "images/trash-solid-full.svg");

                rePaperDiv.appendChild(rePaperTitle);
                bottomCont.appendChild(rePaperAuthor);
                bottomCont.appendChild(trash);
                rePaperDiv.appendChild(bottomCont);

                paperContainer.insertBefore(rePaperDiv, paperAddBtn);
            });
        }
    } catch (error) {
        console.error("Failed to load papers:", error);
    }

    try {
        if (noteCollection) {
            noteCollection.forEach(note => {
                const noteDiv = document.createElement('div');
                const noteNameEle = document.createElement('h1');
                const trashCont = document.createElement('div');
                const trash = document.createElement('img');

                noteNameEle.textContent = note.name;

                noteDiv.classList.add('no-container');
                noteDiv.setAttribute("id", "no-id-" + note.id);
                trashCont.classList.add('trash-note-container');
                trash.classList.add('trash-icon');
                trash.setAttribute("id", "trash-id-" + note.id);
                trash.setAttribute("src", "images/trash-solid-full.svg");

                noteDiv.appendChild(noteNameEle);
                noteDiv.appendChild(trashCont);
                trashCont.appendChild(trash);

                noteContainer.insertBefore(noteDiv, noteAddBtn);
            });
        }
    } catch (error) {
        console.error("Failed to load notes:", error);
    }
});