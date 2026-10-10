async function loadPage(name) {
    const title = document.getElementById('pageTitle');
    const body = document.getElementById('pageBody');
    body.replaceChildren(); // clear the old content
    try {
        const response = await fetch(`pages/${name}.json`);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
    
        title.textContent = data.title;
    
        for (const block of data.blocks) {
            let el;
            switch (block.type) {
                case 'heading': {
                    const level = Math.min(Math.max(block.level || 2, 2), 6);
                    el = document.createElement(`h${level}`);
                    el.textContent = block.value;
                    break;
                }
                case 'text':
                    el = document.createElement('p');
                    el.textContent = block.value;
                    break;
                case 'link': {
                    el = document.createElement('p');
                    const a = document.createElement('a');
                    a.textContent = block.value;
                    if (block.page) {
                        a.href = '#';
                        a.addEventListener('click', (e) => {
                            e.preventDefault();
                            loadPage(block.page);
                        });
                    } else {
                        a.href = block.href;
                        if (block.external) {
                            a.target = '_blank';
                            a.rel = 'noopener noreferrer';
                        }
                    }
                    el.append(a);
                    break;
                }
                case 'image': {
                    const figure = document.createElement('figure');
                    const img = document.createElement('img');
                    img.src = block.src;
                    img.alt = block.alt || '';
                    figure.append(img);
                    if (block.caption) {
                        const caption = document.createElement('figcaption');
                        caption.textContent = block.caption;
                        figure.append(caption);
                    }
                    el = figure;
                    break;
                }
            }
                if (el) body.append(el);
            }
    } catch (error) {
        title.textContent = 'Page not found';
    }
}