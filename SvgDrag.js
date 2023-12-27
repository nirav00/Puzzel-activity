
function dragElement(elmnt) {
    var Sx, Sy, C1, C2;
    const svg = document.getElementById("root");
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let lastX = 0;
    let lastY = 0;

    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = touchDown;

    function touchDown(e) {
        e.preventDefault();
        document.ontouchend = closeMoveElement;
        document.ontouchmove = elementMove;
        C1 = elmnt;
        let S = getMousePosition(e.touches[0]);
        [Sx, Sy] = [S.x - lastX, S.y - lastY];
        isDragging = true;
    }

    function elementMove(e) {
        if (isDragging) {
            sliderMove(e.touches[0]);
        }
    }

    function closeMoveElement(e) {
        document.ontouchend = null;
        document.ontouchmove = null;
        lastX = parseInt(elmnt.getAttribute("x"));
        lastY = parseInt(elmnt.getAttribute("y"));
        isDragging = false;
    }

    function dragMouseDown(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        let S = getMousePosition(e);
        [Sx, Sy] = [S.x - lastX, S.y - lastY];
        isDragging = true;
    }

    function elementDrag(e) {
        if (isDragging) {
            sliderMove(e);
        }
    }

    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        lastX = parseInt(elmnt.getAttribute("x"));
        lastY = parseInt(elmnt.getAttribute("y"));
        isDragging = false;
    }

    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    function sliderMove(e) {
        let pos = getMousePosition(e);
        let newX = pos.x - Sx;
        let newY = pos.y - Sy;
        elmnt.setAttribute("x", newX);
        elmnt.setAttribute("y", newY);
    }
}

