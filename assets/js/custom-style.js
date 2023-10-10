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

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: targetPosition - window.innerHeight / 3.0, // Subtract 1/3 height
            behavior: 'smooth' // Optional: smooth scrolling
        });
    });
});

var convertBlockquotesToDetails = function () {
    // Get all blockquote elements in the document
    var blockquotes = document.getElementsByTagName('blockquote');

    // Convert the HTMLCollection to an array to avoid live collection issues
    var blockquotesArray = Array.prototype.slice.call(blockquotes);

    blockquotesArray.forEach(function (blockquote) {
        // Check if the first child is a p and if there is at least one ul
        var firstChildIsP = blockquote.firstElementChild.tagName === 'P';
        var hasUL = blockquote.getElementsByTagName('ul').length > 0;

        if (firstChildIsP && hasUL) {
            // Create a details and summary element
            var details = document.createElement('details');
            var summary = document.createElement('summary');

            // Move the original p into the summary
            summary.appendChild(blockquote.firstElementChild);

            // Move remaining nodes into details
            while (blockquote.firstElementChild) {
                details.appendChild(blockquote.firstElementChild);
            }

            // Insert summary into details
            details.insertBefore(summary, details.firstChild);

            // Replace the blockquote with the details
            blockquote.parentNode.replaceChild(details, blockquote);
        }
    });
};


onScroll();
window.addEventListener('scroll', onScroll);

convertBlockquotesToDetails();
