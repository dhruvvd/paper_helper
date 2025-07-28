const paperBtnClick = document.getElementById('papers-button');
const repaperPage = document.getElementById('id-paper-container');

paperBtnClick.addEventListener('click', () => {
    repaperPage.style.display = 'flex';
});

const cancelBtn = document.getElementById('cancel-button');
const paperPopover = document.getElementById('id-pcc');

cancelBtn.addEventListener('click', () => {
    paperPopover.hidePopover();
});


const addBtn = document.getElementById('add-button');

addBtn.addEventListener('click', async () => {

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
