console.info('Script Loaded');

// DOM Query
let body = document.querySelector('body');
let navOpenHandle = document.getElementById('nav-open');
let navCloseHandle = document.getElementById('nav-close');
let hiddenNav = document.getElementById('hidden-nav');
let coverHtmlBody = document.getElementById('nav-bottom-screen');

navOpenHandle.addEventListener('click', e => {
    hiddenNav.classList.toggle('show-nav');
    
    if ([...hiddenNav.classList].includes('show-nav')) {
        console.log('Inside IF')
        body.style.overflow = 'hidden';
        coverHtmlBody.style.display = 'block';
    }
})

navCloseHandle.addEventListener('click', e => {
    hiddenNav.classList.toggle('show-nav');
    
    if (![...hiddenNav.classList].includes('show-nav')) {
        body.style.overflow = 'auto';
        coverHtmlBody.style.display = 'none';
    }
})

coverHtmlBody.addEventListener('click', e => {
    hiddenNav.classList.toggle('show-nav');
    
    if (![...hiddenNav.classList].includes('show-nav')) {
        body.style.overflow = 'auto';
        coverHtmlBody.style.display = 'none';
    }
})


// Open links which are not a part of this website, in a new window
let links = document.links;

[...links].forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.target = '_blank'
    }
})