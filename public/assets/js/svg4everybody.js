/*SVG for Everybody
Use external SVG spritemaps today. SVG for Everybody minds the gap between SVG-capable browsers and those which do not support external SVG spritemaps.
To use svg4everybody, add it in the <head> of your document.

<script src="/path/to/svg4everybody.ie8.min.js"></script>
Only IE6-8 require the script run this early, in order to shiv the svg and use elements.

If running the standard script in IE9-11, be sure to set X-UA-Compatible higher than IE8. This can be done with a response header or the following <meta> tag.

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
*/
/* FOR IE9+*/

(function (document, uses, requestAnimationFrame, CACHE, IE9TO11) {
    function embed(svg, g) {
        if (g) {
            var
            viewBox = g.getAttribute('viewBox'),
            fragment = document.createDocumentFragment(),
            clone = g.cloneNode(true);

            if (viewBox) {
                svg.setAttribute('viewBox', viewBox);
            }

            while (clone.childNodes.length) {
                fragment.appendChild(clone.childNodes[0]);
            }

            svg.appendChild(fragment);
        }
    }

    function onload() {
        var xhr = this, x = document.createElement('x'), s = xhr.s;

        x.innerHTML = xhr.responseText;

        xhr.onload = function () {
            s.splice(0).map(function (array) {
                embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
            });
        };

        xhr.onload();
    }

    function onframe() {
        var use;

        while ((use = uses[0])) {
            var
            svg = use.parentNode,
            url = use.getAttribute('xlink:href').split('#'),
            url_root = url[0],
            url_hash = url[1];

            svg.removeChild(use);

            if (url_root.length) {
                var xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

                if (!xhr.s) {
                    xhr.s = [];

                    xhr.open('GET', url_root);

                    xhr.onload = onload;

                    xhr.send();
                }

                xhr.s.push([svg, url_hash]);

                if (xhr.readyState === 4) {
                    xhr.onload();
                }

            } else {
                embed(svg, document.getElementById(url_hash));
            }
        }

        requestAnimationFrame(onframe);
    }

    if (IE9TO11) {
        onframe();
    }
})(
    document,
    document.getElementsByTagName('use'),
    window.requestAnimationFrame || window.setTimeout,
    {},
    /Trident\/[567]\b/.test(navigator.userAgent)
);
