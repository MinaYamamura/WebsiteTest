document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => loadPage(button.dataset.page));
});
loadPage('home'); // load the start page