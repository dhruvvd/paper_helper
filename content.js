console.log("its running");
const paperBtnClick = document.getElementById('papers-button');
console.log("btnclick " + paperBtnClick);
const repaperPage = document.getElementById('id-paper-container');
console.log("repaperpage " + repaperPage);

paperBtnClick.addEventListener('click', () => {
    repaperPage.style.display = 'flex';
});