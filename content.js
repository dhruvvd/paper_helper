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
const closeFp = document.getElementById('fp-cb');
const closeSp = document.getElementById('sp-cb');
const closeTp = document.getElementById('tp-cb');

const paperPopover = document.getElementById('id-pcc');
const notePopover = document.getElementById('id-ncc');
const fpPopover = document.getElementById('fp-details');
const spPopover = document.getElementById('sp-details');
const tpPopover = document.getElementById('tp-details');

cancelPaperBtn.addEventListener('click', () => {
    paperPopover.hidePopover();
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
    rePaperDiv.setAttribute("id", "po-id-" + paper.id);
    rePaperTitle.setAttribute('id', 'repaperTitle-' + paper.id);
    bottomCont.classList.add('trash-auth-container');
    bottomCont.setAttribute('id', 'trash-auco-id-' + paper.id);
    trash.classList.add('fa-solid');
    trash.classList.add('fa-trash');
    trash.classList.add('fa-2xl');
    trash.setAttribute("id", "id-trash-" + paper.id);

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

    if (identifier === 'id-tr') {
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
        const paperContainer = document.getElementById("po-id-" + trashNum);
        try {
            //await deletePaper();
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
        /*
        const paperID = identifier === 'repap' ? Number(elementID.substring(13)) : Number(elementID.substring(14));
        
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        const paper = paperCollection.find(p => p.id == paperID);

        paperTitleEle.value = paper ? paper.title : '';
        paperAOIEle.value = paper ? paper.author + ", " + paper.other : '';
        */
        modal.show();
    }
});

submitPass.addEventListener('click', () => {
    modal.close();
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

const fpSaveBtn = document.getElementById('fp-sb');
const spSaveBtn = document.getElementById('sp-sb');
const tpSaveBtn = document.getElementById('tp-sb');

const fpObject = document.getElementById('first-po');
const spObject = document.getElementById('second-po');
const tpObject = document.getElementById('third-po');

fpObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').value;
    const paper = paperCollection.find(p => p.title === paperTitle);   

    const fpContentEle = document.getElementById('fp-content');
    const fpContent = fpContentEle ? fpContentEle.value : '';

    if (paper) {
        fpContentEle.value = paper.fpData || '';
    };
});

spObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').value;
    const paper = paperCollection.find(p => p.title === paperTitle);   

    const spContentEle = document.getElementById('sp-content');
    const spContent = spContentEle ? spContentEle.value : '';

    if (paper) {
        spContentEle.value = paper.spData || '';
    };
});

tpObject.addEventListener('click', async () => {
    const result = await chrome.storage.local.get('papers');
    const paperCollection = result.papers || [];

    const paperTitle = document.getElementById('paperTitle').value; 
    const paper = paperCollection.find(p => p.title === paperTitle);    

    const tpContentEle = document.getElementById('tp-content');
    const tpContent = tpContentEle ? tpContentEle.value : '';

    if (paper) {
        tpContentEle.value = paper.tpData || '';
    };
});

fpSaveBtn.addEventListener('click', async () => {
    const fpContentEle = document.getElementById('fp-content');
    const fpContent = fpContentEle ? fpContentEle.value : '';

    const paperTitle = document.getElementById('paperTitle').value;
    const paper = paperCollection.find(p => p.title === paperTitle);

    async function saveFpContent() {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        if (paper) {
            paper.fpData = fpContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving first pass content.");
        };
    }

    //await saveFpContent();
});

spSaveBtn.addEventListener('click', async () => {
    const spContentEle = document.getElementById('sp-content');
    const spContent = spContentEle ? spContentEle.value : ''; 

    const paperTitle = document.getElementById('paperTitle').value;
    const paper = paperCollection.find(p => p.title === paperTitle);

    async function saveSpContent() {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        if (paper) {
            paper.spData = spContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving second pass content.");
        };
    }

    //await saveSpContent();
});

tpSaveBtn.addEventListener('click', async () => {
    const tpContentEle = document.getElementById('tp-content');
    const tpContent = tpContentEle ? tpContentEle.value : '';

    const paperTitle = document.getElementById('paperTitle').value;
    const paper = paperCollection.find(p => p.title === paperTitle);

    async function saveTpContent() {
        const result = await chrome.storage.local.get('papers');
        const paperCollection = result.papers || [];

        if (paper) {
            paper.tpData = tpContent;
            await chrome.storage.local.set({ papers: paperCollection });
        } else {
            console.error("Paper not found for saving third pass content.");
        };
    }

    //await saveTpContent();
});
