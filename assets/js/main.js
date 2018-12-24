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


// Handling Comments 
let commentForm = document.querySelector('#comment-form form');
let oldCommentsDiv = document.querySelector('#old-comments');

const writeCommentInHTML = () => {
    fetch('https://comment-system.now.sh/comments?postURL=' + window.location.href)
    .then(data => data.json())
    .then(data => {
        oldCommentsDiv.innerHTML = '';
        [...data].forEach(val => {
            oldCommentsDiv.innerHTML += `<p class="comment-card"><strong>${val.userFullName}</strong> says:<br> ${val.commentText} </p>`;
        })
    })
}
writeCommentInHTML();


commentForm.addEventListener('submit', e => {
    e.preventDefault();
    let formdata = {};

    for(let i = 0; i < commentForm.length - 1; i++) {
        formdata[commentForm[i].name] = commentForm[i].value;
    }
    formdata.postURL = window.location.href;

    fetch('https://comment-system.now.sh/comments/new', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(data => data.json())
    .then(data => {
        writeCommentInHTML();
        document.querySelector('#comment-form .success-message').innerHTML = 'Comment Posted.';
    })
    .catch(err => console.log(err))
})