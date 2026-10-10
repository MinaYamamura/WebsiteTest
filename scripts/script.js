const sidebar = document.getElementById('sidebar');
const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    // open: grow to fit the content; closed: fall back to the CSS value (50px)
    sidebar.style.maxHeight = isOpen ? sidebar.scrollHeight + 'px' : '';
});
document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => loadPage(button.dataset.page));
});
loadPage('home'); // load the start page