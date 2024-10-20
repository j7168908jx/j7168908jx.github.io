

function filterTags(tag) {
    const paragraphs = document.querySelectorAll('section[data-tags]');
    paragraphs.forEach(el => {
        const tags = el.getAttribute('data-tags').split(' ');
        if (tag === '' || tags.includes(tag)) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

// get all distinct data-tags from all sections
function getAllTags() {
    const tags = new Set();
    const paragraphs = document.querySelectorAll('section[data-tags]');
    paragraphs.forEach(el => {
        const tag = el.getAttribute('data-tags').split(' ').filter(t => t !== '');
        tag.forEach(t => tags.add(t));
    });
    return Array.from(tags);
}

// create buttons to the button-area based on all distinct available data-tags
function createFilterButtons() {
    const buttonArea = document.querySelector('.button-area');
    if (!buttonArea) return;

    const tags = getAllTags();
    const comment = document.createComment(' Buttons are auto generated from JS ');
    buttonArea.appendChild(comment);

    addTag = function (tag, name="") {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = name.length > 0 ? name : tag;
        button.onclick = () => filterTags(tag);
        buttonArea.appendChild(button);
    };

    addTag('', 'Show All');  // add a button for all
    tags.forEach(addTag);
}


// create decorative buttons (tags) at the start of each section: based on each of the data-tags attribute
function createQuestionTags() {
    const sections = document.querySelectorAll('.main-content section');
    sections.forEach(section => {
        const tags = section.getAttribute('data-tags').split(' ');
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.classList.add('tag');
            button.textContent = tag;

            // add as the child of the first child of section, only if the first child is h1~h6
            if (section.children.length > 0) {
                const firstChild = section.children[0];
                if (firstChild.tagName.match(/h[1-6]/i)) {
                    firstChild.appendChild(button);
                }
            }
        });
    });
}


// add answer links to all questions: if there presents a .answer div inside the section, add a link to it based on section id
function addAnswerLinks() {
    const sections = document.querySelectorAll('div.questions section');
    sections.forEach(section => {
        const el = section.querySelector('div.go');
        if (el) {
            const link = document.createElement('a');
            link.href = 'quant-answers.html#' + section.id;
            link.textContent = 'Answer';
            link.classList.add('answer-link');
            el.appendChild(link);
        }
    });
}

function addBackToQuestionLinks() {
    const sections = document.querySelectorAll('div.answers section');
    sections.forEach(section => {
        const el = section.querySelector('div.go');
        if (el) {
            const link = document.createElement('a');
            link.href = 'quant-questions.html#' + section.id;
            link.textContent = 'Back to Question';
            link.classList.add('back-link');
            el.appendChild(link);
        }
    });
}



function onLoad() {
    createFilterButtons();
    addAnswerLinks();
    createQuestionTags();
    addBackToQuestionLinks();
}

document.addEventListener('DOMContentLoaded', onLoad);

