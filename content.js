const paperBtnClick = document.getElementById('papers-button');
const repaperPage = document.getElementById('id-paper-container');

paperBtnClick.addEventListener('click', () => {
    repaperPage.style.display = 'flex';
});

const cancelBtnClick = document.getElementById('cancel-button');
const paperPopover = document.getElementById('id-pcc');

cancelBtnClick.addEventListener('click', () => {
    paperPopover.hidePopover();
});
