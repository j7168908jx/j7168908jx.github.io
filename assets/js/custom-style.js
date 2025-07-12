
var overlayScrollInit = function () {
    const target = document.querySelector('#sidebar-secondary-nav');
    if (!target) {
        console.log("Element #sidebar-secondary-nav not found.");
        return;
    }
    OverlayScrollbarsGlobal.OverlayScrollbars(target, {
        scrollbars: {
            autoHide: "move",
            autoHideDelay: 300,
            // autoHideSuspend: true,
        }
    });
}


// Secondary sidebar color change on scroll
var onScroll = function () {
    var scrollPosition = window.scrollY + window.innerHeight / 3.0;
    var bars = document.getElementsByClassName('sidebar-secondary');
    if (bars.length == 0)
        return;
    var links = bars[0].getElementsByTagName('a');

    var prev_pos = 0;
    for (var i = 0; i < links.length-1; i++) {
        var href = links[i+1].getAttribute('href');
        if (href == null)
            continue;
        var id = href.substring(href.indexOf('#'));
        var pos = document.querySelector(id).offsetTop;
        if (scrollPosition > pos) {
            links[i].style.color = '#ccc';
        } else if (scrollPosition <= pos && scrollPosition > prev_pos) {
            links[i].style.color = '#149956';
        } else {
            links[i].style.color = 'black';
        }
        prev_pos = pos;
    }
    if (scrollPosition > prev_pos) {
        links[links.length-1].style.color = '#149956';
    } else {
        links[links.length-1].style.color = 'black';
    }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: targetPosition - window.innerHeight / 3.0,
            behavior: 'smooth'
        });
    });
});

var convertliDetailsMarker = function () {
    // Get all blockquote elements in the document
    var main_content = document.getElementById('content');

    main_content.querySelectorAll('li > details:only-child').forEach(function(details) {
        if (details.parentElement.tagName !== 'LI' ||
            details.parentElement.children.length !== 1) {
            return;
        }

        details.parentElement.classList.add('triangle-marker');
        details.addEventListener('toggle', function() {
            if (details.open) {
                details.parentElement.classList.add('triangle-marker-open');
                details.parentElement.classList.remove('triangle-marker');
            } else {
                details.parentElement.classList.add('triangle-marker');
                details.parentElement.classList.remove('triangle-marker-open');
            }
        });
        // Add event listener for click on li
        details.parentElement.addEventListener('click', function(event) {
            // Prevent event from triggering twice when details is clicked directly
            if (event.target !== details) {
                details.click();
            }
        });
    });

};


var preventSelectPrompt = function() {
    document.querySelectorAll('div.language-python span.o').forEach((el) => {
        if (el.innerHTML.trim() === '>>>' || el.innerHTML.trim() === '&gt;&gt;&gt;') {
            el.style.userSelect = 'none';
            let nextSibling = el.nextSibling;
            if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE
                 && nextSibling.textContent.length > 0 && nextSibling.textContent[0] === ' ') {
                let wrapper = document.createElement('span');
                wrapper.style.userSelect = 'none';
                wrapper.textContent = ' ';
                nextSibling.textContent = nextSibling.textContent.substring(1);
                nextSibling.parentNode.insertBefore(wrapper, nextSibling);
                // nextSibling.parentNode.replaceChild(wrapper, nextSibling);
            }
        }
    });
}

onScroll();
window.addEventListener('scroll', onScroll);
window.addEventListener("DOMContentLoaded", overlayScrollInit);
window.addEventListener("DOMContentLoaded", convertliDetailsMarker);
window.addEventListener("DOMContentLoaded", preventSelectPrompt);
