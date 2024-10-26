
function createCanvas(canvasSize = canvasSettings.canvasSize) {
    const canvasElement = document.getElementById('canvas');
    const canvasElementNew = document.createElement('div')
    canvasElementNew.setAttribute('id', 'canvas');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < canvasSize; i++) {
        const canvasRow = document.createElement('div')
        canvasRow.classList.add('row')

        for (let j = 0; j < canvasSize; j++) {
            const canvasPixel = document.createElement('div')
            canvasPixel.classList.add('pixel')
            canvasRow.appendChild(canvasPixel)
        }
        canvasElementNew.appendChild(canvasRow);
    }
    fragment.appendChild(canvasElementNew);
    canvasContainer.replaceChild(fragment, canvasElement)
}

function updateLabel(canvasSize = canvasSettings.canvasSize) {
    const canvasSizeLabel = document.getElementById('canvas-size-input-label')
    canvasSizeLabel.textContent = `Canvas Size: ${canvasSize}x${canvasSize} `
}

function trackMouse() {
    canvasContainer.addEventListener("mousemove", drawPixel);
    document.addEventListener("mouseup", () => {
        canvasContainer.removeEventListener("mousemove", drawPixel);
    });
}

function drawPixel(event) {
    if (event.target.classList.contains('pixel')) {
        if (canvasSettings.rainbowMode) {
            const randomHue = Math.floor(Math.random() * 360)
            event.target.style.backgroundColor = `hsl(${randomHue} 80% 60%)`
        } else if (canvasSettings.eraserMode) {
            event.target.style.backgroundColor = `white`
        } else {
            event.target.style.backgroundColor = `black`
        }
    }
}

function getSettings() {
    const settingsContainer = document.getElementById('settings')
    const canvasSizeInput = document.getElementById('canvas-size-input')

    canvasSizeInput.addEventListener('mouseup', (event) => createCanvas(event.target.value));
    settingsContainer.addEventListener('input', (event) => {
        switch (event.target.id) {
            case 'canvas-size-input':
                updateLabel(event.target.value);
                break;
            case 'rainbow-mode-input':
                canvasSettings.rainbowMode = event.target.checked
                canvasSettings.eraserMode = false
                break;
            case 'eraser-mode-input':
                canvasSettings.eraserMode = event.target.checked
                canvasSettings.rainbowMode = false
                break;
            default:
        }
    });
}


let canvasSettings = {
    canvasSize: 16,
    rainbowMode: false,
    eraserMode: false,
}

const canvasContainer = document.getElementById('canvas-container');
canvasContainer.addEventListener("mousedown", (event) => {
    event.preventDefault(); // prevents weird behavior when dragging mouse
    trackMouse();
});    

getSettings()
createCanvas()