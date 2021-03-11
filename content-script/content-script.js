let textSelected = '';
let l = 0, r = 0, t = 0, b = 0;

// HANDLER SELECTION CHANGE
document.onselectionchange = highlightHandler;

function highlightHandler() {
    var text = document.getSelection();
    if (text !== '') {
        doStuff(text);
    }
}

function doStuff(selection) {
    if (selection && selection.toString() != '' && selection.getRangeAt && selection.rangeCount) {
        var rect = document.getSelection().getRangeAt(0).getBoundingClientRect();

        if ((l == 0 && r == 0 && t == 0)
            || textSelected !== selection.toString()
            || (
                l != rect.left
                && r != rect.right
                && t != rect.top
                && b != rect.bottom
            )
        ) {

            setTimeout(() => {
                textSelected = selection.toString();
                l = rect.left;
                r = rect.right;
                t = rect.top;
                b = rect.bottom;

                while (document.getElementById("searchBtn") != undefined) {
                    if (document.getElementById("searchBtn")) {
                        let e = document.getElementById("searchBtn");
                        e.remove();
                    }
                }

                var imgURL = chrome.runtime.getURL("assets/images/logo128.png");

                let buttonE = document.createElement("button");
                buttonE.id = "searchBtn";
                buttonE.title = "Search with stackoverflow.com";
                buttonE.style.background = "url(" + encodeURI(imgURL) + ")";
                buttonE.classList.add("p-btn")
                buttonE.style.top = window.scrollY + rect.bottom + 10 + 'px'
                buttonE.style.left = window.scrollX + rect.left + Math.abs((rect.right - rect.left) / 2) + 'px';
                buttonE.addEventListener("click", e => {
                    e.preventDefault();
                    chrome.runtime.sendMessage({ type: "setTextSearch", textSearch: selection.toString() });
                })
                document.body.appendChild(buttonE);
            }, 50);
        }

    }
    else if (selection && selection.toString() == '') {
        if (document.getElementById("searchBtn")) {
            let e = document.getElementById("searchBtn");
            e.remove();
            l = 0;
            r = 0;
            t = 0;
            b = 0;
        }

    }
}