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
          const el = buildBlock(block);
          if (el) body.append(el);
        }
    } catch (error) {
        title.textContent = 'Page not found';
    }
}

function buildBlock(block) {
    switch (block.type) {
        case 'text': {
            const p = document.createElement('p');
            p.textContent = block.value;
            return p;
        }
        case 'heading': {
            const h = document.createElement('h2');
            h.textContent = block.value;
            return h;
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
            if (block.style) Object.assign(figure.style, block.style);
            return figure;
        }
        case 'group': {
            const div = document.createElement('div');
            div.className = 'group ' + (block.layout || 'column');
            for (const child of block.blocks) {
                const childEl = buildBlock(child);
                if (childEl) div.append(childEl);
            }
            return div;
        }
        case 'link': {
            const a = document.createElement('a');
            a.href = block.href;
            a.textContent = block.value || block.href;   // visible text, falls back to the URL
            a.target = '_blank';                          // opens in a new tab
            a.rel = 'noopener noreferrer';
            return a;
        }
        
    }
    return null;
}